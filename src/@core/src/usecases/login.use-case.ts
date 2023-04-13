import { MissingParamError } from './errors/missing-param.error';

export class LoginUseCase {
  async execute(email) {
    if (!email) return new MissingParamError();
  }
}
