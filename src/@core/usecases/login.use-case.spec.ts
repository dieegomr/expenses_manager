import { BcryptPasswordHashing } from '../infra/bcrypt/bcrypt-password-hashing';
import { JwtTokenGenerator } from '../infra/JWT/jwt-token-generator';
import { UserInMemoryRepository } from '../infra/user-in-memory.repository';
import { CreateUserOutput, CreateUserUseCase } from './create-user.use-case';
import { LoginError } from './errors/login.error';
import { MissingParamError } from './errors/missing-param.error';
import { LoginOutput, LoginUseCase } from './login.use-case';

describe('Login UseCase', function () {
  test('should return MissingParamError if no email is provided', async function () {
    const login = new LoginUseCase();
    const accessToken = await login.execute();
    expect(accessToken.value).toBeInstanceOf(MissingParamError);
  });

  test('should return MissingParamError if no password is provided', async function () {
    const login = new LoginUseCase();
    const accessToken = await login.execute('any_email@gmail.com');
    expect(accessToken.value).toBeInstanceOf(MissingParamError);
  });

  test('should return LoginError if wrong email is provided', async function () {
    const userRepository = new UserInMemoryRepository();
    const login = new LoginUseCase(userRepository);
    const output = await login.execute(
      'invalid_email@gmail.com',
      'any_password',
    );
    expect(output.value).toBeInstanceOf(LoginError);
  });

  test('should return LoginError if wrong password is provided', async function () {
    const userRepository = new UserInMemoryRepository();
    const createUser = new CreateUserUseCase(userRepository);
    const passwordHashing = new BcryptPasswordHashing();
    const tokenGenerator = new JwtTokenGenerator();

    const hasehdPassword = await passwordHashing.hash('Test@12345');

    const newUser = await createUser.execute({
      name: 'Diego',
      email: 'dmendes.rocha@gmail.com',
      password: hasehdPassword,
    });

    const login = new LoginUseCase(
      userRepository,
      passwordHashing,
      tokenGenerator,
    );
    const output = await login.execute('dmendes.rocha@gmail.com', 'Test@1234');
    expect(output.value).toBeInstanceOf(LoginError);
  });

  test('should return a valid Token if correct password and email are provided', async function () {
    const userRepository = new UserInMemoryRepository();
    const createUser = new CreateUserUseCase(userRepository);
    const passwordHashing = new BcryptPasswordHashing();
    const tokenGenerator = new JwtTokenGenerator();

    const hasehdPassword = await passwordHashing.hash('Test@1234');

    const newUserOrError = await createUser.execute({
      name: 'Diego',
      email: 'dmendes.rocha@gmail.com',
      password: hasehdPassword,
    });
    const newUser = newUserOrError.value as CreateUserOutput;

    const login = new LoginUseCase(
      userRepository,
      passwordHashing,
      tokenGenerator,
    );

    const loginOutputOrError = await login.execute(
      'dmendes.rocha@gmail.com',
      'Test@1234',
    );
    const output = loginOutputOrError.value as LoginOutput;
    const { id } = await tokenGenerator.verify(output.token);

    expect(id).toBe(newUser.id);
  });
});
