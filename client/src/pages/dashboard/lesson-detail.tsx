import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles } from "lucide-react";
import { getUserLessonById } from "@/services/user-lesson.service";
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

  useEffect(() => {
    fetchLesson();
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
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

              <Button className="gap-2">
                <Sparkles className="w-4 h-4" />
                Generate AI Guide
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </UserDashboardLayout>
  );
};

export default LessonDetail;
