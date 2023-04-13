import { UserInMemoryRepository } from '../infra/user-in-memory.repository';
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

  test('should call load user by email repository when an email is provided', async function () {
    const loadUserByEmailSpy = jest.spyOn(
      UserInMemoryRepository.prototype,
      'findByEmail',
    );
    const userRepository = new UserInMemoryRepository();
    const login = new LoginUseCase(userRepository);
    await login.execute('any_email@gmail.com', 'any_password');
    expect(loadUserByEmailSpy).toHaveBeenCalledWith('any_email@gmail.com');
  });
});
