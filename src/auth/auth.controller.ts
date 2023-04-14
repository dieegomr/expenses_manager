import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginUseCase } from 'src/@core/usecases/login.use-case';
import { IsPublic } from './decorators/is-public.decorator';
import { LoginDto } from './dto/login.dto';
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
