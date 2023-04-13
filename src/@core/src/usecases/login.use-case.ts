import { MissingParamError } from './errors/missing-param.error';

export class LoginUseCase {
  async execute(email, password) {
    if (!email) return new MissingParamError('email');
    if (!password) return new MissingParamError('password');
  }
}
