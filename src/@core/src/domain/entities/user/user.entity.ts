import { Either, left } from 'src/@core/src/shared/either';
import { InvalidEmailError } from '../email/emai.errors';
import { Email } from '../email/email.entity';

export type UserProps = {
  name: string;
  email: Email;
  password: string;
};

export class User {
  private _id?: string;
  public props: UserProps;

  constructor(props: UserProps, id?: string) {
    this.props = props;
    this._id = id;
  }

  static create(input: UserProps): Either<InvalidEmailError, User> {
    const emailOrError = Email.create(input.email.value);
    if (emailOrError.isLeft())
      return left(new InvalidEmailError(input.email.value));
  }

  public get id() {
    return this._id;
  }
}
