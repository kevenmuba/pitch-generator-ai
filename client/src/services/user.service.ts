import api from "./api";

// fetch user profile with token
export const fetchProfile = async (token: string) => {
  const res = await api.get("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// update profile with token
export const updateProfileService = async (token: string, data: { name?: string; email?: string }) => {
  const res = await api.patch("/users/me", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
