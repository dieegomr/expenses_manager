import { Expense } from './expense.entity';
import {
  InvalidAmountError,
  InvalidDateError,
  InvalidDescriptionError,
} from './expense.errors';

describe('Expense Tests', () => {
  it('should create a expense with id', function () {
    const props = {
      description: 'some_description',
      date: '2022-3-10',
      amount: 100,
    };
    const userId = 'some_user_id';

    const expenseOrError = Expense.create(props, userId, 'some_expense_id');
    const expense = expenseOrError.value as Expense;

    expect(expense.userId).toBe('some_user_id');
    expect(expense.description).toBe('some_description');
    expect(expense.date).toBe('10/3/2022');
    expect(expense.amount).toBe(100);
    expect(expense.id).toBe('some_expense_id');
  });

  it('should update description', function () {
    const props = {
      description: 'some_description',
      date: '2023-03-10',
      amount: 100,
    };

    const userId = 'some_user_id';

    const expenseOrError = Expense.create(props, userId, 'some_expense_id');
    const expense = expenseOrError.value as Expense;

    expense.updateExpense({ description: 'updated_description' });

    expect(expense.description).toBe('updated_description');
  });

  it('should update date', function () {
    const props = {
      description: 'some_description',
      date: '2022-8-11',
      amount: 100,
    };

    const userId = 'some_user_id';

    const expenseOrError = Expense.create(props, userId, 'some_expense_id');
    const expense = expenseOrError.value as Expense;

    expense.updateExpense({ date: '2021-1-21' });

    expect(expense.date).toBe('21/1/2021');
  });

  it('should update amount', function () {
    const props = {
      description: 'some_description',
      date: '2020-10-15',
      amount: 100,
    };

    const userId = 'some_user_id';

    const expenseOrError = Expense.create(props, userId, 'some_expense_id');
    const expense = expenseOrError.value as Expense;

    expense.updateExpense({ amount: 120 });

    expect(expense.amount).toBe(120);
  });

  it('should allow to create expense only with positive value amount', function () {
    const props = {
      description: 'some_description',
      date: '2020-10-15',
      amount: -100,
    };

    const userId = 'some_user_id';

    const expenseWithId = Expense.create(props, userId, 'some_id');

    expect(expenseWithId.value).toBeInstanceOf(InvalidAmountError);
  });

  it('should allow to create expense only with date before the current one', function () {
    const props = {
      description: 'some_description',
      date: '2024-04-11',
      amount: 100,
    };

    const userId = 'some_user_id';

    const expense = Expense.create(props, userId, 'some_id');

    expect(expense.value).toBeInstanceOf(InvalidDateError);
  });

  it('should not allow to create an expense description longer then 191 characters', function () {
    const STRING_192_CHARACTERS =
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus..';
    const props = {
      description: STRING_192_CHARACTERS,
      date: '2022-09-12',
      user: 'some_user_id',
      amount: 100,
    };

    const userId = 'some_user_id';

    const expenseWithId = Expense.create(props, userId, 'some_id');

    expect(expenseWithId.value).toBeInstanceOf(InvalidDescriptionError);
  });
});
