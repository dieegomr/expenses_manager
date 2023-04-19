import { Test, TestingModule } from '@nestjs/testing';
import { EditExpenseUseCase } from '../@core/usecases/edit-expense.use-case';
import { CreateExpenseUseCase } from '../@core/usecases/create-expense.use-case';
import { ExpensesController } from './expenses.controller';
import { DeleteExpenseByIdUseCase } from '../@core/usecases/delete-expense.use-case';
import { GetAllExpensesUseCase } from '../@core/usecases/get-all-expense.use-case';
import { GetExpenseByIdUseCase } from '../@core/usecases/get-expense-by-id.use-case';

describe('ExpensesController', () => {
  let controller: ExpensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesController],
      providers: [
        CreateExpenseUseCase,
        EditExpenseUseCase,
        DeleteExpenseByIdUseCase,
        GetExpenseByIdUseCase,
        GetAllExpensesUseCase,
      ],
    }).compile();

    controller = module.get<ExpensesController>(ExpensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
