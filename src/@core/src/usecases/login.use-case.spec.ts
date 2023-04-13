import { MissingParamError } from './errors/missing-param.error';
import { LoginUseCase } from './login.use-case';

describe('Login UseCase', function () {
  test('should return MissingParamError if no email is provided', async function () {
    const login = new LoginUseCase();
    const accessToken = await login.execute();
    expect(accessToken).toBeInstanceOf(MissingParamError);
  });

  test('should return MissingParamError if no password is provided', async function () {
    const login = new LoginUseCase();
    const accessToken = await login.execute('any_email@gmail.com');
    expect(accessToken).toBeInstanceOf(MissingParamError);
  });
});
