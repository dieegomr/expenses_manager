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

  constructor(props: ExpenseProps, id?: string) {
    this._props = props;
    this._id = id;
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

  public updateDescription(description: string) {
    this.description = description;
  }

  public updateDate(date: DateProps) {
    this.date = new Date(date.year, date.month - 1, date.day);
  }
}
