import { BcryptPasswordHashing } from '../infra/bcrypt/bcrypt-password-hashing';
import { UserInMemoryRepository } from '../infra/user-in-memory.repository';
import { CreateUserOutput, CreateUserUseCase } from './create-user.use-case';

describe('CreateUserUseCase Tests', function () {
  const makeTest = () => {
    const repository = new UserInMemoryRepository();
    const passwordHashing = new BcryptPasswordHashing();
    const createUserUseCase = new CreateUserUseCase(
      repository,
      passwordHashing,
    );

    return { createUserUseCase, repository, passwordHashing };
  };
  it('should return an error if invalid email is provided', async function () {
    const { createUserUseCase } = makeTest();
    const userOrError = await createUserUseCase.execute({
      name: 'some_name',
      email: 'some_email.com',
      password: 'some_password',
    });
    const error = userOrError.value as Error;

    expect(error.message).toStrictEqual('The email some_email.com is invalid');
  });
  it('should create a new user', async function () {
    const { createUserUseCase, repository, passwordHashing } = makeTest();
    const userOrError = await createUserUseCase.execute({
      name: 'some_name',
      email: 'some_email@gmail.com',
      password: 'some_password',
    });
    const output = userOrError.value as CreateUserOutput;

    expect(repository.items).toHaveLength(1);
    expect(output.name).toBe('some_name');
    expect(output.id).toHaveLength(36);
    expect(
      await passwordHashing.compare('some_password', output.password),
    ).toBe(true);
    expect(output.email).toBe('some_email@gmail.com');
  });
});
