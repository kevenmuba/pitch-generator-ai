import api from "./api";

/**
 * 1️⃣ Create pending credit purchase
 * POST /transactions/credit-purchase
 */
export const createCreditPurchase = async (credits: number) => {
  const res = await api.post("/transactions/credit-purchase", {
    credits,
  });
  return res.data;
};

/**
 * 2️⃣ Create Stripe checkout session
 * POST /transactions/credit-purchase/checkout
 */
export const createStripeCheckout = async (
  transactionId: string,
  credits: number
) => {
  const res = await api.post("/transactions/credit-purchase/checkout", {
    transactionId,
    credits,
  });
  return res.data; // returns Stripe session
};

/**
 * 3️⃣ Get user transaction history
 * GET /transactions
 * (you will implement this backend endpoint later)
 */
export const getTransactions = async () => {
  const res = await api.get("/transactions");
  return res.data;
};
