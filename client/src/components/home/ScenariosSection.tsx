import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Phone, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const scenarios = [
  {
    icon: Heart,
    title: "Dating & Social",
    description: "Master the art of introduction with confident, charming, and memorable openers.",
    levels: ["Beginner", "Intermediate", "Advanced"],
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30"
  },
  {
    icon: Phone,
    title: "Cold Calling",
    description: "Turn cold calls into warm conversations with persuasive, natural scripts.",
    levels: ["Beginner", "Intermediate", "Advanced"],
    color: "from-neon-cyan/20 to-blue-500/20",
    borderColor: "border-neon-cyan/30"
  },
  {
    icon: Briefcase,
    title: "Business Intros",
    description: "Make powerful first impressions that open doors and build connections.",
    levels: ["Beginner", "Intermediate", "Advanced"],
    color: "from-neon-purple/20 to-violet-500/20",
    borderColor: "border-neon-purple/30"
  }
];

export function ScenariosSection() {
  return (
    <section id="scenarios" className="py-24 relative bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Supported <span className="gradient-text">Scenarios</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From casual conversations to professional settings, PitchRocket has you covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {scenarios.map((scenario, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full bg-gradient-to-br ${scenario.color} border ${scenario.borderColor} hover-lift`}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-background/50 backdrop-blur flex items-center justify-center mx-auto mb-6">
                    <scenario.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3">{scenario.title}</h3>
                  <p className="text-muted-foreground mb-6">{scenario.description}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {scenario.levels.map((level) => (
                      <Badge key={level} variant="glass" className="text-xs">
                        {level}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}