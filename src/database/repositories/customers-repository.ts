import { databaseClient } from '../database-client';
import { Customer } from '../entities/customer';

const customersRepository = databaseClient.getRepository(Customer);

export { customersRepository };
