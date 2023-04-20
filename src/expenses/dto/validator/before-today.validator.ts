import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'beforeToday', async: false })
export class BeforeTodayValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const insertedDate = new Date(value);
    return insertedDate.getTime() < today.getTime();
  }

  defaultMessage() {
    return 'The date must be before today';
  }
}
