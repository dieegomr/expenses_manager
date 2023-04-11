import { Expense } from '../domain/entities/expense/expense.entity';
import { ExpenseRepositoryInterface } from '../domain/repositories/expense.repository';
import { Either, left, right } from '../shared/either';
import { ExpenseNotFoundError } from './errors/get-expense-by-id.error';

export class GetAllExpensesUseCase {
  constructor(private readonly expenseRepo: ExpenseRepositoryInterface) {}

  async execute(): Promise<Expense[]> {
    return await this.expenseRepo.getAll();
  }
}
