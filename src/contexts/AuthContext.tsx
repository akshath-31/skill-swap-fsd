import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { supabase } from "@/lib/supabase";
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    avatar: string;
    credits: number;
    role: "user" | "admin";
  } | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to sync user to Supabase
const syncUserWithSupabase = async (firebaseUser: any) => {
  try {
    // 1. Sync basic info to Supabase
    const updates = {
      id: firebaseUser.uid,
      email: firebaseUser.email,
      full_name: firebaseUser.displayName,
      avatar_url: firebaseUser.photoURL,
      last_login: new Date().toISOString(),
    };

    const { error: upsertError } = await supabase
      .from("users")
      .upsert(updates, { onConflict: "id" });

    if (upsertError) {
      console.error("Error syncing user to Supabase:", upsertError);
    }

    // 2. Fetch latest user data (including role/credits)
    const { data: dbUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("id", firebaseUser.uid)
      .single();

    if (fetchError) {
      console.error("Error fetching user details:", fetchError);
    }

    return {
      name: firebaseUser.displayName || dbUser?.full_name || "",
      email: firebaseUser.email || dbUser?.email || "",
      avatar: firebaseUser.photoURL || dbUser?.avatar_url || "",
      credits: dbUser?.credits || 0,
      role: dbUser?.role || "user",
    };
  } catch (err) {
    console.error("Unexpected error in auth sync:", err);
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const syncedUser = await syncUserWithSupabase(firebaseUser);
        if (syncedUser) {
          setUser(syncedUser);
          setIsAuthenticated(true);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(`Login Failed: ${error.message}`);
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      await signInWithPopup(auth, googleProvider);
      return true;
    } catch (error: any) {
      console.error("Google login error:", error);
      toast.error(`Login Failed: ${error.message}`);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name immediately in Firebase
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      
      // Manually trigger sync to Supabase to capture the new Display Name
      // (because the onAuthStateChanged listener might have fired before updateProfile completed)
      const syncedUser = await syncUserWithSupabase(userCredential.user);
      if (syncedUser) {
        setUser(syncedUser);
      }
      
      return true;
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(`Registration Failed: ${error.message}`);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, loginWithGoogle, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
