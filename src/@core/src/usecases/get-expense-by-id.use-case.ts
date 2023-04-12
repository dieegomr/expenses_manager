import { ExpenseRepositoryInterface } from '../domain/repositories/expense.repository';
import { Either, left, right } from '../shared/either';
import { ExpenseNotFoundError } from './errors/get-expense-by-id.error';

export class GetExpenseByIdUseCase {
  constructor(private readonly expenseRepo: ExpenseRepositoryInterface) {}

  async execute(
    expenseId: string,
  ): Promise<Either<ExpenseNotFoundError, ExpenseOutput>> {
    const expense = await this.expenseRepo.findById(expenseId);

    if (!expense) return left(new ExpenseNotFoundError());

    return right(expense.toJSON());
  }
}

export type ExpenseOutput = {
  id: string;
  description: string;
  date: string;
  user: string;
  amount: number;
};
