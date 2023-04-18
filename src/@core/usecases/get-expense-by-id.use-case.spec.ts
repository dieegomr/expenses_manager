import { User } from '../domain/entities/user/user.entity';

import { ExpenseInMemoryRepository } from '../infra/expense-in-memory.repository';
import { UserInMemoryRepository } from '../infra/user-in-memory.repository';
import { CreateExpenseUseCase } from './create-expense.use-case';
import { ExpenseNotFoundError } from './errors/get-expense-by-id.error';
import {
  ExpenseOutput,
  GetExpenseByIdUseCase,
} from './get-expense-by-id.use-case';
import { GetUserByIdUseCase } from './get-user-by-id.use-case';
import { FakeEmailSender } from './test-utils/fake-email-sender';

describe('GetExpenseByIdUseCase Tests', function () {
  const makeTest = () => {
    const fakeEmailSender = new FakeEmailSender();
    const expenseRepo = new ExpenseInMemoryRepository();
    const userRepo = new UserInMemoryRepository();
    const getUserById = new GetUserByIdUseCase(userRepo);
    const createExpense = new CreateExpenseUseCase(
      expenseRepo,
      getUserById,
      fakeEmailSender,
    );
    const getExpense = new GetExpenseByIdUseCase(expenseRepo);

    return { getExpense, createExpense, userRepo };
  };

  it('should return an error if could not find an expense because wrong user id', async function () {
    const { getExpense, createExpense } = makeTest();

    const expenseOrError = await createExpense.execute(
      {
        description: 'description1',
        date: '2023-04-10',
        amount: 121,
      },
      'userId1',
    );
    const expense = expenseOrError.value as ExpenseOutput;

    const foundExpense = await getExpense.execute('userId2', expense.id);

    expect(foundExpense.value).toBeInstanceOf(ExpenseNotFoundError);
  });

  it('should return an error if could not find an expense because wrong expense id', async function () {
    const { getExpense, createExpense } = makeTest();

    await createExpense.execute(
      {
        description: 'description1',
        date: '2023-04-10',
        amount: 121,
      },
      'userId1',
    );

    const foundExpense = await getExpense.execute('userId1', 'wrongExpenseId');

    expect(foundExpense.value).toBeInstanceOf(ExpenseNotFoundError);
  });

  it('should return an expense if searched by a existent id', async function () {
    const { getExpense, createExpense, userRepo } = makeTest();

    const userOrErro = User.create(
      {
        email: 'diego@gmail.com',
        name: 'Diego',
        password: 'Test@1234',
      },
      'userId',
    );
    const user = userOrErro.value as User;

    await userRepo.save(user);

    const expenseOrError = await createExpense.execute(
      {
        description: 'description1',
        date: '2023-04-10',
        amount: 121,
      },
      'userId',
    );
    const expense = expenseOrError.value as ExpenseOutput;

    const result = await getExpense.execute('userId', expense.id);

    const foundExpense = result.value as ExpenseOutput;

    expect(foundExpense.description).toBe('description1');
  });
});
