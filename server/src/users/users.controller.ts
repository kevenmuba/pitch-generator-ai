import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req) {
    // use userId from JwtStrategy.validate
    const user = await this.usersService.findById(req.user.id);
    if (!user) {
      return { message: 'User not found' };
    }
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateProfile(@Req() req, @Body() data: { name?: string; email?: string }) {
    const updated = await this.usersService.updateProfile(req.user.id, data);
    const { passwordHash, ...safeUser } = updated;
    return safeUser;
  }


  @UseGuards(JwtAuthGuard)
@Get('credits')
async getCredits(@Req() req) {
  const data = await this.usersService.getUserCredits(req.user.id);

  if (!data) {
    return { message: 'User not found' };
  }

  return {
    credits: data.credits ?? 0,
    trialCredits: data.trialCredits ?? 0,
    totalCredits: (data.credits ?? 0) + (data.trialCredits ?? 0),
    isUnlimited: data.isUnlimited,
  };
}




}

