import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module'; // ✅ import PrismaModule here

@Module({
  imports: [PrismaModule], 
  providers: [UsersService],
  controllers: [UsersController],
   exports: [UsersService],
})
export class UsersModule {}
