import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

const BillingSuccess = () => {
  const navigate = useNavigate();
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    const refresh = async () => {
      try {
        await loadUser(); // 🔁 refresh user credits from backend
      } catch (err) {
        console.error("Failed to refresh user after payment", err);
      } finally {
        setTimeout(() => {
          navigate("/dashboard/billing");
        }, 2000);
    }
    };

    refresh();
  }, [loadUser, navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <h2 className="text-2xl font-bold">
        Payment successful 🎉 Redirecting...
      </h2>
    </div>
  );
};

export default BillingSuccess;
