import { Expense } from '../domain/entities/expense/expense.entity';
import { ExpenseInMemoryRepository } from '../infra/expense-in-memory.repository';
import { CreateExpenseUseCase } from './create-expense.use-case';
import { ExpenseNotFoundError } from './errors/get-expense-by-id.error';
import { GetExpenseByIdUseCase } from './get-expense-by-id.use-case';

describe('GetExpenseByIdUseCase Tests', function () {
  const expenseRepo = new ExpenseInMemoryRepository();
  const createExpense = new CreateExpenseUseCase(expenseRepo);
  const getExpense = new GetExpenseByIdUseCase(expenseRepo);

  let expense: Expense;

  beforeEach(async function () {
    const output = await createExpense.execute({
      description: 'description1',
      date: new Date(2023, 3, 10),
      user: 'userId1',
      amount: 121,
    });

    expense = output.value as Expense;
  });

  it('should return an error if could not find an expense', async function () {
    const foundExpense = await getExpense.execute('wrongId');

    expect(foundExpense.value).toBeInstanceOf(ExpenseNotFoundError);
  });

  it('should return an expense if searched by a existent id', async function () {
    const result = await getExpense.execute(expense.id);

    const foundExpense = result.value as Expense;

    expect(foundExpense.description).toBe('description1');
  });
});
