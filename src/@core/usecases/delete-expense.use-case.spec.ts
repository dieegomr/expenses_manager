import { Expense } from '../domain/entities/expense/expense.entity';
import { ExpenseInMemoryRepository } from '../infra/expense-in-memory.repository';
import { CreateExpenseUseCase } from './create-expense.use-case';
import { DeleteExpenseByIdUseCase } from './delete-expense.use-case';
import { ExpenseNotFoundError } from './errors/get-expense-by-id.error';

describe('DeleteExpenseUseCase Tests', function () {
  it('should delete a expense', async function () {
    const repository = new ExpenseInMemoryRepository();
    const createUseCase = new CreateExpenseUseCase(repository);
    const deleteExpenseById = new DeleteExpenseByIdUseCase(repository);
    const expenseOrError = await createUseCase.execute({
      description: 'expense description',
      date: '2022-04-10',
      amount: 120,
      user: 'userID',
    });

    const expense = expenseOrError.value as Expense;

    const deletedOrError = await deleteExpenseById.execute(expense.id);

    expect(repository.items).toHaveLength(0);
  });

  it('should return an error if could not find a expense', async function () {
    const repository = new ExpenseInMemoryRepository();
    const deleteExpenseById = new DeleteExpenseByIdUseCase(repository);

    const deletedOrError = await deleteExpenseById.execute('wrongId');

    expect(deletedOrError.value).toBeInstanceOf(ExpenseNotFoundError);
  });
});
