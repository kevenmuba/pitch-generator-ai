import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const plans = [
  {
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
    variant: "outline" as const,
    popular: false
  },
  {
    name: "Unlimited",
    price: "$5",
    period: "/month",
    description: "Full access to all PitchRocket features",
    icon: Crown,
    features: [
      "Unlimited generations",
      "All scenarios unlocked",
      "All skill levels",
      "Priority generation",
      "Save favorites",
      "Early access to new features"
    ],
    cta: "Get Unlimited",
    variant: "hero" as const,
    popular: true
  }
];

export function PricingSection() {
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
            Start with 5 free generations. Upgrade when you're ready.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                variant={plan.popular ? "neon" : "glass"} 
                className={`h-full relative ${plan.popular ? "scale-105" : ""}`}
              >
                {plan.popular && (
                  <Badge variant="neon" className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
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
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <Check className="w-4 h-4 text-neon-cyan" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button variant={plan.variant} size="lg" className="w-full" asChild>
                    <Link to="/register">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}