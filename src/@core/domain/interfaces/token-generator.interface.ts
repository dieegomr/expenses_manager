export interface TokenGenerator {
  sign: (userId: string) => Promise<string>;
  verify: (token: string) => Promise<any>;
}
