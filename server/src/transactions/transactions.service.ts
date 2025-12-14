import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { stripe } from 'lib/stripe';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async createPendingCreditPurchase(userId: string, credits: number) {
    const amountCents = credits * 100;

    return this.prisma.transaction.create({
      data: {
        userId,
        type: 'credit_purchase',
        creditsGranted: credits,
        amountCents,
        status: 'pending',
      },
    });
  }

  async createStripeCheckout(transactionId: string, credits: number) {
  // Get transaction
  const transaction = await this.prisma.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!transaction) throw new Error('Transaction not found');

  // Amount in cents
  const amountCents = credits * 100;

  // Create Checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: `${credits} Credits` },
          unit_amount: amountCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.FRONTEND_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/billing/cancel`,
    metadata: { transactionId },
  });

  return session;
}

async completeCreditPurchase(transactionId: string, amountCents: number) {
  const transaction = await this.prisma.transaction.update({
    where: { id: transactionId },
    data: { status: 'completed', amountCents },
  });

  if (!transaction) throw new Error('Transaction not found');

  // Add credits to user
await this.prisma.user.update({
  where: { id: transaction.userId },
  data: { credits: { increment: transaction.creditsGranted ?? 0 } },
});


  return transaction;
}


}
