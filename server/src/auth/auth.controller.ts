import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

 @Post('register')
register(
  @Body() body: { email: string; password: string; name?: string; role?: string }
) {
  return this.authService.register(body.email, body.password, body.name, body.role);
}


  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
  const user = await this.authService.validateUser(body.email, body.password);

  if (!user) {
    return { message: 'Invalid email or password' };
  }

  return this.authService.login(user);
}

}
