import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreditCard, Lock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentCardFormProps {
  amount: string;
  description: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PaymentCardForm({ amount, description, onSuccess, onCancel }: PaymentCardFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsSuccess(true);

    // Wait for success animation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onSuccess();
  };

  const getCardType = () => {
    const number = cardNumber.replace(/\s/g, "");
    if (number.startsWith("4")) return "visa";
    if (number.startsWith("5") || number.startsWith("2")) return "mastercard";
    if (number.startsWith("3")) return "amex";
    return null;
  };

  const cardType = getCardType();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
    >
      <Card variant="glass" className="w-full max-w-md relative overflow-hidden">
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <CheckCircle2 className="w-20 h-20 text-neon-cyan" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 font-display text-xl font-bold"
              >
                Payment Successful!
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <CardHeader className="text-center">
          <div className="mx-auto w-14 h-14 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center mb-4">
            <CreditCard className="w-7 h-7 text-foreground" />
          </div>
          <CardTitle className="text-xl">Complete Payment</CardTitle>
          <CardDescription>{description}</CardDescription>
          <p className="font-display text-3xl font-bold text-neon-cyan mt-2">{amount}</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Card Preview */}
            <div className="relative h-44 rounded-xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 p-6 overflow-hidden border border-border/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-neon-cyan/10 rounded-full blur-3xl" />
              
              <div className="flex justify-between items-start relative">
                <div className="w-12 h-8 rounded bg-gradient-to-br from-yellow-400 to-yellow-600" />
                {cardType && (
                  <div className="text-xl font-bold text-foreground/80">
                    {cardType === "visa" && "VISA"}
                    {cardType === "mastercard" && "MC"}
                    {cardType === "amex" && "AMEX"}
                  </div>
                )}
              </div>

              <p className="mt-6 font-mono text-lg tracking-widest text-foreground/90">
                {cardNumber || "•••• •••• •••• ••••"}
              </p>

              <div className="mt-4 flex justify-between text-sm">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Card Holder</p>
                  <p className="font-medium text-foreground/90">{name || "YOUR NAME"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Expires</p>
                  <p className="font-medium text-foreground/90">{expiry || "MM/YY"}</p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    maxLength={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    maxLength={4}
                    type="password"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>Your payment is secure and encrypted</span>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onCancel}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="hero"
                className="flex-1"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : `Pay ${amount}`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
