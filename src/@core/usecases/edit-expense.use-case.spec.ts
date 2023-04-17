import { InvalidAmountError } from '../domain/entities/expense/expense.errors';
import { User } from '../domain/entities/user/user.entity';
import { ExpenseInMemoryRepository } from '../infra/expense-in-memory.repository';
import { NodeMailerEmailSender } from '../infra/nodeMailer/nodemailer-email-sender';
import { UserInMemoryRepository } from '../infra/user-in-memory.repository';
import { CreateExpenseUseCase } from './create-expense.use-case';
import { EditExpenseUseCase } from './edit-expense.use-case';
import { ExpenseOutput } from './get-expense-by-id.use-case';

describe('EditExpenseUseCase Tests', function () {
  it('should edit a expense', async function () {
    const repository = new ExpenseInMemoryRepository();
    const userRepo = new UserInMemoryRepository();
    const emailSender = new NodeMailerEmailSender();
    const createUseCase = new CreateExpenseUseCase(
      repository,
      userRepo,
      emailSender,
    );
    const editExpenseUseCase = new EditExpenseUseCase(repository);

    const userOrError = User.create(
      { email: 'diego@gmail.com', name: 'Diego', password: 'Test1234' },
      'userID',
    );
    const user = userOrError.value as User;

    await userRepo.save(user);

    const expenseOrError = await createUseCase.execute(
      {
        description: 'expense description',
        date: '2022-04-10',
        amount: 120,
      },
      'userID',
    );

    const expense = expenseOrError.value as ExpenseOutput;

    const editedExpenseOrError = await editExpenseUseCase.execute(
      expense.id,
      'userID',
      {
        description: 'new expense description',
      },
    );

    const editedExpense = editedExpenseOrError.value as ExpenseOutput;

    expect(editedExpense.description).toBe('new expense description');
  });

  it('should return a error if a invalid parameter is passed', async function () {
    const repository = new ExpenseInMemoryRepository();
    const createUseCase = new CreateExpenseUseCase(repository);
    const editExpenseUseCase = new EditExpenseUseCase(repository);

    const expenseOrError = await createUseCase.execute(
      {
        description: 'expense description',
        date: '2022-04-10',
        amount: 120,
      },
      'userID',
    );

    const expense = expenseOrError.value as ExpenseOutput;

    const editedExpenseOrError = await editExpenseUseCase.execute(
      expense.id,
      'userID',
      {
        amount: -10,
      },
    );

    expect(editedExpenseOrError.value).toBeInstanceOf(InvalidAmountError);
  });
});
