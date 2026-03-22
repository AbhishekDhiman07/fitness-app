import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserProfile } from "@/types/fitness";

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, password: string) => boolean;
  signup: (data: Omit<UserProfile, "id" | "createdAt"> & { password: string }) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

const USERS_KEY = "fitmotion_users";
const SESSION_KEY = "fitmotion_session";

interface StoredUser {
  profile: UserProfile;
  password: string;
}

function getUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [user]);

  const signup = (data: Omit<UserProfile, "id" | "createdAt"> & { password: string }) => {
    const users = getUsers();
    if (users.find((u) => u.profile.email === data.email)) return false;

    const profile: UserProfile = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      age: data.age,
      weight: data.weight,
      height: data.height,
      goal: data.goal,
      createdAt: new Date().toISOString(),
    };

    users.push({ profile, password: data.password });
    saveUsers(users);
    setUser(profile);
    return true;
  };

  const login = (email: string, password: string) => {
    const users = getUsers();
    const found = users.find((u) => u.profile.email === email && u.password === password);
    if (!found) return false;
    setUser(found.profile);
    return true;
  };

  const logout = () => setUser(null);

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    const users = getUsers();
    const idx = users.findIndex((u) => u.profile.id === user.id);
    if (idx >= 0) {
      users[idx].profile = updated;
      saveUsers(users);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
