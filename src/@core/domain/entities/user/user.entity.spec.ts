import { Email } from '../email/email.entity';
import { User } from './user.entity';
import { MissingUserParamError } from './user.errors';

describe('User Tests', () => {
  const emailOrError = Email.create('diego@gmail.com');
  const email = emailOrError.value as Email;
  it('should create a user with id', function () {
    const props = {
      name: 'some_user_name',
      password: 'some_user_password',
      email: email.value,
    };

    const userOrError = User.create(props, 'some_user_id');
    const user = userOrError.value as User;

    expect(user.id).toBe('some_user_id');
    expect(user.props.name).toBe('some_user_name');
    expect(user.props.password).toBe('some_user_password');
    expect(user.props.email).toBe('diego@gmail.com');
  });

  it('should create a user without id', function () {
    const emailOrError = Email.create('diego@gmail.com');
    const email = emailOrError.value as Email;
    const props = {
      name: 'some_user_name',
      password: 'some_user_password',
      email: email.value,
    };

    const userOrError = User.create(props, 'some_user_id');
    const user = userOrError.value as User;

    expect(user.props.name).toBe('some_user_name');
    expect(user.props.password).toBe('some_user_password');
  });

  it('should return MissingUserParamError if an email is not provided', function () {
    const props = {
      name: 'some_user_name',
      password: 'diego@gmail.com',
    };
    const user = User.create(props, 'some_id');

    expect(user.value).toBeInstanceOf(MissingUserParamError);
  });

  it('should return MissingUserParamError if an password is not provided', function () {
    const emailOrError = Email.create('diego@gmail.com');
    const email = emailOrError.value as Email;
    const props = {
      name: 'some_user_name',
      email: email.value,
    };
    const user = User.create(props, 'some_id');

    expect(user.value).toBeInstanceOf(MissingUserParamError);
  });

  it('should return MissingUserParamError if an name is not provided', function () {
    const emailOrError = Email.create('diego@gmail.com');
    const email = emailOrError.value as Email;
    const props = {
      email: email.value,
      password: 'diego@gmail.com',
    };
    const user = User.create(props, 'some_id');

    expect(user.value).toBeInstanceOf(MissingUserParamError);
  });
});
