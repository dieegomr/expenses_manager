export type ExpenseProps = {
  description: string;
  date: Date;
  user: string;
  value: number;
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

  public get value() {
    return this._props.value;
  }

  private set description(description: string) {
    this._props.description = description;
  }

  public updateDescription(description: string) {
    this.description = description;
  }
}
