import { User } from './user.entity';

describe('User Tests', () => {
  it('should create a user with id', function () {
    const props = {
      name: 'some_user_name',
      password: 'some_user_password',
    };
    const user = new User(props, 'some_user_id');

    expect(user.id).toBe('some_user_id');
    expect(user.props.name).toBe('some_user_name');
    expect(user.props.password).toBe('some_user_password');
  });

  it('should create a user without id', function () {
    const props = {
      name: 'some_user_name',
      password: 'some_user_password',
    };
    const user = new User(props);

    expect(user.props.name).toBe('some_user_name');
    expect(user.props.password).toBe('some_user_password');
  });
});
