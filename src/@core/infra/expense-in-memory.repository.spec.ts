import { Expense } from '../domain/entities/expense/expense.entity';
import { ExpenseInMemoryRepository } from './expense-in-memory.repository';

describe('ExpenseInMemoryRepository Test', function () {
  it('should insert a new expense', async function () {
    const repository = new ExpenseInMemoryRepository();

    const props = {
      description: 'some_description',
      date: '2023-04-10',
      amount: 100,
    };

    const userId = 'some_user_id';

    const expenseOrError = Expense.create(props, userId, 'some_expense_id');
    const expense = expenseOrError.value as Expense;

    await repository.insert(expense);

    expect(repository.items).toHaveLength(1);
    expect(repository.items).toStrictEqual([expense]);
  });
});
