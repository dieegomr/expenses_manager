import { BcryptPasswordHashing } from '../infra/bcrypt/bcrypt-password-hashing';
import { JwtTokenGenerator } from '../infra/JWT/jwt-token-generator';
import { UserInMemoryRepository } from '../infra/user-in-memory.repository';
import { CreateUserOutput, CreateUserUseCase } from './create-user.use-case';
import { LoginError } from './errors/login.error';
import { MissingParamError } from './errors/missing-param.error';
import { GetUserByEmailUseCase } from './get-user-by-email.use-case';
import { LoginOutput, LoginUseCase } from './login.use-case';

describe('Login UseCase', function () {
  const makeLoging = () => {
    const userRepository = new UserInMemoryRepository();
    const bcrypt = new BcryptPasswordHashing();
    const jwt = new JwtTokenGenerator();
    const getUserByEmail = new GetUserByEmailUseCase(userRepository);
    const createUserUseCase = new CreateUserUseCase(userRepository, bcrypt);
    const login = new LoginUseCase(getUserByEmail, bcrypt, jwt);
    return { login, bcrypt, jwt, getUserByEmail, createUserUseCase };
  };
  test('should return MissingParamError if no email is provided', async function () {
    const { login } = makeLoging();
    const accessToken = await login.execute();
    expect(accessToken.value).toBeInstanceOf(MissingParamError);
  });

  test('should return MissingParamError if no password is provided', async function () {
    const { login } = makeLoging();
    const accessToken = await login.execute('any_email@gmail.com');
    expect(accessToken.value).toBeInstanceOf(MissingParamError);
  });

  test('should return LoginError if wrong email is provided', async function () {
    const { login } = makeLoging();
    const output = await login.execute(
      'invalid_email@gmail.com',
      'any_password',
    );
    expect(output.value).toBeInstanceOf(LoginError);
  });

  test('should return LoginError if wrong password is provided', async function () {
    const { createUserUseCase, login, bcrypt } = makeLoging();

    const hasehdPassword = await bcrypt.hash('Test@12345');

    const newUser = await createUserUseCase.execute({
      name: 'Diego',
      email: 'dmendes.rocha@gmail.com',
      password: hasehdPassword,
    });

    const output = await login.execute('dmendes.rocha@gmail.com', 'Test@1234');
    expect(output.value).toBeInstanceOf(LoginError);
  });

  test('should return a valid Token if correct password and email are provided', async function () {
    const { bcrypt, createUserUseCase, login, jwt } = makeLoging();

    const newUserOrError = await createUserUseCase.execute({
      name: 'Diego',
      email: 'dmendes.rocha@gmail.com',
      password: 'Test@1234',
    });
    const newUser = newUserOrError.value as CreateUserOutput;

    const loginOutputOrError = await login.execute(
      'dmendes.rocha@gmail.com',
      'Test@1234',
    );
    const output = loginOutputOrError.value as LoginOutput;
    const { id } = await jwt.verify(output.token);

    expect(id).toBe(newUser.id);
  });
});
