export class MissingUserParamError extends Error {
  constructor(param: string) {
    super(`${param} must be provided`);
  }
}
