import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-ai.png";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-neon-purple/5 to-background" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-neon-purple/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-neon-cyan/10 blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <Badge variant="neon" className="mb-6">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Pitch Generation
            </Badge>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Master Every Pitch with{" "}
              <span className="gradient-text">AI-Powered</span> Confidence
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Generate dynamic, personalized pitches for dating, cold calling, and business introductions. 
              From beginner to advanced, PitchRocket adapts to your skill level and style.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" asChild>
                <Link to="/register">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a href="#pricing">View Pricing</a>
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                5 Free Generations
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-purple" />
                No Credit Card Required
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative animate-float">
              <img
                src={heroImage}
                alt="AI Pitch Assistant"
                className="w-full max-w-lg mx-auto rounded-2xl"
              />
              {/* Glow effect behind image */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-neon-purple/30 to-neon-cyan/30 blur-3xl rounded-full" />
            </div>

            {/* Floating Pitch Bubbles */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -left-4 top-1/4 glass-card p-3 rounded-lg max-w-[180px]"
            >
              <p className="text-xs text-muted-foreground mb-1">Confident</p>
              <p className="text-sm font-medium">"Hey, I couldn't help but notice..."</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -right-4 bottom-1/4 glass-card p-3 rounded-lg max-w-[180px]"
            >
              <p className="text-xs text-muted-foreground mb-1">Professional</p>
              <p className="text-sm font-medium">"I specialize in helping companies..."</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}