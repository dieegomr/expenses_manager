import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { ExpenseInMemoryRepository } from 'src/@core/infra/expense-in-memory.repository';
import { CreateExpenseUseCase } from 'src/@core/usecases/create-expense.use-case';
import { ExpenseRepositoryInterface } from 'src/@core/domain/repositories/expense.repository';
import { EditExpenseUseCase } from 'src/@core/usecases/edit-expense.use-case';
import { DeleteExpenseByIdUseCase } from 'src/@core/usecases/delete-expense.use-case';
import { GetAllExpensesUseCase } from 'src/@core/usecases/get-all-expense.use-case';
import { GetExpenseByIdUseCase } from 'src/@core/usecases/get-expense-by-id.use-case';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { NodeMailerEmailSender } from 'src/@core/infra/nodeMailer/nodemailer-email-sender';
import { EmailSender } from 'src/@core/domain/interfaces/email-sender.interface';
import { GetUserByIdUseCase } from 'src/@core/usecases/get-user-by-id.use-case';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [ExpensesController],
  providers: [
    ExpensesService,
    {
      provide: ExpenseInMemoryRepository,
      useClass: ExpenseInMemoryRepository,
    },
    {
      provide: NodeMailerEmailSender,
      useClass: NodeMailerEmailSender,
    },
    {
      provide: CreateExpenseUseCase,
      useFactory: (
        expenseRepo: ExpenseRepositoryInterface,
        getUserById: GetUserByIdUseCase,
        emailSender: EmailSender,
      ) => {
        return new CreateExpenseUseCase(expenseRepo, getUserById, emailSender);
      },
      inject: [
        ExpenseInMemoryRepository,
        GetUserByIdUseCase,
        NodeMailerEmailSender,
      ],
    },
    {
      provide: EditExpenseUseCase,
      useFactory: (expenseRepo: ExpenseRepositoryInterface) => {
        return new EditExpenseUseCase(expenseRepo);
      },
      inject: [ExpenseInMemoryRepository],
    },
    {
      provide: DeleteExpenseByIdUseCase,
      useFactory: (expenseRepo: ExpenseRepositoryInterface) => {
        return new DeleteExpenseByIdUseCase(expenseRepo);
      },
      inject: [ExpenseInMemoryRepository],
    },
    {
      provide: GetAllExpensesUseCase,
      useFactory: (expenseRepo: ExpenseRepositoryInterface) => {
        return new GetAllExpensesUseCase(expenseRepo);
      },
      inject: [ExpenseInMemoryRepository],
    },
    {
      provide: GetExpenseByIdUseCase,
      useFactory: (expenseRepo: ExpenseRepositoryInterface) => {
        return new GetExpenseByIdUseCase(expenseRepo);
      },
      inject: [ExpenseInMemoryRepository],
    },
  ],
})
export class ExpensesModule {}
