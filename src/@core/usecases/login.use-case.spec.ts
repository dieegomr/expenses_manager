import { BcryptPasswordHashing } from '../infra/bcrypt/bcrypt-password-hashing';
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

  test('should return null if invalid email is provided', async function () {
    const userRepository = new UserInMemoryRepository();
    const login = new LoginUseCase(userRepository);
    const token = await login.execute(
      'invalid_email@gmail.com',
      'any_password',
    );
    expect(token).toBeNull();
  });

  test('should call password hashing with a correct password', async function () {
    const passwordHashingSpy = jest.spyOn(
      BcryptPasswordHashing.prototype,
      'compare',
    );
    const userRepository = new UserInMemoryRepository();
    const passwordHasher = new BcryptPasswordHashing();
    const login = new LoginUseCase(userRepository, passwordHasher);
    await login.execute('any_email@gmail.com', 'any_password');
    expect(passwordHashingSpy).toHaveBeenCalledWith(
      'any_password',
      'user_password',
    );
  });
});
