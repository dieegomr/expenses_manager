import { Expense } from '../domain/entities/expense/expense.entity';
import { ExpenseInMemoryRepository } from './expense-in-memory.repository';

describe('ExpenseInMemoryRepository Test', function () {
  it('should insert a new expense', async function () {
    const repository = new ExpenseInMemoryRepository();

    const props = {
      description: 'some_description',
      date: new Date(2023, 3, 10),
      user: 'some_user_id',
      amount: 100,
    };

    const expenseOrError = Expense.createWithId(props, 'some_expense_id');
    const expense = expenseOrError.value as Expense;

    await repository.insert(expense);

    expect(repository.items).toHaveLength(1);
    expect(repository.items).toStrictEqual([expense]);
  });
});
