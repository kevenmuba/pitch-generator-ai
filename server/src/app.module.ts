import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TemplatesModule } from './templates/templates.module';
import { UserLessonsModule } from './user-lessons/user-lessons.module';
import { PitchesModule } from './pitches/pitches.module';
@Module({
  imports: [PrismaModule, UsersModule, AuthModule, TransactionsModule, TemplatesModule,UserLessonsModule, PitchesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
