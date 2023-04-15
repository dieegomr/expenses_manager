import { User } from '../domain/entities/user/user.entity';
import { UserInMemoryRepository } from './user-in-memory.repository';

describe('UserInMemoryRepository Test', function () {
  it('should insert a new user', async function () {
    const repository = new UserInMemoryRepository();

    const props = {
      name: 'Diego',
      email: 'dmendes.rocha@gmail.com',
      password: '232e4324',
    };

    const userOrError = User.create(props, '12312321');
    const user = userOrError.value as User;

    await repository.save(user);

    expect(repository.items).toHaveLength(1);
    expect(repository.items).toStrictEqual([user]);
  });
  it('should return a user given an email', async function () {
    const repository = new UserInMemoryRepository();

    const props = {
      name: 'Diego',
      email: 'dmendes.rocha@gmail.com',
      password: '232e4324',
    };

    const userOrError = User.create(props, '12312321');
    const user = userOrError.value as User;

    await repository.save(user);

    const foundUser = await repository.findByEmail('dmendes.rocha@gmail.com');

    expect(foundUser).toStrictEqual(user);
  });

  it('should return a user given an id', async function () {
    const repository = new UserInMemoryRepository();

    const props = {
      name: 'Diego',
      email: 'dmendes.rocha@gmail.com',
      password: '232e4324',
    };

    const userOrError = User.create(props, '12312321');
    const user = userOrError.value as User;

    await repository.save(user);

    const foundUser = await repository.findById('12312321');

    expect(foundUser).toStrictEqual(user);
  });
  it('should return null if does not find a user', async function () {
    const repository = new UserInMemoryRepository();

    const props = {
      name: 'Diego',
      email: 'dmendes.rocha@gmail.com',
      password: '232e4324',
    };

    const userOrError = User.create(props, '12312321');
    const user = userOrError.value as User;

    await repository.findByEmail('rafael.rocha@gmail.com');

    expect(user.props.name).toBe('Diego');
  });
});
