import { ExpenseInMemoryRepository } from '../infra/expense-in-memory.repository';
import { CreateExpenseUseCase } from './create-expense.use-case';
import { DeleteExpenseByIdUseCase } from './delete-expense.use-case';
import { ExpenseNotFoundError } from './errors/get-expense-by-id.error';
import { ExpenseOutput } from './get-expense-by-id.use-case';

describe('DeleteExpenseUseCase Tests', function () {
  const makeTest = () => {
    const repository = new ExpenseInMemoryRepository();
    const createExpenseUseCase = new CreateExpenseUseCase(repository);
    const deleteExpenseById = new DeleteExpenseByIdUseCase(repository);
    return { createExpenseUseCase, deleteExpenseById, repository };
  };
  it('should be able to delete an expense if belongs to the current user', async function () {
    const { createExpenseUseCase, deleteExpenseById, repository } = makeTest();
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
      'userId1',
      expense.id,
    );

    expect(repository.items).toHaveLength(0);
  });

  it('should return an error if could not find a expense', async function () {
    const { createExpenseUseCase, deleteExpenseById, repository } = makeTest();
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
    const { createExpenseUseCase, deleteExpenseById, repository } = makeTest();
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
