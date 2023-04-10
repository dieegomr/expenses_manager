import { Expense } from './expense.entity';

describe('Expense Tests', () => {
  it('should create a expense with id', function () {
    const props = {
      desription: 'some_description',
      date: new Date(),
      user: 'some_user_id',
      value: 100,
    };
    const expense = new Expense(props, 'some_expense_id');

    expect(expense.props.user).toBe('some_user_id');
    expect(expense.props.desription).toBe('some_description');
    expect(expense.props.date).toBeInstanceOf(Date);
    expect(expense.props.value).toBe(100);
    expect(expense.id).toBe('some_expense_id');
  });

  it('should create a expense without id', function () {
    const props = {
      desription: 'some_description',
      date: new Date(),
      user: 'some_user_id',
      value: 100,
    };
    const expense = new Expense(props);

    expect(expense.props.user).toBe('some_user_id');
    expect(expense.props.desription).toBe('some_description');
    expect(expense.props.date).toBeInstanceOf(Date);
    expect(expense.props.value).toBe(100);
  });
});
