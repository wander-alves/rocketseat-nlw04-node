import { Router } from 'express';
import { CustomersController } from './controllers/customers-controller';
import { SurveysController } from './controllers/surveys-controller';

const routes = Router();

const customersController = new CustomersController();
const surveysController = new SurveysController();

routes.post('/customers', customersController.create);
routes.get('/customers', customersController.list);

routes.post('/surveys', surveysController.create);
routes.get('/surveys', surveysController.list);

export { routes };
