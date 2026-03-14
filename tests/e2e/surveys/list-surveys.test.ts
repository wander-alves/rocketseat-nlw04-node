import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import { app } from '../../../src/app';
import { databaseClient } from '../../../src/database/database-client';
import { surveysRepositories } from '../../../src/database/repositories/surveys-repositories';

describe('[GET] /surveys', () => {
  const httpClient = supertest(app);

  beforeAll(async () => {
    await databaseClient.initialize();
  });
  afterAll(async () => {
    await databaseClient.dropDatabase();
    await databaseClient.destroy();
  });

  test('it should list surveys', async () => {
    const survey1 = surveysRepositories.create({
      title: 'Test 01',
      description: 'A survey about product 01',
    });
    const survey2 = surveysRepositories.create({
      title: 'Test 02',
      description: 'A survey about product 02',
    });

    await surveysRepositories.save(survey1);
    await surveysRepositories.save(survey2);

    const response = await httpClient.get('/surveys').send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Test 01',
          description: 'A survey about product 01',
        }),
        expect.objectContaining({
          title: 'Test 02',
          description: 'A survey about product 02',
        }),
      ]),
    );
  });

  test('it should list paginated surveys', async () => {
    for (let i = 0; i < 20; i++) {
      await surveysRepositories.save(
        surveysRepositories.create({
          title: `Product ${i} survey`,
          description: `A survey about product ${i}`,
        }),
      );
    }

    const response = await httpClient.get('/surveys?page=3').send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Product 18 survey',
        }),
        expect.objectContaining({
          title: 'Product 19 survey',
        }),
      ]),
    );
  });
});
