// src/store/auth.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginService, registerService } from "@/services/auth.service";
import { fetchProfile, updateProfileService } from "@/services/user.service";

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  credits: number;
  trialCredits: number;
  isUnlimited: boolean;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string, role?: string) => Promise<void>;
  loadUser: () => Promise<void>;
  updateProfile: (data: { name?: string; email?: string }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
    user: null,
      token: null,
      loading: false,
      error: null,

      // LOGIN
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const data = await loginService(email, password);

          if (!data.access_token) throw new Error("Invalid email or password");

          set({ token: data.access_token });

          // Load user profile using token
          await get().loadUser();

          if (!get().user) throw new Error("Failed to load user profile");
        } catch (err: any) {
          set({ error: err.response?.data?.message || err.message || "Login failed" });
          throw err; // important so Login.tsx catch works
        } finally {
          set({ loading: false });
        }
      },

      // REGISTER
      register: async (email, password, name, role = "user") => {
        set({ loading: true, error: null });
        try {
          const data = await registerService(email, password, name, role);

          if (!data.access_token) throw new Error("Registration failed");

          set({ token: data.access_token });

          // Load profile after registration
          await get().loadUser();

          if (!get().user) throw new Error("Failed to load user profile after registration");
        } catch (err: any) {
          set({ error: err.response?.data?.message || err.message || "Registration failed" });
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      // LOAD USER FROM TOKEN
      loadUser: async () => {
        try {
          const token = get().token;
          if (!token) throw new Error("No token found");

          const profile = await fetchProfile(token); // throws if 401
          set({ user: profile });
          return profile;
        } catch (err: any) {
          set({ user: null, token: null });
          throw err;
        }
      },

      // UPDATE PROFILE
      updateProfile: async (data) => {
        try {
          const token = get().token;
          if (!token) throw new Error("Not authenticated");

          const updated = await updateProfileService(token, data);
          set({ user: updated });
        } catch (err: any) {
          console.error("Update failed:", err);
          throw err;
        }
      },

      // LOGOUT
      logout: () => {
        set({ user: null, token: null });
      },
    }),
    { name: "auth-store" } 
  )
);
