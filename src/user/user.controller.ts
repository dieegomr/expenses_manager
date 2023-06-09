import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from '../@core/usecases/create-user.use-case';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @IsPublic()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const output = await this.createUserUseCase.execute(createUserDto);
    if (output.isLeft())
      throw new HttpException(output.value.message, HttpStatus.BAD_REQUEST);

    return { ...output.value, password: undefined };
  }
}
