import type { Request, Response } from 'express';
import z from 'zod';
import { customersRepository } from '../database/repositories/customers-repository';
import { CustomerAlreadyRegisteredError } from '../errors/customer-already-registered-error';

class CustomersController {
  async create(request: Request, response: Response) {
    const createCustomerBodySchema = z.object({
      name: z.string().min(3),
      email: z.email(),
    });
    const { name, email } = createCustomerBodySchema.parse(request.body);

    const alreadyRegisteredCustomer = await customersRepository.findOne({
      where: {
        email,
      },
    });

    if (alreadyRegisteredCustomer) {
      throw new CustomerAlreadyRegisteredError();
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);

    return response.status(201).send();
  }
}

export { CustomersController };
