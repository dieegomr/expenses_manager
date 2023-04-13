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
import { CreateExpenseUseCase } from 'src/@core/src/usecases/create-expense.use-case';
import { EditExpenseUseCase } from 'src/@core/src/usecases/edit-expense.use-case';
import { DeleteExpenseByIdUseCase } from 'src/@core/src/usecases/delete-expense.use-case';
import { GetExpenseByIdUseCase } from 'src/@core/src/usecases/get-expense-by-id.use-case';
import { GetAllExpensesUseCase } from 'src/@core/src/usecases/get-all-expense.use-case';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Controller('expenses')
export class ExpensesController {
  // constructor(private readonly expensesService: ExpensesService) {}

  constructor(
    private readonly createExpenseUseCase: CreateExpenseUseCase,
    private readonly editExpenseUseCase: EditExpenseUseCase,
    private readonly deleteExpenseUseCase: DeleteExpenseByIdUseCase,
    private readonly getExpenseByIdUseCase: GetExpenseByIdUseCase,
    private readonly getAllExpenseUseCase: GetAllExpensesUseCase,
  ) {}

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    // return this.expensesService.create(createExpenseDto);
    const output = await this.createExpenseUseCase.execute(createExpenseDto);
    if (output.isLeft())
      throw new HttpException(output.value.message, HttpStatus.BAD_REQUEST);

    return output.value;
  }

  @Get()
  findAll() {
    return this.getAllExpenseUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getExpenseByIdUseCase.execute(id);
    if (output.isLeft())
      throw new HttpException(output.value.message, HttpStatus.BAD_REQUEST);
    return output.value;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    const output = await this.editExpenseUseCase.execute(id, updateExpenseDto);
    if (output.isLeft())
      throw new HttpException(output.value.message, HttpStatus.BAD_REQUEST);
    return output.value;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const output = await this.deleteExpenseUseCase.execute(id);
    if (output.isLeft())
      throw new HttpException(output.value.message, HttpStatus.BAD_REQUEST);

    return output.value;
  }
}