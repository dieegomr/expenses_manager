import { Expense } from '../domain/entities/expense/expense.entity';

import crypto from 'crypto';
import { Either, left, right } from '../shared/either';
import {
  InvalidAmountError,
  InvalidDateError,
  InvalidDescriptionError,
} from '../domain/entities/expense/expense.errors';
import { ExpenseRepositoryInterface } from '../domain/repositories/expense.repository';

export class CreateExpenseUseCase {
  constructor(private readonly expenseRepo: ExpenseRepositoryInterface) {}

  async execute(
    input: CreateExpenseInput,
  ): Promise<
    Either<
      InvalidAmountError | InvalidDateError | InvalidDescriptionError,
      CreateExpenseOutput
    >
  > {
    const uuid = crypto.randomUUID();

    const expense = Expense.createWithId(input, uuid);
    if (expense.isLeft()) return left(expense.value);

    await this.expenseRepo.insert(expense.value);

    return right(expense.value.toJSON());
  }
}

type CreateExpenseInput = {
  description: string;
  date: string;
  user: string;
  amount: number;
};

type CreateExpenseOutput = {
  id: string;
  description: string;
  date: string;
  user: string;
  amount: number;
};
