import { Expense } from '../domain/entities/expense/expense.entity';

import crypto from 'crypto';
import { Either, left, right } from '../shared/either';
import {
  InvalidAmountError,
  InvalidDateError,
  InvalidDescriptionError,
} from '../domain/entities/expense/expense.errors';
import { ExpenseRepositoryInterface } from '../domain/repositories/expense.repository';
import { UserRepositoryInterface } from '../domain/repositories/user.repository';
import { EmailSender } from '../domain/interfaces/email-sender.interface';

export class CreateExpenseUseCase {
  constructor(
    private readonly expenseRepo: ExpenseRepositoryInterface,
    private readonly userRepo: UserRepositoryInterface,
    private readonly emailSender: EmailSender,
  ) {}

  async execute(
    input: CreateExpenseInput,
    userId: string,
  ): Promise<
    Either<
      InvalidAmountError | InvalidDateError | InvalidDescriptionError,
      CreateExpenseOutput
    >
  > {
    const uuid = crypto.randomUUID();

    const user = await this.userRepo.findById(userId);

    const expense = Expense.create(input, userId, uuid);
    if (expense.isLeft()) return left(expense.value);

    await this.expenseRepo.insert(expense.value);

    await this.emailSender.sendEmail({
      email: user.props.email,
      subject: 'Despesa Cadastrada',
      text: `Detalhes da despesa: 
      id: ${expense.value.id}
      descrição: ${expense.value.description}
      data: ${expense.value.date}
      valor: R$${expense.value.amount} 
      `,
    });

    return right(expense.value.toJSON());
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
