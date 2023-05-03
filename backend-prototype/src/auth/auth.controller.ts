import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './localAuth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }
}
