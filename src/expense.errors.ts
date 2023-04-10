export class InvalidAmountError extends Error {
  constructor() {
    super('An amount must be a positive number');
  }
}
