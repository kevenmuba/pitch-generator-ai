// src/pages/dashboard/lesson-detail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles } from "lucide-react";
import { getUserLessonById } from "@/services/user-lesson.service";
import { getLessonPitches, generatePitch } from "@/services/pitch.service";
import { useToast } from "@/hooks/use-toast";

type UserLesson = {
  id: string;
  scenario: string;
  skillLevel: string;
  currentPhase: number;
  status: string;
};

const MAX_PHASES = 3;

const LessonDetail = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { toast } = useToast();

  const [lesson, setLesson] = useState<UserLesson | null>(null);
  const [loading, setLoading] = useState(false);

  const [aiPitch, setAiPitch] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const [pitches, setPitches] = useState<any[]>([]);
  const [loadingPitches, setLoadingPitches] = useState(false);

  // Fetch lesson details
  const fetchLesson = async () => {
    if (!lessonId) return;
    setLoading(true);
    try {
      const data = await getUserLessonById(lessonId);
      setLesson(data);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error loading lesson",
        description: "Unable to fetch lesson details",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch all pitches for the lesson
  const fetchPitches = async () => {
    if (!lessonId) return;
    setLoadingPitches(true);
    try {
      const data = await getLessonPitches(lessonId);
      setPitches(data);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error loading pitches",
        description: "Unable to fetch AI-generated guidance",
      });
    } finally {
      setLoadingPitches(false);
    }
  };

  // Generate pitch for the current phase
  const handleGeneratePitch = async () => {
    if (!lesson) return;
    setGenerating(true);
    try {
      const pitch = await generatePitch({
        scenario: lesson.scenario,
        skillLevel: lesson.skillLevel.toLowerCase(),
        phase: Number(lesson.currentPhase),
        tone: "confident",
        length: "medium",
        lessonId: lesson.id, // important
      });
      setAiPitch(pitch.resultText);
      fetchPitches(); // refresh pitch list
    } catch (err: any) {
      console.error("Pitch generation error:", err);
      toast({
        title: "Error generating pitch",
        description:
          err?.response?.data?.message || err.message || "Something went wrong",
      });
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    fetchLesson();
    fetchPitches();
  }, [lessonId]);

  const getSkillBadgeColor = (level: string) => {
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

  if (loading || !lesson) {
    return (
      <UserDashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-muted-foreground">Loading lesson...</p>
        </div>
      </UserDashboardLayout>
    );
  }

  const progressPercentage = Math.min(
    (lesson.currentPhase / MAX_PHASES) * 100,
    100
  );

  return (
    <UserDashboardLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold capitalize">
            {lesson.scenario} Lesson
          </h1>
          <p className="text-muted-foreground mt-1">
            Improve your {lesson.scenario.replace("_", " ")} skills step by step
          </p>
        </motion.div>

        {/* Lesson Info */}
        <Card>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Badge className={getSkillBadgeColor(lesson.skillLevel)}>
                {lesson.skillLevel.toUpperCase()}
              </Badge>
              <Badge variant="secondary">
                Phase {lesson.currentPhase} of {MAX_PHASES}
              </Badge>
              <Badge variant="outline">{lesson.status}</Badge>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phase Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card variant="glass">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                <h2 className="text-xl font-semibold">
                  Current Phase: {lesson.currentPhase}
                </h2>
              </div>

              <p className="text-muted-foreground">
                This phase focuses on mastering key communication techniques.
                When you’re ready, generate an AI-guided pitch to continue.
              </p>

              <Button className="gap-2" onClick={handleGeneratePitch} disabled={generating}>
                <Sparkles className="w-4 h-4" />
                {generating ? "Generating..." : "Generate AI Guide"}
              </Button>

              {/* Render AI Pitch */}
              {aiPitch && (
                <Card className="mt-4">
                  <CardContent>
                    <h3 className="text-lg font-semibold mb-2">AI Guidance:</h3>
                    <div className="whitespace-pre-wrap text-muted-foreground">
                      {aiPitch}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Render all pitches for the lesson */}
              {loadingPitches ? (
                <p className="text-muted-foreground mt-2">Loading previous phases...</p>
              ) : (
                pitches.length > 0 && (
                  <div className="space-y-4 mt-4">
                    {pitches.map((p) => (
                      <Card key={p.id} variant={p.phase === lesson.currentPhase ? "default" : "outline"}>
                        <CardContent className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">
                              Phase {p.phase} {p.phase === lesson.currentPhase && "(Current)"}
                            </h3>
                            <span className="text-sm text-muted-foreground">
                              {new Date(p.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="whitespace-pre-wrap text-muted-foreground">
                            {p.resultText}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </UserDashboardLayout>
  );
};

export default LessonDetail;
