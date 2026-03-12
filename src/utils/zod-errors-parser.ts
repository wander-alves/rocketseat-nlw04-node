import type { ZodError } from 'zod';

function zodErrorsParser(error: ZodError): Record<string, string>[] {
  const errors = error.issues.map((error) => {
    return {
      [error.path[0]]: error.message,
    };
  });

  return errors;
}

export { zodErrorsParser };
