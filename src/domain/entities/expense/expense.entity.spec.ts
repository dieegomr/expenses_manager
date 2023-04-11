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
      date: new Date(2023, 3, 10),
      user: 'some_user_id',
      amount: 100,
    };

    const expenseOrError = Expense.createWithId(props, 'some_expense_id');
    expect(expenseOrError.isRight()).toBe(true);
    const expense = expenseOrError.value as Expense;

    expect(expense.user).toBe('some_user_id');
    expect(expense.description).toBe('some_description');
    expect(expense.date).toBeInstanceOf(Date);
    expect(expense.amount).toBe(100);
    expect(expense.id).toBe('some_expense_id');
  });

  // it('should create a expense without id', function () {
  //   const props = {
  //     description: 'some_description',
  //     date: new Date(2023, 3, 10),
  //     user: 'some_user_id',
  //     amount: 100,
  //   };

  //   const expenseOrError = Expense.createWithoutId(props);
  //   expect(expenseOrError.isRight()).toBe(true);
  //   const expenseNoId = expenseOrError.value as Expense;

  //   expect(expenseNoId.user).toBe('some_user_id');
  //   expect(expenseNoId.description).toBe('some_description');
  //   expect(expenseNoId.date).toBeInstanceOf(Date);
  //   expect(expenseNoId.amount).toBe(100);
  // });

  it('should update description', function () {
    const props = {
      description: 'some_description',
      date: new Date(2023, 3, 10),
      user: 'some_user_id',
      amount: 100,
    };

    const expenseOrError = Expense.createWithId(props, 'some_expense_id');
    expect(expenseOrError.isRight()).toBe(true);
    const expense = expenseOrError.value as Expense;

    expense.updateDescription('updated_description');

    expect(expense.description).toBe('updated_description');
  });

  it('should update date', function () {
    const props = {
      description: 'some_description',
      date: new Date(2020, 9, 15),
      user: 'some_user_id',
      amount: 100,
    };

    const expenseOrError = Expense.createWithId(props, 'some_expense_id');
    expect(expenseOrError.isRight()).toBe(true);
    const expense = expenseOrError.value as Expense;

    const newDate = { day: 21, month: 1, year: 2021 };

    expense.updateDate(newDate);

    expect(expense.date.getDate()).toBe(21);
    expect(expense.date.getMonth()).toBe(0);
    expect(expense.date.getFullYear()).toBe(2021);
  });

  it('should update amount', function () {
    const props = {
      description: 'some_description',
      date: new Date(2020, 9, 15),
      user: 'some_user_id',
      amount: 100,
    };

    const expenseOrError = Expense.createWithId(props, 'some_expense_id');
    expect(expenseOrError.isRight()).toBe(true);
    const expense = expenseOrError.value as Expense;

    expense.updateAmount(120);

    expect(expense.amount).toBe(120);
  });

  it('should allow to create expense only with positive value amount', function () {
    const props = {
      description: 'some_description',
      date: new Date(2020, 9, 15),
      user: 'some_user_id',
      amount: -100,
    };

    const expenseWithId = Expense.createWithId(props, 'some_id');
    // const expenseWithoutId = Expense.createWithoutId(props);

    expect(expenseWithId.value).toBeInstanceOf(InvalidAmountError);
    // expect(expenseWithoutId.value).toBeInstanceOf(InvalidAmountError);
  });

  it('should allow to create expense only with date before the current one', function () {
    const props = {
      description: 'some_description',
      date: new Date(2024, 3, 11),
      user: 'some_user_id',
      amount: 100,
    };

    const expense = Expense.createWithId(props, 'some_id');

    expect(expense.value).toBeInstanceOf(InvalidDateError);
  });

  it('should not allow to create an expense description longer then 191 characters', function () {
    const STRING_192_CHARACTERS =
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus..';
    const props = {
      description: STRING_192_CHARACTERS,
      date: new Date(2022, 3, 11),
      user: 'some_user_id',
      amount: 100,
    };

    const expenseWithId = Expense.createWithId(props, 'some_id');
    // const expenseNoId = Expense.createWithoutId(props);

    expect(expenseWithId.value).toBeInstanceOf(InvalidDescriptionError);
    // expect(expenseNoId.value).toBeInstanceOf(InvalidDescriptionError);
  });
});
