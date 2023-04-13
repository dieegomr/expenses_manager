import { UserRepositoryInterface } from '../domain/repositories/user.repository';
import { MissingParamError } from './errors/missing-param.error';

export class LoginUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}
  async execute(email, password) {
    if (!email) return new MissingParamError('email');
    if (!password) return new MissingParamError('password');
    await this.userRepository.findByEmail(email);
  }
}
