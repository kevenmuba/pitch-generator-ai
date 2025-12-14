// src/services/transaction.service.ts
import api from "./api";

/**
 * 1️⃣ Create pending credit purchase
 * POST /transactions/credit-purchase
 */
export const createPendingCreditPurchase = async (credits: number) => {
  const res = await api.post("/transactions/credit-purchase", {
    credits,
  });
  return res.data; // returns transaction object
};

/**
 * 2️⃣ Create Stripe checkout session
 * POST /transactions/credit-purchase/checkout
 */
export const createStripeCheckoutSession = async (
  transactionId: string,
  credits: number
) => {
  const res = await api.post("/transactions/credit-purchase/checkout", {
    transactionId,
    credits,
  });
  return res.data; // Stripe session (has .url)
};

/**
 * 3️⃣ (Future) Get user transactions
 * GET /transactions
 */
export const getTransactions = async () => {
  const res = await api.get("/transactions");
  return res.data;
};





