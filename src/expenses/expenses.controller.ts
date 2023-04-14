import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CreateExpenseUseCase } from 'src/@core/usecases/create-expense.use-case';
import { EditExpenseUseCase } from 'src/@core/usecases/edit-expense.use-case';
import { DeleteExpenseByIdUseCase } from 'src/@core/usecases/delete-expense.use-case';
import { GetExpenseByIdUseCase } from 'src/@core/usecases/get-expense-by-id.use-case';
import { GetAllExpensesUseCase } from 'src/@core/usecases/get-all-expense.use-case';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { CurrentUser } from 'src/auth/decorators/current-user-decorator';
import { UserFromJwt } from 'src/auth/models/user-from-jwt';

@Controller('expenses')
export class ExpensesController {
  constructor(
    private readonly createExpenseUseCase: CreateExpenseUseCase,
    private readonly editExpenseUseCase: EditExpenseUseCase,
    private readonly deleteExpenseUseCase: DeleteExpenseByIdUseCase,
    private readonly getExpenseByIdUseCase: GetExpenseByIdUseCase,
    private readonly getAllExpenseUseCase: GetAllExpensesUseCase,
  ) {}

  @Post()
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
    @CurrentUser() user: UserFromJwt,
  ) {
    const userId = user.id;
    const output = await this.createExpenseUseCase.execute(
      createExpenseDto,
      userId,
    );
    if (output.isLeft())
      throw new HttpException(output.value.message, HttpStatus.BAD_REQUEST);

    return output.value;
  }

  @Get()
  findAll(@CurrentUser() user: UserFromJwt) {
    return this.getAllExpenseUseCase.execute(user.id);
  }

  @Get(':id')
  async findOne(
    @Param('id') expenseId: string,
    @CurrentUser() user: UserFromJwt,
  ) {
    const output = await this.getExpenseByIdUseCase.execute(user.id, expenseId);
    if (output.isLeft())
      throw new HttpException(output.value.message, HttpStatus.BAD_REQUEST);
    return output.value;
  }

  @Patch(':id')
  async update(
    @Param('id') expenseId: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @CurrentUser() user: UserFromJwt,
  ) {
    const output = await this.editExpenseUseCase.execute(
      expenseId,
      user.id,
      updateExpenseDto,
    );
    if (output.isLeft())
      throw new HttpException(output.value.message, HttpStatus.BAD_REQUEST);
    return output.value;
  }

  @Delete(':id')
  async remove(
    @Param('id') expenseId: string,
    @CurrentUser() user: UserFromJwt,
  ) {
    const output = await this.deleteExpenseUseCase.execute(user.id, expenseId);
    if (output.isLeft())
      throw new HttpException(output.value.message, HttpStatus.BAD_REQUEST);

    return output.value;
  }
}
