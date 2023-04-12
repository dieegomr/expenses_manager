import { Expense } from '../domain/entities/expense/expense.entity';
import { InvalidAmountError } from '../domain/entities/expense/expense.errors';
import { ExpenseInMemoryRepository } from '../infra/expense-in-memory.repository';
import { CreateExpenseUseCase } from './create-expense.use-case';
import { EditExpenseUseCase } from './edit-expense.use-case';

describe('EditExpenseUseCase Tests', function () {
  it('should edit a expense', async function () {
    const repository = new ExpenseInMemoryRepository();
    const createUseCase = new CreateExpenseUseCase(repository);
    const editExpenseUseCase = new EditExpenseUseCase(repository);

    const expenseOrError = await createUseCase.execute({
      description: 'expense description',
      date: '2022-04-10',
      amount: 120,
      user: 'userID',
    });

    const expense = expenseOrError.value as Expense;

    const editedExpenseOrError = await editExpenseUseCase.execute(expense.id, {
      description: 'new expense description',
    });

    const editedExpense = editedExpenseOrError.value as Expense;

    expect(editedExpense.description).toBe('new expense description');
  });

  it('should return a error if a invalid parameter is passed', async function () {
    const repository = new ExpenseInMemoryRepository();
    const createUseCase = new CreateExpenseUseCase(repository);
    const editExpenseUseCase = new EditExpenseUseCase(repository);

    const expenseOrError = await createUseCase.execute({
      description: 'expense description',
      date: '2022-04-10',
      amount: 120,
      user: 'userID',
    });

    const expense = expenseOrError.value as Expense;

    const editedExpenseOrError = await editExpenseUseCase.execute(expense.id, {
      amount: -10,
    });
    console.log(editedExpenseOrError.value);

    expect(editedExpenseOrError.value).toBeInstanceOf(InvalidAmountError);
  });
});
