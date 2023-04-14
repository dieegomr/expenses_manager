import { PasswordHashing } from '../domain/interfaces/password-hashing.interface';
import { TokenGenerator } from '../domain/interfaces/token-generator.interface';
import { Either, left, right } from '../shared/either';
import { LoginError } from './errors/login.error';
import { MissingParamError } from './errors/missing-param.error';
import { GetUserByEmailUseCase } from './get-user-by-email.use-case';

export class LoginUseCase {
  constructor(
    private readonly getUserByEmail: GetUserByEmailUseCase,
    private readonly passwordHasher: PasswordHashing,
    private readonly tokenGenerator: TokenGenerator,
  ) {}
  async execute(
    email: string,
    password: string,
  ): Promise<Either<MissingParamError, LoginOutput>> {
    if (!email) return left(new MissingParamError('email'));
    if (!password) return left(new MissingParamError('password'));
    const user = await this.getUserByEmail.execute(email);
    if (user.isLeft()) return left(new LoginError());

    const isValid = await this.passwordHasher.compare(
      password,
      user.value.password,
    );

    if (!isValid) return left(new LoginError());

    const token = await this.tokenGenerator.sign(user.value.id);

    return right({
      id: user.value.id,
      name: user.value.name,
      email: user.value.email,
      token,
    });
  }
}

export type LoginOutput = {
  id: string;
  name: string;
  email: string;
  token: string;
};
