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
    uid: string;
    name: string;
    email: string;
    avatar?: string;
    credits: number;
    role: string;
  } | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

import { syncUserWithMongoDB, fetchUserFromMongoDB } from "@/lib/mongodb-api";

// Helper to sync user to MongoDB
const syncUserWithMongoDBHelper = async (firebaseUser: any) => {
  try {
    // 1. Sync info to MongoDB
    const userData = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "User",
      avatar: firebaseUser.photoURL || "",
    };

    console.log("Syncing user with MongoDB:", userData.uid);
    await syncUserWithMongoDB(userData);

    // 2. Fetch latest user data (including credits)
    const dbUser = await fetchUserFromMongoDB(firebaseUser.uid);
    if (!dbUser) throw new Error("User not found in database after sync");

    return {
      uid: firebaseUser.uid,
      name: dbUser.name || userData.name,
      email: dbUser.email || userData.email,
      avatar: dbUser.avatar || userData.avatar,
      credits: dbUser.credits ?? 100,
      role: dbUser.role || "user",
    };
  } catch (err) {
    console.error("Unexpected error in MongoDB auth sync:", err);
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        const syncedUser = await syncUserWithMongoDBHelper(firebaseUser);
        if (syncedUser) {
          setUser(syncedUser);
          setIsAuthenticated(true);
        } else {
          // If sync failed, we might want to log them out or show an error
          setUser(null);
          setIsAuthenticated(false);
          toast.error("Account synchronization failed. Please try again.");
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

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
      
      // Manually trigger sync to MongoDB to capture the new Display Name
      // (because the onAuthStateChanged listener might have fired before updateProfile completed)
      const syncedUser = await syncUserWithMongoDBHelper(userCredential.user);
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
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        loginWithGoogle,
        register,
        logout,
      }}
    >
      {children}
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
