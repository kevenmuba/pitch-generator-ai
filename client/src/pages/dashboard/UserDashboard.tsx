import { useEffect, useState } from "react";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Heart,
  Phone,
  Briefcase,
  Clock,
  Zap,
  ArrowRight,
  Crown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth.store";
import { getUserLessons } from "@/services/user-lesson.service";
import { fetchUserCredits } from "@/services/user.service";
/* =======================
   Quick Scenarios
======================= */
const quickScenarios = [
  {
    icon: Heart,
    title: "Pitching Girls",
    description: "Dating & social introductions",
    href: "/dashboard/content",
    color: "from-pink-500/20 to-rose-500/20",
    levels: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    icon: Phone,
    title: "Cold Calling",
    description: "Professional outreach scripts",
    href: "/dashboard/content",
    color: "from-neon-cyan/20 to-blue-500/20",
    levels: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    icon: Briefcase,
    title: "Business Intros",
    description: "Professional networking",
    href: "/dashboard/content",
    color: "from-neon-purple/20 to-violet-500/20",
    levels: ["Beginner", "Intermediate", "Advanced"],
  },
];

const UserDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const isUnlimited = user?.name === "admin";
  const creditsRemaining = user?.credits || 0;

  const [recentLessons, setRecentLessons] = useState<any[]>([]);
  const [loadingLessons, setLoadingLessons] = useState(false);


  useEffect(() => {
  const loadCredits = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const creditsData = await fetchUserCredits(token);
    console.log(creditsData);
  };

  loadCredits();
}, []);

  /* =======================
     Fetch Recent Lessons
  ======================= */
  useEffect(() => {
    setLoadingLessons(true);
    getUserLessons()
      .then((data) => {
        // latest 4 lessons
        setRecentLessons(data.slice(0, 4));
      })
      .catch(console.error)
      .finally(() => setLoadingLessons(false));
  }, []);

  return (
    <UserDashboardLayout>
      <div className="space-y-8">
        {/* ================= Header ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">
              Welcome back, {user?.name?.split(" ")[0] || "User"}!
            </h1>
            <p className="text-muted-foreground">
              Continue your learning journey
            </p>
          </div>

          <Button variant="hero" size="lg" asChild>
            <Link to="/dashboard/content">
              <Sparkles className="w-5 h-5 mr-2" />
              Start New Lesson
            </Link>
          </Button>
        </div>

        {/* ================= Credits ================= */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="neon">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center">
                    {isUnlimited ? (
                      <Crown className="w-6 h-6 text-neon-purple" />
                    ) : (
                      <Zap className="w-6 h-6 text-neon-purple" />
                    )}
                  </div>

                  <div>
                    {isUnlimited ? (
                      <>
                        <p className="text-sm text-muted-foreground">
                          Current Plan
                        </p>
                        <p className="font-display text-3xl font-bold flex items-center gap-2">
                          Unlimited
                          <Badge variant="neon">PRO</Badge>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground">
                          Free Credits Remaining
                        </p>
                        <p className="font-display text-3xl font-bold">
                          {creditsRemaining} / 5
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {!isUnlimited && (
                  <Button variant="heroOutline" asChild>
                    <Link to="/dashboard/billing">
                      Upgrade to Unlimited
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ================= Quick Scenarios ================= */}
        <div>
          <h2 className="font-display text-xl font-semibold mb-4">
            Quick Scenarios
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {quickScenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={scenario.href}>
                  <Card
                    className={`h-full bg-gradient-to-br ${scenario.color} border-border/50 hover-lift cursor-pointer`}
                  >
                    <CardContent className="p-6">
                      <scenario.icon className="w-8 h-8 mb-4" />
                      <h3 className="font-display font-semibold text-lg mb-1">
                        {scenario.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {scenario.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {scenario.levels.map((level) => (
                          <Badge
                            key={level}
                            variant="glass"
                            className="text-xs"
                          >
                            {level}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= Recent Lessons ================= */}
        <div>
          <h2 className="font-display text-xl font-semibold mb-4">
            Recent Lessons
          </h2>

          <Card variant="glass">
            <CardContent className="p-0">
              {loadingLessons ? (
                <p className="p-4 text-sm text-muted-foreground">
                  Loading lessons...
                </p>
              ) : recentLessons.length === 0 ? (
                <p className="p-4 text-sm text-muted-foreground">
                  You haven’t started any lessons yet
                </p>
              ) : (
                recentLessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    to={`/dashboard/lesson/${lesson.id}`}
                    className="block"
                  >
                    <div className="flex items-center justify-between p-4 border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                      <div>
                        <p className="font-medium capitalize">
                          {lesson.scenario} lesson
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {lesson.skillLevel} • Phase {lesson.currentPhase}/
                          {lesson.totalPhases}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {lesson.status.replace("_", " ")}
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default UserDashboard;
