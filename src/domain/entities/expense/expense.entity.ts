import { Either, left, right } from '../../../shared/either';
import { Amount } from '../amount/amount.entity';
import { Description } from '../description/description.entity';
import { ExpenseDate } from '../expense-date/expense-date.entity';
import {
  InvalidAmountError,
  InvalidDateError,
  InvalidDescriptionError,
  InvalidUserIdError,
} from './expense.errors';

export type ExpenseProps = {
  description: string;
  date: Date;
  user: string;
  amount: number;
};

export type ValidationExpenseProps = {
  description?: string;
  date?: Date;
  user?: string;
  amount?: number;
  id?: string;
};

export type DateProps = {
  day: number;
  month: number;
  year: number;
};

export class Expense {
  private _id: string;
  private _props: ExpenseProps;

  private constructor(props: ExpenseProps, id: string) {
    this._props = props;
    this._id = id;
  }

  public static validateExpenseProps(
    props: ValidationExpenseProps
  ): Either<
    | InvalidAmountError
    | InvalidDateError
    | InvalidDescriptionError
    | InvalidUserIdError,
    ValidationExpenseProps
  > {
    if (props.amount) {
      const amountOrError = Amount.validate(props.amount);
      if (amountOrError.isLeft()) return left(amountOrError.value);
    }

    if (props.date) {
      const expenseDateOrError = ExpenseDate.validate(props.date);
      if (expenseDateOrError.isLeft()) return left(expenseDateOrError.value);
    }

    if (props.description) {
      const descriptionOrError = Description.validate(props.description);
      if (descriptionOrError.isLeft()) return left(descriptionOrError.value);
    }

    if (props.id && typeof props.id !== 'string')
      return left(new InvalidUserIdError());

    return right(props);
  }

  // public static createWithoutId(
  //   props: ExpenseProps
  // ): Either<InvalidAmountError | InvalidDateError, Expense> {
  //   const propsOrError = Expense.validateExpenseProps(props);
  //   if (propsOrError.isLeft()) return left(propsOrError.value);
  //   return right(new Expense(propsOrError.value));
  // }

  public static createWithId(
    props: ExpenseProps,
    id: string
  ): Either<
    InvalidAmountError | InvalidDateError | InvalidDescriptionError,
    Expense
  > {
    const propsOrError = Expense.validateExpenseProps(props);
    if (propsOrError.isLeft()) return left(propsOrError.value);
    return right(new Expense(props, id));
  }

  public updateDescription(description: string) {
    this.description = description;
  }

  public updateDate(date: DateProps) {
    this.date = new Date(date.year, date.month - 1, date.day);
  }

  public updateAmount(amount: number) {
    this.amount = amount;
  }

  public get id() {
    return this._id;
  }

  public get description() {
    return this._props.description;
  }

  public get date() {
    return this._props.date;
  }

  public get user() {
    return this._props.user;
  }

  public get amount() {
    return this._props.amount;
  }

  private set description(description: string) {
    this._props.description = description;
  }

  private set date(date: Date) {
    this._props.date = date;
  }

  private set amount(amount: number) {
    this._props.amount = amount;
  }

  public toJSON() {
    return {
      id: this.id,
      description: this.description,
      date: this.date,
      user: this.user,
      amount: this.amount,
    };
  }
}
