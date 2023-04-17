import { BcryptPasswordHashing } from '../infra/bcrypt/bcrypt-password-hashing';
import { ExpenseInMemoryRepository } from '../infra/expense-in-memory.repository';
import { NodeMailerEmailSender } from '../infra/nodeMailer/nodemailer-email-sender';
import { UserInMemoryRepository } from '../infra/user-in-memory.repository';
import {
  CreateExpenseOutput,
  CreateExpenseUseCase,
} from './create-expense.use-case';
import { CreateUserUseCase } from './create-user.use-case';
import { GetUserByIdUseCase, UserOutput } from './get-user-by-id.use-case';

describe('CreateExpenseUseCase Tests', function () {
  it('should create a new expense', async function () {
    const repository = new ExpenseInMemoryRepository();
    const userRepo = new UserInMemoryRepository();
    const passwordHashing = new BcryptPasswordHashing();
    const createUser = new CreateUserUseCase(userRepo, passwordHashing);
    const getUserById = new GetUserByIdUseCase(userRepo);
    const emailSender = new NodeMailerEmailSender();
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
    expect(output.date).toBe('2022-04-10');
    expect(output.amount).toBe(120);
    expect(output.user).toBe('userID');
  });
});
