export type UserPayload = {
  sub: number;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
};
