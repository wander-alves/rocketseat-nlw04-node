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

  async list(request: Request, response: Response) {
    const customerParamSchema = z.object({
      page: z.coerce.number().optional().default(1),
    });

    const { page } = customerParamSchema.parse(request.query);

    const customers = await customersRepository.find({
      skip: (page - 1) * 10,
      take: 10,
    });

    return response.json(customers);
  }
}

export { CustomersController };
