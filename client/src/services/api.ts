import axios from "axios";
import { useAuthStore } from "@/store/auth.store";

const api = axios.create({
  baseURL: "https://pitch-generator-ai-5.onrender.com", // your NestJS backend
});

// Automatically attach token from Zustand store
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  console.log("Sending token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
