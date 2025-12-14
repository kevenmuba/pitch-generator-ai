// src/pages/billing/BillingCancel.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BillingCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 text-center">
      <h2 className="text-2xl font-bold text-red-500">
        Payment cancelled ❌
      </h2>
      <p className="text-muted-foreground max-w-md">
        Your payment was not completed. No charges were made.
      </p>

      <Button onClick={() => navigate("/dashboard/billing")}>
        Back to Billing
      </Button>
    </div>
  );
};

export default BillingCancel;
