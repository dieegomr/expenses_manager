import { Expense } from '../domain/entities/expense/expense.entity';
import { ExpenseRepositoryInterface } from '../domain/repositories/expense.repository';
import { Either, left, right } from '../shared/either';
import { ExpenseNotFoundError } from './errors/get-expense-by-id.error';
import { ExpenseOutput } from './get-expense-by-id.use-case';

export class GetAllExpensesUseCase {
  constructor(private readonly expenseRepo: ExpenseRepositoryInterface) {}

  async execute(): Promise<ExpenseOutput[]> {
    const expenses = await this.expenseRepo.getAll();
    return expenses.map((expense) => expense.toJSON());
  }
}
