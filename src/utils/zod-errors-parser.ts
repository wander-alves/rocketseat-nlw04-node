import type { ZodIssue } from 'zod/v3';

function zodErrorsParser(errors: ZodIssue[]): Record<string, string>[] {
  return errors.map((error) => {
    return {
      [error.path[0]]: error.message,
    };
  });
}

export { zodErrorsParser };
