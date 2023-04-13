import { User, UserProps } from '../domain/entities/user/user.entity';
import { BcryptPasswordHashing } from '../infra/bcrypt/bcrypt-password-hashing';
import { UserInMemoryRepository } from '../infra/user-in-memory.repository';
import { CreateUserOutput, CreateUserUseCase } from './create-user.use-case';
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
    class PasswordHashingSpy {
      password;
      hashedPassowrd;
      async compare(password, hashedPassword) {
        this.password = password;
        this.hashedPassowrd = hashedPassword;
      }
      async hash() {}
    }
    const userRepo = new UserInMemoryRepository();
    const createUser = new CreateUserUseCase(userRepo);
    const user = await createUser.execute({
      name: 'Diego',
      email: 'diego@gmail.com',
      password: 'hashedtest1234',
    });

    const passwordHashingSpy = new PasswordHashingSpy();

    const login = new LoginUseCase(userRepo, passwordHashingSpy);
    await login.execute('diego@gmail.com', 'test1234');
    expect(passwordHashingSpy.password).toBe('test1234');
    expect(passwordHashingSpy.hashedPassowrd).toBe('hashedtest1234');
  });
});
