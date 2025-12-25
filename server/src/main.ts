import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // 🔥 IMPORTANT
  });

  // app.enableCors({
  //   origin: process.env.FRONTEND_URL,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true,
  // });

  app.enableCors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://pitch-generator-ai.vercel.app',
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});


  // Stripe webhook MUST be raw
  app.use(
    '/transactions/webhook',
    bodyParser.raw({ type: 'application/json' }),
  );

  // Normal JSON for all other routes
  app.use(bodyParser.json());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
