// src/pages/dashboard/content-list.tsx
import React, { useEffect, useState } from "react";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getTemplates } from "@/services/template.service";
import { useToast } from "@/hooks/use-toast";

type Template = {
  id: string;
  title: string;
  scenario: string;
  skillLevel: string;
  promptText: string;
  isPublic: boolean;
};

const scenarioOptions = [
  { value: "dating", label: "Dating" },
  { value: "cold_call", label: "Cold Call" },
  { value: "business", label: "Business" },
  { value: "pitch", label: "Pitch" },
  { value: "presentation", label: "Presentation" },
  { value: "negotiation", label: "Negotiation" },
];

const skillLevels = ["basic", "intermediate", "advanced"];

const ContentList = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const data = await getTemplates();
      setTemplates(data);
    } catch (err) {
      console.error(err);
      toast({ title: "Error fetching templates", description: "Please try again" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const getScenarioIcon = (scenario: string) => {
    switch (scenario) {
      case "dating":
        return "💖";
      case "cold_call":
        return "📞";
      case "business":
      case "pitch":
      case "presentation":
      case "negotiation":
        return "💼";
      default:
        return "📄";
    }
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

  // Group templates by scenario
  const groupedTemplates: Record<string, Template[]> = {};
  scenarioOptions.forEach((option) => {
    groupedTemplates[option.value] = templates.filter((t) => t.scenario === option.value);
  });

  return (
    <UserDashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Content Library</h1>
          <p className="text-muted-foreground">Choose a scenario and skill level to generate lessons</p>
        </div>

        {scenarioOptions.map((scenario, idx) => {
          const scenarioTemplates = groupedTemplates[scenario.value] || [];
          if (scenarioTemplates.length === 0) return null;

          return (
            <motion.div
              key={scenario.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-200 to-indigo-400 flex items-center justify-center`}
                >
                  <span className="text-lg">{getScenarioIcon(scenario.value)}</span>
                </div>
                <h2 className="font-display text-xl font-semibold">{scenario.label}</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {skillLevels.map((level) => {
                  const templatesForLevel = scenarioTemplates.filter(
                    (t) => t.skillLevel.toLowerCase() === level
                  );
                  return templatesForLevel.map((t) => (
                    <Link key={t.id} to={`/dashboard/content/${t.scenario}/${t.skillLevel}/${t.id}`}>
                      <Card variant="glass" className="hover-lift cursor-pointer group">
                        <CardContent className="p-5 flex items-center justify-between">
                          <div>
                            <p className="font-medium mb-1">{t.title}</p>
                            <Badge className={getSkillLevelColor(t.skillLevel)}>
                              {t.skillLevel.charAt(0).toUpperCase() + t.skillLevel.slice(1)}
                            </Badge>
                            {t.isPublic && (
                              <Badge variant="secondary" className="ml-2">
                                🌐 Public
                              </Badge>
                            )}
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                        </CardContent>
                      </Card>
                    </Link>
                  ));
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </UserDashboardLayout>
  );
};

export default ContentList;
