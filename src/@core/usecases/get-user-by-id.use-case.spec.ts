import { BcryptPasswordHashing } from '../infra/bcrypt/bcrypt-password-hashing';
import { UserInMemoryRepository } from '../infra/user-in-memory.repository';
import { CreateUserOutput, CreateUserUseCase } from './create-user.use-case';
import { UserNotFoundError } from './errors/user-not-found.error';
import { UserOutput } from './get-user-by-email.use-case';
import { GetUserByIdUseCase } from './get-user-by-id.use-case';

describe('GetExpenseByIdUseCase Tests', function () {
  const userRepo = new UserInMemoryRepository();
  const passwordHasher = new BcryptPasswordHashing();
  const createUser = new CreateUserUseCase(userRepo, passwordHasher);
  const getUser = new GetUserByIdUseCase(userRepo);

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
    const foundUser = await getUser.execute('wrongId');

    expect(foundUser.value).toBeInstanceOf(UserNotFoundError);
  });

  it('should return an user if searched by a existent id', async function () {
    const result = await getUser.execute(user.id);

    const foundExpense = result.value as UserOutput;

    expect(foundExpense.name).toBe('Diego');
  });
});
