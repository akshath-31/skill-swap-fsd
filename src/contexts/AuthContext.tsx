import { createContext, useContext, useState, ReactNode } from "react";

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (email && password) {
      setUser({
        name: "Alex Johnson",
        email: email,
        avatar: "",
        credits: 250,
        role: email === "admin@skillswap.com" ? "admin" : "user",
      });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setUser({
      name: "Alex Johnson",
      email: "alex@gmail.com",
      avatar: "",
      credits: 250,
      role: "user",
    });
    setIsAuthenticated(true);
    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (name && email && password) {
      setUser({
        name,
        email,
        avatar: "",
        credits: 100,
        role: "user",
      });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, loginWithGoogle, register, logout }}>
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
