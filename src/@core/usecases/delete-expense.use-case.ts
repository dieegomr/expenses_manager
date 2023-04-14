import { ExpenseRepositoryInterface } from '../domain/repositories/expense.repository';
import { Either, left, right } from '../shared/either';
import { ExpenseNotFoundError } from './errors/get-expense-by-id.error';

export class DeleteExpenseByIdUseCase {
  constructor(private readonly expenseRepo: ExpenseRepositoryInterface) {}

  async execute(
    userId: string,
    expenseId: string,
  ): Promise<Either<ExpenseNotFoundError, DeleteExpenseOutput>> {
    const expense = await this.expenseRepo.findByUserIdAndExpenseById(
      userId,
      expenseId,
    );
    if (!expense) return left(new ExpenseNotFoundError());

    await this.expenseRepo.deleteById(expense.id);

    return right(expense.toJSON());
  }
}

type DeleteExpenseOutput = {
  id: string;
  description: string;
  date: string;
  user: string;
  amount: number;
};
