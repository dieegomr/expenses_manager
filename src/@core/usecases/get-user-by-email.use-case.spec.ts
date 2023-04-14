import { BcryptPasswordHashing } from '../infra/bcrypt/bcrypt-password-hashing';
import { UserInMemoryRepository } from '../infra/user-in-memory.repository';
import { CreateUserOutput, CreateUserUseCase } from './create-user.use-case';
import { UserNotFoundError } from './errors/user-not-found.error';
import {
  GetUserByEmailUseCase,
  UserOutput,
} from './get-user-by-email.use-case';

describe('GetExpenseByIdUseCase Tests', function () {
  const userRepo = new UserInMemoryRepository();
  const passwordHasher = new BcryptPasswordHashing();
  const createUser = new CreateUserUseCase(userRepo, passwordHasher);
  const getUser = new GetUserByEmailUseCase(userRepo);

  let user: CreateUserOutput;

  beforeEach(async function () {
    const output = await createUser.execute({
      email: 'dmendes.rocha@gmail.com',
      name: 'Diego',
      password: 'Test1234',
    });

    user = output.value as CreateUserOutput;
  });

  it('should return an error if could not find an user', async function () {
    const foundUser = await getUser.execute('wrongEmail');

    expect(foundUser.value).toBeInstanceOf(UserNotFoundError);
  });

  it('should return an user if searched by a existent email', async function () {
    const result = await getUser.execute(user.email);

    const foundExpense = result.value as UserOutput;

    expect(foundExpense.name).toBe('Diego');
  });
});
