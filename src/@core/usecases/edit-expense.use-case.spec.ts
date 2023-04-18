import { InvalidAmountError } from '../domain/entities/expense/expense.errors';
import { User } from '../domain/entities/user/user.entity';
import { BcryptPasswordHashing } from '../infra/bcrypt/bcrypt-password-hashing';
import { ExpenseInMemoryRepository } from '../infra/expense-in-memory.repository';
import { UserInMemoryRepository } from '../infra/user-in-memory.repository';
import { CreateExpenseUseCase } from './create-expense.use-case';
import { CreateUserOutput, CreateUserUseCase } from './create-user.use-case';
import { EditExpenseUseCase } from './edit-expense.use-case';
import { ExpenseOutput } from './get-expense-by-id.use-case';
import { GetUserByIdUseCase } from './get-user-by-id.use-case';
import { FakeEmailSender } from './test-utils/fake-email-sender';

describe('EditExpenseUseCase Tests', function () {
  const makeTest = () => {
    const expenseRepo = new ExpenseInMemoryRepository();
    const userRepo = new UserInMemoryRepository();
    const passwordHashing = new BcryptPasswordHashing();
    const createUserUseCase = new CreateUserUseCase(userRepo, passwordHashing);
    const getUserById = new GetUserByIdUseCase(userRepo);
    const fakeEmailSender = new FakeEmailSender();
    const createExpenseUseCase = new CreateExpenseUseCase(
      expenseRepo,
      getUserById,
      fakeEmailSender,
    );
    const editExpenseUseCase = new EditExpenseUseCase(expenseRepo);

    return { createExpenseUseCase, editExpenseUseCase, createUserUseCase };
  };

  it('should edit a expense', async function () {
    const { createExpenseUseCase, createUserUseCase, editExpenseUseCase } =
      makeTest();

    const userOrError = await createUserUseCase.execute({
      email: 'diego@gmail.com',
      name: 'Diego',
      password: 'Test1234',
    });
    const user = userOrError.value as CreateUserOutput;

    const expenseOrError = await createExpenseUseCase.execute(
      {
        description: 'expense description',
        date: '2022-04-10',
        amount: 120,
      },
      user.id,
    );

    const expense = expenseOrError.value as ExpenseOutput;

    const editedExpenseOrError = await editExpenseUseCase.execute(
      expense.id,
      user.id,
      {
        description: 'new expense description',
      },
    );

    const editedExpense = editedExpenseOrError.value as ExpenseOutput;

    expect(editedExpense.description).toBe('new expense description');
  });

  it('should return a error if a invalid parameter is passed', async function () {
    const { createExpenseUseCase, editExpenseUseCase, createUserUseCase } =
      makeTest();

    const userOrError = await createUserUseCase.execute({
      email: 'diego@gmail.com',
      name: 'Diego',
      password: 'Test1234',
    });
    const user = userOrError.value as CreateUserOutput;

    const expenseOrError = await createExpenseUseCase.execute(
      {
        description: 'expense description',
        date: '2022-04-10',
        amount: 120,
      },
      user.id,
    );

    const expense = expenseOrError.value as ExpenseOutput;
    console.log(expense);

    const editedExpenseOrError = await editExpenseUseCase.execute(
      expense.id,
      user.id,
      {
        amount: -10,
      },
    );

    expect(editedExpenseOrError.value).toBeInstanceOf(InvalidAmountError);
  });
});
