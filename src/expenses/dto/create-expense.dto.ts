import {
  IsString,
  IsNotEmpty,
  Length,
  IsPositive,
  Validate,
} from 'class-validator';
import { BeforeTodayValidator } from './validator/before-today.validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 191)
  description: string;

  @IsNotEmpty()
  @Validate(BeforeTodayValidator)
  date: string;

  @IsPositive()
  @IsNotEmpty()
  amount: number;
}
