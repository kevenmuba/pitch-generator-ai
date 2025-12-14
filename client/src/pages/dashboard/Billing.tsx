import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Crown, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth.store";
import { createPendingCreditPurchase, createStripeCheckoutSession } from "@/services/transaction.service";

const Billing = () => {
  const { toast } = useToast();
  const user = useAuthStore((state) => state.user);

  const isUnlimited = user?.isUnlimited === false;

  const handlePurchase = async (credits: number) => {
  if (!user?.id) {
    toast({
      title: "Not logged in",
      description: "Please log in to purchase credits",
      variant: "destructive",
    });
    return;
  }

  try {
    // Step 1: Create pending transaction
    const transaction = await createPendingCreditPurchase(credits);

    toast({
      title: "Pending transaction created",
      // description: `Transaction ID: ${transaction.id}`,
      description: `the payment is on progress, you will be redirected to the payment page`,
      variant: "default",
    });

    // Step 2: Create Stripe checkout session automatically
    const session = await createStripeCheckoutSession(transaction.id, credits);

    // Step 3: Redirect user to Stripe
    window.location.href = session.url;
  } catch (err: any) {
    toast({
      title: "Error",
      description: err.message || "Unable to process payment",
      variant: "destructive",
    });
  }
};


  return (
    <UserDashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-bold">Billing</h1>
          <p className="text-muted-foreground">Manage your subscription and payment history</p>
        </div>

        {/* Current Plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="neon">
            <CardContent className="p-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center">
                  {isUnlimited ? <Crown className="w-6 h-6 text-neon-purple" /> : <Zap className="w-6 h-6 text-neon-purple" />}
                </div>
                <div>
                  <p className="font-display text-xl font-bold">{isUnlimited ? "Unlimited Plan" : "Free Trial"}</p>
                  <p className="text-sm text-muted-foreground">{isUnlimited ? "Unlimited generations per month" : `${user?.credits || 0} credits remaining`}</p>
                </div>
              </div>
              <Badge variant={isUnlimited ? "neon" : "cyan"}>{isUnlimited ? "PRO" : "Active"}</Badge>
            </CardContent>
          </Card>
        </motion.div>

        {/* Single Credit Purchase */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Single Credit</CardTitle>
              <CardDescription>One-time purchase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-display text-3xl font-bold">$1</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-neon-cyan" /> 1 additional generation
                </li>
              </ul>
              <Button variant="outline" className="w-full" onClick={() => handlePurchase(1)}>
                Buy Credit
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </UserDashboardLayout>
  );
};

export default Billing;
