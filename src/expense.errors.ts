export class InvalidAmountError extends Error {
  constructor() {
    super('An amount must be a positive number');
  }
}

export class InvalidDateError extends Error {
  constructor() {
    super('An expense date must be before the current one');
  }
}
