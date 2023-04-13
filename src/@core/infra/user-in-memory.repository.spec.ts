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

    const user = new User(props, '21313');

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

    const user = new User(props, '21313');

    await repository.findByEmail('dmendes.rocha@gmail.com');

    expect(user.props.name).toBe('Diego');
  });
  it('should return null if does not find a user', async function () {
    const repository = new UserInMemoryRepository();

    const props = {
      name: 'Diego',
      email: 'dmendes.rocha@gmail.com',
      password: '232e4324',
    };

    const user = new User(props, '21313');

    await repository.findByEmail('rafael.rocha@gmail.com');

    expect(user.props.name).toBe('Diego');
  });
});
