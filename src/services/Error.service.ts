export class ErrorService {
  static handleError(error: unknown) {
    if (error instanceof Error) {
      // temporary handling, this would be a good place to toast
      console.error(error.message);
    }
  }
}
