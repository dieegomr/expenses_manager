import { Either, left, right } from '../../../shared/either';
import { InvalidEmailError } from '../email/emai.errors';
import { Email } from '../email/email.entity';
import { MissingUserParamError } from './user.errors';

export type UserProps = {
  name: string;
  email: string;
  password: string;
};

export class User {
  private _id?: string;
  public props: UserProps;

  private constructor(props: UserProps, id?: string) {
    this.props = props;
    this._id = id;
  }

  static create(input: UserProps, id: string): Either<InvalidEmailError, User> {
    if (!input.name) return left(new MissingUserParamError('Name'));
    if (!input.email) return left(new MissingUserParamError('Email'));
    if (!input.password) return left(new MissingUserParamError('Password'));
    const emailOrError = Email.create(input.email);
    if (emailOrError.isLeft()) return left(new InvalidEmailError(input.email));

    return right(new User(input, id));
  }

  public get id() {
    return this._id;
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.props.name,
      email: this.props.email,
      password: this.props.password,
    };
  }
}
