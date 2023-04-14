import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginUseCase } from 'src/@core/usecases/login.use-case';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private loginUseCase: LoginUseCase) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const userOrError = await this.loginUseCase.execute(email, password);
    if (userOrError.isLeft()) throw new Error(userOrError.value.message);
    userOrError.value;

    return userOrError.value;
  }
}
