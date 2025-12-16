// src/pages/dashboard/lesson.tsx
import React, { useEffect, useState } from "react";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getUserLessons } from "@/services/user-lesson.service";
import { useToast } from "@/hooks/use-toast";

type UserLesson = {
  id: string;
  scenario: string;
  skillLevel: string;
  currentPhase: number;
  status: string;
};

const Lesson = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<UserLesson[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const data = await getUserLessons();
      setLessons(data);
    } catch (err) {
      console.error(err);
      toast({ title: "Error fetching lessons", description: "Please try again" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleLessonClick = (lessonId: string) => {
    navigate(`/dashboard/lesson/${lessonId}`);
  };

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

  if (!loading && lessons.length === 0) {
    return (
      <UserDashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto" />
          <h2 className="text-xl font-semibold">No lessons started yet</h2>
          <p className="text-muted-foreground">
            You haven’t started any lesson yet. Go to the content library and pick a lesson to get started!
          </p>
        </div>
      </UserDashboardLayout>
    );
  }

  return (
    <UserDashboardLayout>
      <div className="space-y-6">
        <h1 className="font-display text-3xl font-bold">Your Lessons</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              className="cursor-pointer hover-lift"
              onClick={() => handleLessonClick(lesson.id)}
            >
              <CardContent className="flex justify-between items-center">
                <div>
                  <p className="font-medium mb-1 capitalize">{lesson.scenario}</p>
                  <Badge className={getSkillBadgeColor(lesson.skillLevel)}>
                    {lesson.skillLevel.charAt(0).toUpperCase() + lesson.skillLevel.slice(1)}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    Phase: {lesson.currentPhase} | Status: {lesson.status}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-all" />
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </UserDashboardLayout>
  );
};

export default Lesson;
