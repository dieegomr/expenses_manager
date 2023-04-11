import { Expense } from '../domain/entities/expense/expense.entity';
import { ExpenseRepositoryInterface } from '../domain/repositories/expense.repository';

export class ExpenseInMemoryRepository implements ExpenseRepositoryInterface {
  public items: Expense[] = [];

  async insert(expense: Expense): Promise<void> {
    this.items.push(expense);
  }

  async findById(id: string): Promise<Expense | null> {
    const expense = this.items.find((expense) => expense.id === id);

    if (!expense) return null;

    return expense;
  }
}
