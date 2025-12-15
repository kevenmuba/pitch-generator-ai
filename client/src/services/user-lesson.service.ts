// src/services/user-lesson.service.ts
import api from "./api";

/**
 * 1️⃣ Create a new user lesson
 * POST /user-lessons
 */
export const createUserLesson = async (data: {
  scenario: string;
  skillLevel: string;
}) => {
  const res = await api.post("/user-lessons", data);
  return res.data; // returns created UserLesson
};

/**
 * 2️⃣ Get all lessons for the current user
 * GET /user-lessons
 */
export const getUserLessons = async () => {
  const res = await api.get("/user-lessons");
  return res.data; // array of UserLesson objects
};

/**
 * 3️⃣ Update a lesson (phase or status)
 * PATCH /user-lessons/:id
 */
export const updateUserLesson = async (
  id: string,
  data: Partial<{ currentPhase: number; status: string }>
) => {
  const res = await api.patch(`/user-lessons/${id}`, data);
  return res.data; // updated UserLesson
};

/**
 * 4️⃣ Delete a lesson
 * DELETE /user-lessons/:id
 */
export const deleteUserLesson = async (id: string) => {
  const res = await api.delete(`/user-lessons/${id}`);
  return res.data;
};
