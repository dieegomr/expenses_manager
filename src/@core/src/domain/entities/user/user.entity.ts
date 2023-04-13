export type UserProps = {
  name: string;
  email: string;
  password: string;
};

export class User {
  private _id?: string;
  public props: UserProps;

  constructor(props: UserProps, id?: string) {
    this.props = props;
    this._id = id;
  }

  public get id() {
    return this._id;
  }
}
