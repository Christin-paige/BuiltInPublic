export class ValidationError extends Error {
  constructor(
    message: string,
    public validationErrors: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}
