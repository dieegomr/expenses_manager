import { Either, left, right } from '../../shared/either';
import { InvalidAmountError } from '../expense/expense.errors';

export class Amount {
  private _value: number;

  constructor(value: number) {
    this._value = value;
  }

  public static validate(value: number): Either<InvalidAmountError, Amount> {
    if (value < 0) return left(new InvalidAmountError());

    return right(new Amount(value));
  }

  public get value() {
    return this._value;
  }
}
