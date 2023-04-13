import { Expense } from '../domain/entities/expense/expense.entity';
import { ExpenseInMemoryRepository } from '../infra/expense-in-memory.repository';
import { CreateExpenseUseCase } from './create-expense.use-case';

describe('CreateExpenseUseCase Tests', function () {
  it('should create a new expense', async function () {
    const repository = new ExpenseInMemoryRepository();
    const createUseCase = new CreateExpenseUseCase(repository);
    const expense = await createUseCase.execute({
      description: 'expense description',
      date: '2022-04-10',
      amount: 120,
      user: 'userID',
    });

    const output = expense.value as Expense;

    expect(repository.items).toHaveLength(1);

    expect(typeof output.id).toBe('string');
    expect(output.description).toBe('expense description');
    expect(output.date).toBe('2022-04-10');
    expect(output.amount).toBe(120);
    expect(output.user).toBe('userID');
  });
});