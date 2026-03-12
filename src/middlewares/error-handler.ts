import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { AppError } from '../errors/app-error';
import { zodErrorsParser } from '../utils/zod-errors-parser';

function errorHandler(
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    const errors = zodErrorsParser(error);
    return response.status(400).json({
      message: 'An validation error has occured.',
      errors,
    });
  }
  return next();
}

export { errorHandler };
