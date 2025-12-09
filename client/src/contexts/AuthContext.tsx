import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type UserRole = "admin" | "user";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  credits: number;
  plan: "free" | "unlimited";
  createdAt: string;
  totalSpent: number;
  generationsCount: number;
}

// Mock users database
const mockUsers: MockUser[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@demo.com",
    role: "admin",
    credits: 999,
    plan: "unlimited",
    createdAt: "2024-01-15",
    totalSpent: 0,
    generationsCount: 0,
  },
  {
    id: "2",
    name: "John Doe",
    email: "user@demo.com",
    role: "user",
    credits: 3,
    plan: "free",
    createdAt: "2024-06-01",
    totalSpent: 15,
    generationsCount: 47,
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    credits: 5,
    plan: "unlimited",
    createdAt: "2024-05-20",
    totalSpent: 25,
    generationsCount: 124,
  },
  {
    id: "4",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "user",
    credits: 0,
    plan: "free",
    createdAt: "2024-08-10",
    totalSpent: 5,
    generationsCount: 8,
  },
  {
    id: "5",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "user",
    credits: 2,
    plan: "unlimited",
    createdAt: "2024-04-05",
    totalSpent: 45,
    generationsCount: 256,
  },
];

interface AuthContextType {
  user: MockUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (name: string, email: string) => void;
  updateCredits: (newCredits: number) => void;
  upgradePlan: (plan: "free" | "unlimited") => void;
  getAllUsers: () => MockUser[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("pitchrocket_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find user by email (mock authentication)
    const foundUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("pitchrocket_user", JSON.stringify(foundUser));
      return { success: true };
    }

    // For demo purposes, create a new user if email contains "admin"
    if (email.toLowerCase().includes("admin")) {
      const newAdmin: MockUser = {
        id: Date.now().toString(),
        name: "Admin User",
        email,
        role: "admin",
        credits: 999,
        plan: "unlimited",
        createdAt: new Date().toISOString().split("T")[0],
        totalSpent: 0,
        generationsCount: 0,
      };
      setUser(newAdmin);
      localStorage.setItem("pitchrocket_user", JSON.stringify(newAdmin));
      return { success: true };
    }

    return { success: false, error: "Invalid email or password. Try admin@demo.com or user@demo.com" };
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return { success: false, error: "An account with this email already exists" };
    }

    // Create new user with free trial
    const newUser: MockUser = {
      id: Date.now().toString(),
      name,
      email,
      role: "user",
      credits: 5, // Free trial credits
      plan: "free",
      createdAt: new Date().toISOString().split("T")[0],
      totalSpent: 0,
      generationsCount: 0,
    };

    setUser(newUser);
    localStorage.setItem("pitchrocket_user", JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pitchrocket_user");
  };

  const updateProfile = (name: string, email: string) => {
    if (user) {
      const updatedUser = { ...user, name, email };
      setUser(updatedUser);
      localStorage.setItem("pitchrocket_user", JSON.stringify(updatedUser));
    }
  };

  const updateCredits = (newCredits: number) => {
    if (user) {
      const updatedUser = { ...user, credits: newCredits };
      setUser(updatedUser);
      localStorage.setItem("pitchrocket_user", JSON.stringify(updatedUser));
    }
  };

  const upgradePlan = (plan: "free" | "unlimited") => {
    if (user) {
      const updatedUser = { 
        ...user, 
        plan,
        credits: plan === "unlimited" ? 999 : user.credits,
        totalSpent: user.totalSpent + (plan === "unlimited" ? 5 : 1)
      };
      setUser(updatedUser);
      localStorage.setItem("pitchrocket_user", JSON.stringify(updatedUser));
    }
  };

  const getAllUsers = () => mockUsers;

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile, updateCredits, upgradePlan, getAllUsers }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
