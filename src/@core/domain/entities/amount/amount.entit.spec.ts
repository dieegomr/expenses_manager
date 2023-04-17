import { Amount } from './amount.entity';

describe('Amount Tests', () => {
  it('should return an error if negative amount is provided', function () {
    const amountOrError = Amount.validate(-10);
    const error = amountOrError.value as Error;

    expect(amountOrError.isLeft()).toBe(true);
    expect(error.message).toStrictEqual('An amount must be a positive number');
  });

  it('should return an amount if a positive amount is provided', function () {
    const amountOrError = Amount.validate(10);
    const amount = amountOrError.value as Amount;

    expect(amountOrError.isRight()).toBe(true);
    expect(amount.value).toBe(10);
  });
});
