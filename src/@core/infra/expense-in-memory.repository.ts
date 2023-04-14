import { Expense } from '../domain/entities/expense/expense.entity';
import { ExpenseRepositoryInterface } from '../domain/repositories/expense.repository';

export class ExpenseInMemoryRepository implements ExpenseRepositoryInterface {
  public items: Expense[] = [];

  async insert(expense: Expense): Promise<void> {
    this.items.push(expense);
  }

  async findByUserIdAndExpenseById(
    userId: string,
    expenseId: string,
  ): Promise<Expense | null> {
    const expense = this.items.find(
      (expense) => expense.id === expenseId && expense.userId === userId,
    );

    if (!expense) return null;

    return expense;
  }

  async getAllByUser(id: string): Promise<Expense[]> {
    return this.items.filter((expense) => expense.userId === id);
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
