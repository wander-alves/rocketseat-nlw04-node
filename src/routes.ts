import { Router } from 'express';
import { CustomersController } from './controllers/customers-controller';

const routes = Router();

const customersController = new CustomersController();

routes.post('/customers', customersController.create);

export { routes };
