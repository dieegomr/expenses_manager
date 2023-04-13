import { UserInMemoryRepository } from '../infra/user-in-memory.repository';
import { CreateUserOutput, CreateUserUseCase } from './create-user.use-case';

describe('CreateUserUseCase Tests', function () {
  it('should create a new expense', async function () {
    const repository = new UserInMemoryRepository();
    const createUserUseCase = new CreateUserUseCase(repository);
    const userOrError = await createUserUseCase.execute({
      name: 'some_name',
      email: 'some_email@gmail.com',
      password: 'some_password',
    });

    const output = userOrError.value as CreateUserOutput;

    expect(repository.items).toHaveLength(1);
    expect(output.name).toBe('some_name');
    expect(output.id).toHaveLength(36);
    expect(output.email).toBe('some_email@gmail.com');
  });
});
