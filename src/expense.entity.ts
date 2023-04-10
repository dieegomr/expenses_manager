export type ExpenseProps = {
  desription: string;
  date: Date;
  user: string;
  value: number;
};

export class Expense {
  private _id?: string;
  public props: ExpenseProps;

  constructor(props: ExpenseProps, id?: string) {
    this.props = props;
    this._id = id;
  }

  public get id() {
    return this._id;
  }
}
