import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Headers,
  Get,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCreditPurchaseDto } from './dto/create-credit-purchase.dto';
import { stripe } from 'lib/stripe';
import Stripe from 'stripe';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  /**
   * 1️⃣ Create pending credit purchase
   * POST /transactions/credit-purchase
   */
  @UseGuards(JwtAuthGuard)
  @Post('credit-purchase')
  create(@Req() req, @Body() dto: CreateCreditPurchaseDto) {
    return this.transactionsService.createPendingCreditPurchase(
      req.user.id,
      dto.credits,
    );
  }

  /**
   * 2️⃣ Create Stripe Checkout session
   * POST /transactions/credit-purchase/checkout
   */
  @UseGuards(JwtAuthGuard)
  @Post('credit-purchase/checkout')
  checkout(@Body() body: { transactionId: string }) {
    return this.transactionsService.createStripeCheckout(body.transactionId);
  }

  /**
   * 3️⃣ Get logged-in user's transactions
   * GET /transactions
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  getMyTransactions(@Req() req) {
    return this.transactionsService.getUserTransactions(req.user.id);
  }

  /**
   * 4️⃣ Stripe Webhook
   * POST /transactions/webhook
   * (NO AUTH GUARD)
   */
  @Post('webhook')
  async handleWebhook(
    @Req() req,
    @Headers('stripe-signature') signature: string,
  ) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret,
      );
    } catch (err: any) {
      console.log('❌ Webhook signature verification failed:', err.message);
      return { received: false };
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const transactionId = session.metadata?.transactionId;

      if (!transactionId) {
        throw new Error('Transaction ID missing in webhook metadata');
      }

      const amountCents = session.amount_total || 0;

      await this.transactionsService.completeCreditPurchase(
        transactionId,
        amountCents,
      );
    }

    return { received: true };
  }
}
