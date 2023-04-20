import { Email } from './email.entity';

describe('Email Tests', () => {
  it('should return an error if an invalid email is provided', function () {
    const emailTest = 'dmende@br';

    const emailOrError = Email.create(emailTest);
    const error = emailOrError.value as Error;

    expect(error.message).toStrictEqual(`The email ${emailTest} is invalid`);
  });

  it('should return an email if an valid email is provided', function () {
    const emailTest = 'diego@gmail.br';

    const emailOrError = Email.create(emailTest);
    const email = emailOrError.value as Email;

    expect(email.value).toStrictEqual(emailTest);
  });
});
