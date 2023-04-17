import { Expense } from '../domain/entities/expense/expense.entity';

import crypto from 'crypto';
import { Either, left, right } from '../shared/either';
import {
  InvalidAmountError,
  InvalidDateError,
  InvalidDescriptionError,
} from '../domain/entities/expense/expense.errors';
import { ExpenseRepositoryInterface } from '../domain/repositories/expense.repository';
import { EmailSender } from '../domain/interfaces/email-sender.interface';
import { GetUserByIdUseCase } from './get-user-by-id.use-case';
import { UserNotFoundError } from './errors/user-not-found.error';

export class CreateExpenseUseCase {
  constructor(
    private readonly expenseRepo: ExpenseRepositoryInterface,
    private readonly getUserById: GetUserByIdUseCase,
    private readonly emailSender: EmailSender,
  ) {}

  async execute(
    input: CreateExpenseInput,
    userId: string,
  ): Promise<
    Either<
      | InvalidAmountError
      | InvalidDateError
      | InvalidDescriptionError
      | UserNotFoundError,
      CreateExpenseOutput
    >
  > {
    const uuid = crypto.randomUUID();

    const userOrError = await this.getUserById.execute(userId);
    if (userOrError.isLeft()) return left(userOrError.value);
    const user = userOrError.value;

    const expenseOrError = Expense.create(input, userId, uuid);
    if (expenseOrError.isLeft()) return left(expenseOrError.value);
    const { amount, date, description } = expenseOrError.value;

    await this.expenseRepo.insert(expenseOrError.value);

    await this.emailSender.sendEmail({
      email: user.email,
      subject: 'Despesa Cadastrada',
      text: `No dia ${date}, foi gasto R$${amount} com ${description}`,
    });

    return right(expenseOrError.value.toJSON());
  }
}

type CreateExpenseInput = {
  description: string;
  date: string;
  amount: number;
};

export type CreateExpenseOutput = {
  id: string;
  description: string;
  date: string;
  user: string;
  amount: number;
};
