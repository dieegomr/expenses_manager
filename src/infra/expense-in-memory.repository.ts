import {
  Expense,
  UpdateExpenseProps,
} from '../domain/entities/expense/expense.entity';
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

  async getAll(): Promise<Expense[]> {
    return this.items;
  }

  async update(expense: Expense): Promise<Expense> {
    const index = this.items.findIndex((item) => item.id === expense.id);

    this.items[index] = expense;

    return this.items[index];
  }

  async deleteById(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === id);

    this.items.splice(index, 1);
  }
}
