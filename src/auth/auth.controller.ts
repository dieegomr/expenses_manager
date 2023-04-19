import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginUseCase } from '../@core/usecases/login.use-case';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/auth-request';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @IsPublic()
  @Post()
  @UseGuards(LocalAuthGuard)
  login(@Request() req: AuthRequest) {
    return req.user;
  }
}
