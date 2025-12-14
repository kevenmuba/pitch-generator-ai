import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Rocket, Mail, Lock, User, ArrowRight, Sparkles, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth.store";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { register, user, loading, error } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if logged in already
  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(email, password, name); // role defaults to "user"

      toast({
        title: "Account created! 🚀",
        description: "Welcome to PitchRocket. Your free trial is activated.",
      });

      navigate("/dashboard");
    } catch (err: any) {
      toast({
        title: "Registration failed",
        description: error || err.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const freeTrialFeatures = [
    "5 free pitch generations",
    "All scenarios included",
    "Full customization options",
    "No credit card required",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-neon-purple/5 to-background" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-neon-cyan/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-neon-purple/10 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card variant="glass" className="backdrop-blur-xl">
          <CardHeader className="text-center space-y-4">
            <Link to="/" className="flex items-center justify-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan">
                <Rocket className="w-5 h-5 text-foreground" />
              </div>
              <span className="font-display font-bold text-xl">PitchRocket</span>
            </Link>

            <div>
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                Start Free Trial
                <Sparkles className="w-5 h-5 text-neon-cyan" />
              </CardTitle>
              <CardDescription>Create your account and get started instantly</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Free Trial Benefits */}
            <div className="bg-neon-purple/10 rounded-xl p-4 border border-neon-purple/20">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="neon">FREE TRIAL</Badge>
                <span className="text-sm text-muted-foreground">No payment required</span>
              </div>

              <ul className="space-y-2">
                {freeTrialFeatures.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Check className="w-4 h-4 text-neon-cyan" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Minimum 8 characters</p>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Start Free Trial"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <p className="text-center text-xs text-muted-foreground">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-neon-purple hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
