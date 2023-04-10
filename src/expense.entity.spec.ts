import { Expense } from './expense.entity';

describe('Expense Tests', () => {
  it('should create a expense with id', function () {
    const props = {
      description: 'some_description',
      date: new Date(),
      user: 'some_user_id',
      value: 100,
    };
    const expense = new Expense(props, 'some_expense_id');

    expect(expense.user).toBe('some_user_id');
    expect(expense.description).toBe('some_description');
    expect(expense.date).toBeInstanceOf(Date);
    expect(expense.value).toBe(100);
    expect(expense.id).toBe('some_expense_id');
  });

  it('should create a expense without id', function () {
    const props = {
      description: 'some_description',
      date: new Date(),
      user: 'some_user_id',
      value: 100,
    };
    const expenseNoId = new Expense(props);

    expect(expenseNoId.user).toBe('some_user_id');
    expect(expenseNoId.description).toBe('some_description');
    expect(expenseNoId.date).toBeInstanceOf(Date);
    expect(expenseNoId.value).toBe(100);
  });
});
