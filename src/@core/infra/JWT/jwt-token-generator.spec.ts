import jwt from 'jsonwebtoken';

describe('JWT Test', () => {
  const payload = { username: 'testuser' };
  const secret = 'mysecret';
  const token = jwt.sign(payload, secret);
  it('should create a valid JWT', () => {
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });
  it('should verify a valid JWT', () => {
    const decoded = jwt.verify(token, secret) as { username: string };

    expect(decoded).toBeDefined();
    expect(decoded.username).toBe('testuser');
  });

  it('should fail to verify an invalid JWT', () => {
    const invalidToken = token.slice(0, -1) + 'A';
    expect(() => {
      jwt.verify(invalidToken, secret);
    }).toThrow(jwt.JsonWebTokenError);
  });
});
