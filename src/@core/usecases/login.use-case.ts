import { PasswordHashing } from '../domain/interfaces/password-hashing.interface';
import { TokenGenerator } from '../domain/interfaces/token-generator.interface';
import { UserRepositoryInterface } from '../domain/repositories/user.repository';
import { Either, left, right } from '../shared/either';
import { LoginError } from './errors/login.error';
import { MissingParamError } from './errors/missing-param.error';

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly passwordHasher: PasswordHashing,
    private readonly tokenGenerator: TokenGenerator,
  ) {}
  async execute(
    email: string,
    password: string,
  ): Promise<Either<MissingParamError, LoginOutput>> {
    if (!email) return left(new MissingParamError('email'));
    if (!password) return left(new MissingParamError('password'));
    const user = await this.userRepository.findByEmail(email);
    if (!user) return left(new LoginError());

    const isValid = await this.passwordHasher.compare(
      password,
      user.props.password,
    );

    if (!isValid) return left(new LoginError());

    const token = await this.tokenGenerator.sign(user.id);

    return right({
      id: user.id,
      name: user.props.name,
      email: user.props.email,
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
