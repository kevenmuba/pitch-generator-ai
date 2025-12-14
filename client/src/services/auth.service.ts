import api from "./api";

export const loginService = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const registerService = async (
  email: string,
  password: string,
  name?: string,
  role: string = "user"
) => {
  const res = await api.post("/auth/register", {
    email,
    password,
    name,
    role,
  });
  return res.data;
};
