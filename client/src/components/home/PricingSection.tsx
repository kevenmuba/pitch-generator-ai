import { useNavigate } from "react-router-dom"; // <-- React Router
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";
import { motion } from "framer-motion";

const plan = {
  name: "Single Credit",
  price: "$1",
  period: "one-time",
  description: "Perfect for trying out specific scenarios",
  icon: Zap,
  features: [
    "1 scenario access",
    "All skill levels",
    "Full tone customization",
    "Instant generation"
  ],
  cta: "Buy Credit",
  popular: true
};

export function PricingSection() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const handleClick = () => {
    if (user?.id) {
      // Navigate to billing/payment page
      navigate("/billing");
    } else {
      // Navigate to login page
      navigate("/login");
    }
  };

  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start with 5 free generations. Buy a single credit to continue.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-sm mx-auto"
        >
          <Card variant={plan.popular ? "neon" : "glass"} className="h-full relative">
            {plan.popular && (
              <Badge variant="neon" className="absolute -top-3 left-1/2 -translate-x-1/2">
                Best Value
              </Badge>
            )}
            <CardHeader className="text-center pb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 flex items-center justify-center mx-auto mb-4">
                <plan.icon className="w-7 h-7 text-neon-purple" />
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <p className="text-muted-foreground text-sm">{plan.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <span className="font-display text-5xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-1">{plan.period}</span>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-neon-cyan" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className="w-full bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:scale-105 transition-transform duration-200"
                size="lg"
                onClick={handleClick} // <- login check
              >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
