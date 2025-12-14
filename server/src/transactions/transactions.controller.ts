import { Controller, Post, Body, UseGuards, Req,Headers } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCreditPurchaseDto } from './dto/create-credit-purchase.dto';
import { stripe } from 'lib/stripe';
import Stripe from 'stripe';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('credit-purchase')
  create(@Req() req, @Body() dto: CreateCreditPurchaseDto) {
    return this.transactionsService.createPendingCreditPurchase(
      req.user.id,
      dto.credits,
    );
  }

  @Post('credit-purchase/checkout')
@UseGuards(JwtAuthGuard)
async checkout(@Req() req, @Body() body: { transactionId: string, credits: number }) {
  return this.transactionsService.createStripeCheckout(body.transactionId, body.credits);
}

// Webhook
  @Post('webhook')
  async handleWebhook(@Req() req, @Headers('stripe-signature') signature: string) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
    } catch (err) {
      console.log('Webhook signature verification failed:', err.message);
      return { received: false };
    }

    // Handle checkout.session.completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const transactionId = session.metadata?.transactionId;
      if (!transactionId) {
  throw new Error('Transaction ID is missing in webhook metadata');
}
      const amountCents = session.amount_total || 0;

      await this.transactionsService.completeCreditPurchase(transactionId, amountCents);
    }

    return { received: true };
  }

}
