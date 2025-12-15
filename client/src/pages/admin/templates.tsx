import React, { useEffect, useState } from "react";
import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  getTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} from "@/services/template.service";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type Template = {
  id: string;
  title: string;
  scenario: string;
  skillLevel: string;
  promptText: string;
  isPublic: boolean;
};

const AdminTemplates = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [form, setForm] = useState<Partial<Template>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const data = await getTemplates();
      setTemplates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateTemplate(editingId, form);
        toast({ title: "Template Updated", description: `Updated ${form.title}` });
      } else {
        await createTemplate(form as any);
        toast({ title: "Template Created", description: `Created ${form.title}` });
      }
      setForm({});
      setEditingId(null);
      fetchTemplates();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (template: Template) => {
    setEditingId(template.id);
    setForm(template);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;
    await deleteTemplate(id);
    toast({ title: "Template Deleted", description: `Deleted ${title}` });
    fetchTemplates();
  };

  const getSkillLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "basic":
        return "bg-green-100 text-green-700 border-green-300";
      case "intermediate":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "advanced":
        return "bg-purple-100 text-purple-700 border-purple-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getScenarioIcon = (scenario: string) => {
    switch (scenario.toLowerCase()) {
      case "cold_call":
        return "📞";
      case "pitch":
        return "🎯";
      case "presentation":
        return "📊";
      case "negotiation":
        return "🤝";
      case "dating":
        return "💘";
      case "business":
        return "💼";
      default:
        return "💡";
    }
  };

  const filteredTemplates = templates.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.scenario.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Templates</h1>
            <p className="text-muted-foreground">Manage all templates</p>
          </div>
          <div className="relative max-w-xs w-full">
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "✏️ Edit Template" : "➕ Create New Template"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Template Title"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />

              {/* Scenario Dropdown */}
              <label className="block">
                Scenario
                <select
                  value={form.scenario || ""}
                  onChange={(e) => setForm({ ...form, scenario: e.target.value })}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                >
                  <option value="" disabled className="text-gray-400 dark:text-gray-400">
                    Select Scenario
                  </option>
                  <option value="dating">Dating</option>
                  <option value="cold_call">Cold Call</option>
                  <option value="business">Business</option>
                  <option value="pitch">Pitch</option>
                  <option value="presentation">Presentation</option>
                  <option value="negotiation">Negotiation</option>
                </select>
              </label>

              {/* Skill Level Dropdown */}
              <label className="block">
                Skill Level
                <select
                  value={form.skillLevel || ""}
                  onChange={(e) => setForm({ ...form, skillLevel: e.target.value })}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                >
                  <option value="" disabled className="text-gray-400 dark:text-gray-400">
                    Select Skill Level
                  </option>
                  <option value="basic">Basic</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </label>

              <textarea
                placeholder="Prompt Text"
                value={form.promptText || ""}
                onChange={(e) => setForm({ ...form, promptText: e.target.value })}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isPublic || false}
                  onChange={(e) => setForm({ ...form, isPublic: e.target.checked })}
                />
                🌐 Make Public
              </label>

              <div className="flex gap-3">
                <Button type="submit">
                  {editingId ? "💾 Update Template" : "✨ Create Template"}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setForm({});
                      setEditingId(null);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Template Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading
            ? "Loading..."
            : filteredTemplates.map((t) => (
                <Card key={t.id} className="overflow-hidden">
                  <CardContent>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-3xl mb-2">{getScenarioIcon(t.scenario)}</div>
                        <h3 className="font-bold text-lg">{t.title}</h3>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <Badge className={getSkillLevelColor(t.skillLevel)}>
                            {t.skillLevel}
                          </Badge>
                          {t.isPublic && <Badge variant="secondary">🌐 Public</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                          {t.promptText}
                        </p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(t)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(t.id, t.title)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </motion.div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminTemplates;
