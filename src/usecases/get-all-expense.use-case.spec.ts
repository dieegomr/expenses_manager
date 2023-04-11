import { ExpenseInMemoryRepository } from '../infra/expense-in-memory.repository';
import { CreateExpenseUseCase } from './create-expense.use-case';
import { GetAllExpensesUseCase } from './get-all-expense.use-case';

describe('GetAllExpensesUseCase Tests', function () {
  it('should return all expenses', async function () {
    const repository = new ExpenseInMemoryRepository();
    const createExpenseUseCase = new CreateExpenseUseCase(repository);
    const getAllExpensesUseCase = new GetAllExpensesUseCase(repository);

    await createExpenseUseCase.execute({
      description: 'expense description 1',
      date: new Date(2022, 3, 10),
      amount: 121,
      user: 'userID',
    });

    await createExpenseUseCase.execute({
      description: 'expense description 2',
      date: new Date(2022, 3, 10),
      amount: 121,
      user: 'userID',
    });

    await createExpenseUseCase.execute({
      description: 'expense description 3',
      date: new Date(2022, 3, 10),
      amount: 121,
      user: 'userID',
    });

    const expenses = await getAllExpensesUseCase.execute();

    expect(expenses).toHaveLength(3);
    expect(expenses[1].description).toBe('expense description 2');
  });
});
