import { BcryptPasswordHashing } from './bcrypt-password-hashing';

describe('bcrypt password hashing', () => {
  const password = 'password_test';
  const passwordHashing = new BcryptPasswordHashing();

  it('should return a hashed password of the correct length', async () => {
    const hashedPassword = await passwordHashing.hash(password);
    expect(hashedPassword.length).toEqual(60);
  });

  it('should return a different hash for the same input', async () => {
    const hashedPassword1 = await passwordHashing.hash(password);
    const hashedPassword2 = await passwordHashing.hash(password);
    expect(hashedPassword1).not.toEqual(hashedPassword2);
  });

  it('shoul return true if compare the correct password with the hashed one', async () => {
    const hashedPassword = await passwordHashing.hash(password);
    const isMatch = await passwordHashing.compare(password, hashedPassword);
    expect(isMatch).toEqual(true);
  });
});
