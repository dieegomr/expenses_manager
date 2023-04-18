import { User } from '../domain/entities/user/user.entity';
import { BcryptPasswordHashing } from '../infra/bcrypt/bcrypt-password-hashing';
import { ExpenseInMemoryRepository } from '../infra/expense-in-memory.repository';
import { UserInMemoryRepository } from '../infra/user-in-memory.repository';
import { CreateExpenseUseCase } from './create-expense.use-case';
import { CreateUserOutput, CreateUserUseCase } from './create-user.use-case';
import { GetAllExpensesUseCase } from './get-all-expense.use-case';
import { GetUserByIdUseCase } from './get-user-by-id.use-case';
import { FakeEmailSender } from './test-utils/fake-email-sender';

describe('GetAllExpensesUseCase Tests', function () {
  it('should return all expenses from a specific user', async function () {
    const repository = new ExpenseInMemoryRepository();
    const userRepo = new UserInMemoryRepository();
    const getUserById = new GetUserByIdUseCase(userRepo);
    const passwordHasher = new BcryptPasswordHashing();
    const createUser = new CreateUserUseCase(userRepo, passwordHasher);
    const fakeEmailSender = new FakeEmailSender();
    const createExpenseUseCase = new CreateExpenseUseCase(
      repository,
      getUserById,
      fakeEmailSender,
    );
    const getAllExpensesUseCase = new GetAllExpensesUseCase(repository);

    const user1OrError = await createUser.execute({
      name: 'user1',
      email: 'user1@gmail.com',
      password: 'test',
    });
    const user2OrError = await createUser.execute({
      name: 'user2',
      email: 'user2@gmail.com',
      password: 'test',
    });

    const user1 = user1OrError.value as CreateUserOutput;
    const user2 = user2OrError.value as CreateUserOutput;

    await createExpenseUseCase.execute(
      {
        description: 'expense description 1',
        date: '2023-04-10',
        amount: 121,
      },
      user1.id,
    );

    await createExpenseUseCase.execute(
      {
        description: 'expense description 2',
        date: '2023-04-10',
        amount: 121,
      },
      user1.id,
    );

    await createExpenseUseCase.execute(
      {
        description: 'expense description 3',
        date: '2023-04-10',
        amount: 121,
      },
      user2.id,
    );

    const expenses = await getAllExpensesUseCase.execute(user1.id);

    expect(expenses).toHaveLength(2);
    expect(expenses[1].description).toBe('expense description 2');
  });
});
