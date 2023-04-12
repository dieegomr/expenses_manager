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

export class InvalidDescriptionError extends Error {
  constructor() {
    super('An description must have a maximum of 191 character');
  }
}

export class InvalidUserIdError extends Error {
  constructor() {
    super('A valid user id must be provided');
  }
}
