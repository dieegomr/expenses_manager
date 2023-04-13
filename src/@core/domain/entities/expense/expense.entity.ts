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
  date: string;
  user: string;
  amount: number;
};

export type CreateExpenseParams = {
  description: string;
  date: string;
  amount: number;
};

export type ValidationExpenseProps = {
  description?: string;
  date?: string;
  user?: string;
  amount?: number;
  id?: string;
};

export type UpdateExpenseProps = {
  description?: string;
  date?: string;
  amount?: number;
};

export class Expense {
  private _id: string;
  private _props: CreateExpenseParams;
  private _userId: string;

  private constructor(props: CreateExpenseParams, userId: string, id: string) {
    this._props = props;
    this._id = id;
    this._userId = userId;
  }

  public static validateExpenseProps(
    props: ValidationExpenseProps,
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
  public static create(
    props: CreateExpenseParams,
    userId: string,
    id: string,
  ): Either<
    InvalidAmountError | InvalidDateError | InvalidDescriptionError,
    Expense
  > {
    const propsOrError = Expense.validateExpenseProps(props);
    if (propsOrError.isLeft()) return left(propsOrError.value);
    return right(new Expense(props, userId, id));
  }

  public updateExpense(
    input: UpdateExpenseProps,
  ): Either<
    InvalidAmountError | InvalidDateError | InvalidDescriptionError,
    true
  > {
    const inputOrError = Expense.validateExpenseProps(input);

    if (inputOrError.isLeft()) return left(inputOrError.value);
    this.updateAmount(input);
    this.updateDate(input);
    this.updateDescription(input);

    return right(true);
  }

  private updateDescription(input: UpdateExpenseProps) {
    if (input.description) this.description = input.description;
  }

  private updateDate(input: UpdateExpenseProps) {
    if (input.date) {
      this.date = input.date;
    }
  }

  private updateAmount(input: UpdateExpenseProps) {
    if (input.amount) this.amount = input.amount;
  }

  public get id() {
    return this._id;
  }

  public get userId() {
    return this._userId;
  }

  public get description() {
    return this._props.description;
  }

  private set description(description: string) {
    this._props.description = description;
  }

  public get date() {
    return this._props.date;
  }

  private set date(date: string) {
    this._props.date = date;
  }

  public get amount() {
    return this._props.amount;
  }

  private set amount(amount: number) {
    this._props.amount = amount;
  }

  public toJSON() {
    return {
      id: this.id,
      description: this.description,
      date: this.date,
      user: this.userId,
      amount: this.amount,
    };
  }
}
