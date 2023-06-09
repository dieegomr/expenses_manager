import {
  InvalidDescriptionError,
  InvalidAmountError,
  InvalidDateError,
} from '../domain/entities/expense/expense.errors';
import { ExpenseRepositoryInterface } from '../domain/repositories/expense.repository';
import { Either, left, right } from '../shared/either';
import { ExpenseNotFoundError } from './errors/get-expense-by-id.error';

export class EditExpenseUseCase {
  constructor(private readonly expenseRepo: ExpenseRepositoryInterface) {}

  async execute(
    expenseId: string,
    userId: string,
    input: EditExpenseInput,
  ): Promise<
    Either<
      | InvalidAmountError
      | InvalidDateError
      | InvalidDescriptionError
      | ExpenseNotFoundError,
      EditExpenseOutput
    >
  > {
    const expense = await this.expenseRepo.findByUserIdAndExpenseById(
      userId,
      expenseId,
    );
    if (!expense) return left(new ExpenseNotFoundError());

    const expenseOrError = expense.updateExpense(input);
    if (expenseOrError.isLeft()) return left(expenseOrError.value);

    const updatedExpense = await this.expenseRepo.update(expense);

    return right(updatedExpense.toJSON());
  }
}

type EditExpenseInput = {
  description?: string;
  date?: string;
  amount?: number;
};

type EditExpenseOutput = {
  id: string;
  description: string;
  date: string;
  user: string;
  amount: number;
};
