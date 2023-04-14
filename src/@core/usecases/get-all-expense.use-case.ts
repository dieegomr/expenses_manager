import { ExpenseRepositoryInterface } from '../domain/repositories/expense.repository';
import { ExpenseOutput } from './get-expense-by-id.use-case';

export class GetAllExpensesUseCase {
  constructor(private readonly expenseRepo: ExpenseRepositoryInterface) {}

  async execute(userId: string): Promise<ExpenseOutput[]> {
    const expenses = await this.expenseRepo.getAllByUser(userId);
    return expenses.map((expense) => expense.toJSON());
  }
}
