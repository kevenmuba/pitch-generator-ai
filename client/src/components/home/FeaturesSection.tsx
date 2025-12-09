import { Card, CardContent } from "@/components/ui/card";
import { Brain, Sliders, Zap, Target, MessageSquare, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Generation",
    description: "Advanced AI analyzes context and generates personalized pitches tailored to your scenario."
  },
  {
    icon: Sliders,
    title: "Tone Customization",
    description: "Adjust confidence, formality, humor, and length to match your personal style."
  },
  {
    icon: Target,
    title: "Skill-Level Adaptation",
    description: "From beginner to advanced, get pitches that match your experience level."
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Generate multiple pitch variations in seconds, ready to use immediately."
  },
  {
    icon: MessageSquare,
    title: "Multiple Scenarios",
    description: "Dating, cold calling, business intros - we've got every situation covered."
  },
  {
    icon: TrendingUp,
    title: "Learn & Improve",
    description: "Study different approaches and elevate your pitching skills over time."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            What <span className="gradient-text">PitchRocket</span> Does
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dynamic pitch generation powered by advanced AI, customizable to your unique style and situation.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card variant="glass" className="h-full hover-lift group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 flex items-center justify-center mb-4 group-hover:from-neon-purple/30 group-hover:to-neon-cyan/30 transition-colors">
                    <feature.icon className="w-6 h-6 text-neon-purple" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}