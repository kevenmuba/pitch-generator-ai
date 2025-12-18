import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

 async createUser(
  email: string,
  password: string,
  name?: string,
  role: string = 'user' // default role is user
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return this.prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      name,
      credits: 0,
      trialCredits: 5,
      role, 
    },
  });
}


  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  updateProfile(id: string, data: { name?: string; email?: string }) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async getUserCredits(userId: string) {
  return this.prisma.user.findUnique({
    where: { id: userId },
    select: {
      credits: true,
      trialCredits: true,
      isUnlimited: true,
    },
  });
}



}
