import { BcryptPasswordHashing } from '../infra/bcrypt/bcrypt-password-hashing';
import { ExpenseInMemoryRepository } from '../infra/expense-in-memory.repository';
import { UserInMemoryRepository } from '../infra/user-in-memory.repository';
import {
  CreateExpenseOutput,
  CreateExpenseUseCase,
} from './create-expense.use-case';
import { CreateUserUseCase } from './create-user.use-case';
import { GetUserByIdUseCase, UserOutput } from './get-user-by-id.use-case';
import { FakeEmailSender } from './test-utils/fake-email-sender';

describe('CreateExpenseUseCase Tests', function () {
  const makeTest = async () => {
    const repository = new ExpenseInMemoryRepository();
    const userRepo = new UserInMemoryRepository();
    const passwordHashing = new BcryptPasswordHashing();
    const createUser = new CreateUserUseCase(userRepo, passwordHashing);
    const getUserById = new GetUserByIdUseCase(userRepo);
    const emailSender = new FakeEmailSender();
    const createExpenseUseCase = new CreateExpenseUseCase(
      repository,
      getUserById,
      emailSender,
    );
    const userOrError = await createUser.execute({
      name: 'userName',
      email: 'userEmail@gmail.com',
      password: 'userPassword',
    });
    const user = userOrError.value as UserOutput;

    return { userOrError, createExpenseUseCase, repository, user };
  };
  it('should return error if a negative amount is provided', async function () {
    const { createExpenseUseCase, user } = await makeTest();

    const expenseOrError = await createExpenseUseCase.execute(
      {
        description: 'expense description',
        date: '2022-04-10',
        amount: -120,
      },
      user.id,
    );
    const error = expenseOrError.value as Error;

    expect(error.message).toStrictEqual('An amount must be a positive number');
  });
  it('should return error if a date after the current date is provided', async function () {
    const { createExpenseUseCase, user } = await makeTest();

    const expenseOrError = await createExpenseUseCase.execute(
      {
        description: 'expense description',
        date: '2024-04-10',
        amount: 120,
      },
      user.id,
    );
    const error = expenseOrError.value as Error;

    expect(error.message).toStrictEqual(
      'An expense date must be before the current one',
    );
  });
  it('should return error if a provided description has more then 191 characters', async function () {
    const TEXT_192_CHARACTERS =
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus..';
    const { createExpenseUseCase, user } = await makeTest();

    const expenseOrError = await createExpenseUseCase.execute(
      {
        description: TEXT_192_CHARACTERS,
        date: '2022-04-10',
        amount: 120,
      },
      user.id,
    );
    const error = expenseOrError.value as Error;

    expect(error.message).toStrictEqual(
      'An description must have a maximum of 191 character',
    );
  });
  it('should create a new expense', async function () {
    const { createExpenseUseCase, repository, user } = await makeTest();

    const expense = await createExpenseUseCase.execute(
      {
        description: 'expense description',
        date: '2022-04-10',
        amount: 120,
      },
      user.id,
    );

    const output = expense.value as CreateExpenseOutput;

    expect(repository.items).toHaveLength(1);

    expect(typeof output.id).toBe('string');
    expect(output.description).toBe('expense description');
    expect(output.date).toBe('10/4/2022');
    expect(output.amount).toBe(120);
    expect(output.user).toBe(user.id);
  });
  it('should return an error if the id user provided does not exists', async function () {
    const { createExpenseUseCase } = await makeTest();

    const expenseOrError = await createExpenseUseCase.execute(
      {
        description: 'expense description',
        date: '2022-04-10',
        amount: 120,
      },
      '1234',
    );

    const error = expenseOrError.value as Error;

    expect(error.message).toStrictEqual('User not found');
  });
});
