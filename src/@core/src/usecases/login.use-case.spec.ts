import { MissingParamError } from './errors/missing-param.error';
import { LoginUseCase } from './login.use-case';

describe('Login UseCase', function () {
  test('should return null if no email is provided', async function () {
    const login = new LoginUseCase();
    const accessToken = await login.execute();
    expect(accessToken).toBeInstanceOf(MissingParamError);
  });
});
