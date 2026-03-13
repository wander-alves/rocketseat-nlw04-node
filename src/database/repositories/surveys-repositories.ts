import { databaseClient } from '../database-client';
import { Survey } from '../entities/survey';

const surveysRepositories = databaseClient.getRepository(Survey);

export { surveysRepositories };
