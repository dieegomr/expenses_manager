import { ExpenseInMemoryRepository } from '../infra/expense-in-memory.repository';
import { UserInMemoryRepository } from '../infra/user-in-memory.repository';
import { CreateExpenseUseCase } from './create-expense.use-case';
import { DeleteExpenseByIdUseCase } from './delete-expense.use-case';
import { ExpenseNotFoundError } from './errors/get-expense-by-id.error';
import { ExpenseOutput } from './get-expense-by-id.use-case';
import { GetUserByIdUseCase } from './get-user-by-id.use-case';
import { FakeEmailSender } from './test-utils/fake-email-sender';

describe('DeleteExpenseUseCase Tests', function () {
  const makeTest = () => {
    const expenseRepo = new ExpenseInMemoryRepository();
    const userRepo = new UserInMemoryRepository();
    const getUserById = new GetUserByIdUseCase(userRepo);
    const fakeEmailSender = new FakeEmailSender();
    const createExpenseUseCase = new CreateExpenseUseCase(
      expenseRepo,
      getUserById,
      fakeEmailSender,
    );
    const deleteExpenseById = new DeleteExpenseByIdUseCase(expenseRepo);

    return { createExpenseUseCase, deleteExpenseById, expenseRepo };
  };
  it('should be able to delete an expense if belongs to the current user', async function () {
    const { createExpenseUseCase, deleteExpenseById, expenseRepo } = makeTest();
    const expenseOrError = await createExpenseUseCase.execute(
      {
        description: 'expense1',
        date: '2022-04-10',
        amount: 120,
      },
      'userId1',
    );

    const expense = expenseOrError.value as ExpenseOutput;

    await deleteExpenseById.execute('userId1', expense.id);

    expect(expenseRepo.items).toHaveLength(0);
  });

  it('should return an error if could not find a expense', async function () {
    const { createExpenseUseCase, deleteExpenseById } = makeTest();
    await createExpenseUseCase.execute(
      {
        description: 'expense1',
        date: '2022-04-10',
        amount: 120,
      },
      'userId1',
    );

    const deletedOrError = await deleteExpenseById.execute(
      'userId1',
      'wrongId',
    );

    expect(deletedOrError.value).toBeInstanceOf(ExpenseNotFoundError);
  });

  it('should return an error if user does not belong to the expense', async function () {
    const { createExpenseUseCase, deleteExpenseById } = makeTest();

    const expenseOrError = await createExpenseUseCase.execute(
      {
        description: 'expense1',
        date: '2022-04-10',
        amount: 120,
      },
      'userId1',
    );
    const expense = expenseOrError.value as ExpenseOutput;

    const deletedOrError = await deleteExpenseById.execute(
      'userId2',
      expense.id,
    );

    expect(deletedOrError.value).toBeInstanceOf(ExpenseNotFoundError);
  });
});
