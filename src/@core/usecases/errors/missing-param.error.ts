export class MissingParamError extends Error {
  constructor(param: string) {
    super(`A ${param} must be provided`);
  }
}
