import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginUseCase } from 'src/@core/usecases/login.use-case';
import { IsPublic } from './decorators/is-public.decorator';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @IsPublic()
  @Post()
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    const outputOrError = await this.loginUseCase.execute(email, password);
    if (outputOrError.isLeft())
      throw new HttpException(
        outputOrError.value.message,
        HttpStatus.BAD_REQUEST,
      );
    return outputOrError.value;
  }
}
