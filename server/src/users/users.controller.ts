import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // ✅ correct path

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req) {
    
    return this.usersService.findById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateProfile(@Req() req, @Body() data: { name?: string; email?: string }) {
    return this.usersService.updateProfile(req.user.userId, data);
  }
}
