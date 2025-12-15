import { Module } from '@nestjs/common';
import { UserLessonsService } from './user-lessons.service';
import { UserLessonsController } from './user-lessons.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UserLessonsController],
  providers: [UserLessonsService, PrismaService],
})
export class UserLessonsModule {}
