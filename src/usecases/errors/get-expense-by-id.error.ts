export class ExpenseNotFoundError extends Error {
  constructor() {
    super('Expense not found');
  }
}
