import { ExpenseInMemoryRepository } from '../infra/expense-in-memory.repository';
import { CreateExpenseUseCase } from './create-expense.use-case';
import { GetAllExpensesUseCase } from './get-all-expense.use-case';

describe('GetAllExpensesUseCase Tests', function () {
  it('should return all expenses from a specific user', async function () {
    const repository = new ExpenseInMemoryRepository();
    const createExpenseUseCase = new CreateExpenseUseCase(repository);
    const getAllExpensesUseCase = new GetAllExpensesUseCase(repository);

    await createExpenseUseCase.execute(
      {
        description: 'expense description 1',
        date: '2023-04-10',
        amount: 121,
      },
      'user1',
    );

    await createExpenseUseCase.execute(
      {
        description: 'expense description 2',
        date: '2023-04-10',
        amount: 121,
      },
      'user1',
    );

    await createExpenseUseCase.execute(
      {
        description: 'expense description 3',
        date: '2023-04-10',
        amount: 121,
      },
      'user2',
    );

    const expenses = await getAllExpensesUseCase.execute('user1');

    expect(expenses).toHaveLength(2);
    expect(expenses[1].description).toBe('expense description 2');
  });
});
