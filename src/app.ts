import express from 'express';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(errorHandler);

export { app };
