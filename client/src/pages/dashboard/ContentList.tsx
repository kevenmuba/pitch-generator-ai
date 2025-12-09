import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Phone, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const contentCategories = [
  {
    category: "Dating & Social",
    icon: Heart,
    color: "from-pink-500/20 to-rose-500/20",
    items: [
      { title: "Beginner Pitching Girls", href: "/dashboard/content/dating/beginner", level: "Beginner" },
      { title: "Intermediate Pitching Girls", href: "/dashboard/content/dating/intermediate", level: "Intermediate" },
      { title: "Advanced Pitching Girls", href: "/dashboard/content/dating/advanced", level: "Advanced" },
    ]
  },
  {
    category: "Cold Calling",
    icon: Phone,
    color: "from-neon-cyan/20 to-blue-500/20",
    items: [
      { title: "Cold Call Beginner", href: "/dashboard/content/cold-calling/beginner", level: "Beginner" },
      { title: "Cold Call Intermediate", href: "/dashboard/content/cold-calling/intermediate", level: "Intermediate" },
      { title: "Cold Call Advanced", href: "/dashboard/content/cold-calling/advanced", level: "Advanced" },
    ]
  },
  {
    category: "Business Pitching",
    icon: Briefcase,
    color: "from-neon-purple/20 to-violet-500/20",
    items: [
      { title: "Business Intro Beginner", href: "/dashboard/content/business/beginner", level: "Beginner" },
      { title: "Business Intro Intermediate", href: "/dashboard/content/business/intermediate", level: "Intermediate" },
      { title: "Business Intro Advanced", href: "/dashboard/content/business/advanced", level: "Advanced" },
    ]
  }
];

const ContentList = () => {
  return (
    <UserDashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Content Library</h1>
          <p className="text-muted-foreground">Choose a scenario and skill level to generate pitches</p>
        </div>

        {contentCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                <category.icon className="w-5 h-5 text-foreground" />
              </div>
              <h2 className="font-display text-xl font-semibold">{category.category}</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {category.items.map((item, index) => (
                <Link key={index} to={item.href}>
                  <Card variant="glass" className="hover-lift cursor-pointer group">
                    <CardContent className="p-5 flex items-center justify-between">
                      <div>
                        <p className="font-medium mb-1">{item.title}</p>
                        <Badge variant={item.level === "Advanced" ? "neon" : item.level === "Intermediate" ? "cyan" : "glass"}>
                          {item.level}
                        </Badge>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </UserDashboardLayout>
  );
};

export default ContentList;