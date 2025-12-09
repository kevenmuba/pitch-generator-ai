import { useState } from "react";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Zap, Crown, Check, Receipt, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { PaymentCardForm } from "@/components/payment/PaymentCardForm";

const paymentHistory = [
  { id: "INV-001", date: "Dec 1, 2024", amount: "$5.00", status: "Paid", description: "Unlimited Monthly" },
  { id: "INV-002", date: "Nov 15, 2024", amount: "$1.00", status: "Paid", description: "Single Credit" },
  { id: "INV-003", date: "Nov 1, 2024", amount: "$5.00", status: "Paid", description: "Unlimited Monthly" },
];

const Billing = () => {
  const { toast } = useToast();
  const { user, upgradePlan, updateCredits } = useAuth();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentType, setPaymentType] = useState<"credit" | "unlimited">("credit");

  const isUnlimited = user?.plan === "unlimited";

  const handlePurchase = (type: "credit" | "unlimited") => {
    setPaymentType(type);
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
    
    if (paymentType === "unlimited") {
      upgradePlan("unlimited");
      toast({
        title: "Welcome to Unlimited! 🎉",
        description: "You now have unlimited pitch generations.",
      });
    } else {
      updateCredits((user?.credits || 0) + 1);
      toast({
        title: "Credit added!",
        description: "You have 1 new credit to use.",
      });
    }
  };

  return (
    <UserDashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Billing</h1>
          <p className="text-muted-foreground">Manage your subscription and payment history</p>
        </div>

        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
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
                    <p className="font-display text-xl font-bold">
                      {isUnlimited ? "Unlimited Plan" : "Free Trial"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isUnlimited 
                        ? "Unlimited generations per month"
                        : `${user?.credits || 0} of 5 generations remaining`
                      }
                    </p>
                  </div>
                </div>
                <Badge variant={isUnlimited ? "neon" : "cyan"}>
                  {isUnlimited ? "PRO" : "Active"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upgrade Options */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="glass" className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Single Credit</CardTitle>
                    <CardDescription>One-time purchase</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-display text-3xl font-bold">$1</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-neon-cyan" />
                    1 additional generation
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-neon-cyan" />
                    All scenarios included
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-neon-cyan" />
                    Full customization
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handlePurchase("credit")}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Buy Credit
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="neon" className="h-full relative">
              <Badge variant="neon" className="absolute -top-3 left-1/2 -translate-x-1/2">
                Recommended
              </Badge>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                    <Crown className="w-5 h-5 text-neon-purple" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Unlimited</CardTitle>
                    <CardDescription>Monthly subscription</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-display text-3xl font-bold">$5<span className="text-base font-normal text-muted-foreground">/month</span></p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-neon-purple" />
                    Unlimited generations
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-neon-purple" />
                    All scenarios
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-neon-purple" />
                    Priority generation
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-neon-purple" />
                    Save favorites
                  </li>
                </ul>
                <Button 
                  variant="hero" 
                  className="w-full" 
                  onClick={() => handlePurchase("unlimited")}
                  disabled={isUnlimited}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  {isUnlimited ? "Current Plan" : "Upgrade Now"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Payment History */}
        <div>
          <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Payment History
          </h2>
          <Card variant="glass">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-4 font-medium text-muted-foreground">Invoice</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Description</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Amount</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id} className="border-b border-border/50 last:border-0">
                        <td className="p-4 font-mono text-sm">{payment.id}</td>
                        <td className="p-4 text-muted-foreground">{payment.date}</td>
                        <td className="p-4">{payment.description}</td>
                        <td className="p-4 font-medium">{payment.amount}</td>
                        <td className="p-4">
                          <Badge variant="cyan">{payment.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Form Modal */}
      <AnimatePresence>
        {showPaymentForm && (
          <PaymentCardForm
            amount={paymentType === "unlimited" ? "$5.00" : "$1.00"}
            description={paymentType === "unlimited" ? "Unlimited Monthly Plan" : "Single Credit Purchase"}
            onSuccess={handlePaymentSuccess}
            onCancel={() => setShowPaymentForm(false)}
          />
        )}
      </AnimatePresence>
    </UserDashboardLayout>
  );
};

export default Billing;
