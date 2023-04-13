import { UserRepositoryInterface } from '../domain/repositories/user.repository';
import { MissingParamError } from './errors/missing-param.error';

export class LoginUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}
  async execute(email, password) {
    if (!email) return new MissingParamError('email');
    if (!password) return new MissingParamError('password');
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;
  }
}
