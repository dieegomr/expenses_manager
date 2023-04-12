import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { ExpenseInMemoryRepository } from 'src/@core/src/infra/expense-in-memory.repository';
import { CreateExpenseUseCase } from 'src/@core/src/usecases/create-expense.use-case';
import { ExpenseRepositoryInterface } from 'src/@core/src/domain/repositories/expense.repository';
import { EditExpenseUseCase } from 'src/@core/src/usecases/edit-expense.use-case';
import { DeleteExpenseByIdUseCase } from 'src/@core/src/usecases/delete-expense.use-case';
import { GetAllExpensesUseCase } from 'src/@core/src/usecases/get-all-expense.use-case';
import { GetExpenseByIdUseCase } from 'src/@core/src/usecases/get-expense-by-id.use-case';

@Module({
  controllers: [ExpensesController],
  providers: [
    ExpensesService,
    {
      provide: ExpenseInMemoryRepository,
      useClass: ExpenseInMemoryRepository,
    },
    {
      provide: CreateExpenseUseCase,
      useFactory: (expenseRepo: ExpenseRepositoryInterface) => {
        return new CreateExpenseUseCase(expenseRepo);
      },
      inject: [ExpenseInMemoryRepository],
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
