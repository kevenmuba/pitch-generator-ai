// src/services/pitch.service.ts
import api from "./api";

/**
 * 1️⃣ Get all pitches of the current user
 * GET /pitches
 */
export const getUserPitches = async () => {
  const res = await api.get("/pitches");
  return res.data; // returns array of Pitch objects
};

/**
 * 2️⃣ Get a single pitch by ID
 * GET /pitches/:id
 */
export const getPitchById = async (id: string) => {
  const res = await api.get(`/pitches/${id}`);
  return res.data; // returns single Pitch object
};

/**
 * 3️⃣ Generate a new pitch
 * POST /pitches/generate
 */
export const generatePitch = async (data: {
  scenario: string;
  skillLevel: string;
  phase: number;
  templateId?: string;
  tone?: string;
  length?: string;
}) => {
  const res = await api.post("/pitches/generate", data);
  return res.data; // returns generated Pitch object
};

/**
 * 4️⃣ Get all pitches for a specific lesson
 * GET /pitches/lesson/:lessonId
 */
export const getLessonPitches = async (lessonId: string) => {
  const res = await api.get(`/pitches/lesson/${lessonId}`);
  return res.data; // returns array of Pitch objects for the lesson
};
