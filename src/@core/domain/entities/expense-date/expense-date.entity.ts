import { Either, left, right } from '../../../shared/either';
import { InvalidDateError } from '../expense/expense.errors';

export class ExpenseDate {
  private _date: string;

  constructor(date: string) {
    this._date = new Date(date).toLocaleDateString();
  }

  public static validate(date: string): Either<InvalidDateError, ExpenseDate> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const insertedDate = new Date(date);
    if (insertedDate.getTime() > currentDate.getTime())
      return left(new InvalidDateError());

    return right(new ExpenseDate(date));
  }

  public static convertToLocale(date: string) {
    const insertedDate = new Date(date);
    return `${insertedDate.getUTCDate()}/${
      insertedDate.getUTCMonth() + 1
    }/${insertedDate.getUTCFullYear()}`;
  }
}
