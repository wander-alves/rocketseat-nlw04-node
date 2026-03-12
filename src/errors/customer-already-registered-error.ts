import { AppError } from './app-error';

class CustomerAlreadyRegisteredError extends AppError {
  constructor() {
    super();
    this.message = 'This customer is already registered';
    this.statusCode = 401;
  }
}

export { CustomerAlreadyRegisteredError };
