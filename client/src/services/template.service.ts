// src/services/template.service.ts
import api from "./api";

/**
 * 1️⃣ Get all templates (optionally by scenario/skillLevel)
 * GET /templates?scenario=&skillLevel=
 */
export const getTemplates = async (scenario?: string, skillLevel?: string) => {
  const query = new URLSearchParams();
  if (scenario) query.append("scenario", scenario);
  if (skillLevel) query.append("skillLevel", skillLevel);

  const res = await api.get(`/templates?${query.toString()}`);
  return res.data; // returns array of Template objects
};

/**
 * 2️⃣ Create a new template (admin only)
 * POST /templates
 */
export const createTemplate = async (data: {
  title: string;
  scenario: string;
  skillLevel: string;
  promptText: string;
  isPublic?: boolean;
}) => {
  const res = await api.post("/templates", data);
  return res.data; // returns created Template
};

/**
 * 3️⃣ Update template (admin only)
 * PATCH /templates/:id
 */
export const updateTemplate = async (id: string, data: Partial<{
  title: string;
  scenario: string;
  skillLevel: string;
  promptText: string;
  isPublic: boolean;
}>) => {
  const res = await api.patch(`/templates/${id}`, data);
  return res.data;
};

/**
 * 4️⃣ Delete template (admin only)
 * DELETE /templates/:id
 */
export const deleteTemplate = async (id: string) => {
  const res = await api.delete(`/templates/${id}`);
  return res.data;
};
