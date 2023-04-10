import { InvalidAmountError } from './expense.errors';
import { Either, left, right } from './shared/either';

export type ExpenseProps = {
  description: string;
  date: Date;
  user: string;
  amount: number;
};

export type DateProps = {
  day: number;
  month: number;
  year: number;
};

export class Expense {
  private _id?: string;
  private _props: ExpenseProps;

  private constructor(props: ExpenseProps, id?: string) {
    this._props = props;
    this._id = id;
  }

  public static createWithoutId(
    props: ExpenseProps
  ): Either<InvalidAmountError, Expense> {
    if (props.amount < 0) return left(new InvalidAmountError());
    return right(new Expense(props));
  }

  public static createWithId(
    props: ExpenseProps,
    id: string
  ): Either<InvalidAmountError, Expense> {
    if (props.amount < 0) return left(new InvalidAmountError());
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
}
