import jwt from 'jsonwebtoken';
import { JwtTokenGenerator } from './jwt-token-generator';

describe('JWT Test', () => {
  const payload = { username: 'testuser' };
  const secret = 'mysecret';
  const token = jwt.sign(payload, secret);
  it('should create a valid JWT', async () => {
    const tokenGenerator = new JwtTokenGenerator();
    const token = await tokenGenerator.sign('userId');
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });
  it('should verify a valid JWT', () => {
    const decoded = jwt.verify(token, secret) as { username: string };

    expect(decoded).toBeDefined();
    expect(decoded.username).toBe('testuser');
  });

  it('should fail to verify an invalid JWT', async () => {
    const invalidToken = token.slice(0, -1) + 'A';
    const jwt = new JwtTokenGenerator();
    const result = await jwt.verify(invalidToken);
    expect(result.message).toStrictEqual('Something wrong verifyng JWT');
  });
});
