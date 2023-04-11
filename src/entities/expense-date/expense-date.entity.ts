import { Either, left, right } from '../../shared/either';
import { InvalidDateError } from '../expense/expense.errors';

export class ExpenseDate {
  private _date: Date;

  constructor(date: Date) {
    this._date = date;
  }

  public static validate(date: Date): Either<InvalidDateError, ExpenseDate> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (date.getTime() > currentDate.getTime())
      return left(new InvalidDateError());

    return right(new ExpenseDate(date));
  }
}
