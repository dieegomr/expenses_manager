import { Expense } from '../entities/expense/expense.entity';

export interface ExpenseRepositoryInterface {
  insert(expense: Expense): Promise<void>;
  findById(id: string): Promise<Expense | null>;
  getAll(): Promise<Expense[]>;
  update(expense: Expense): Promise<Expense>;
  deleteById(id: string): Promise<void>;
}
