import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import { app } from '../../../src/app';
import { databaseClient } from '../../../src/database/database-client';

describe('[POST] /surveys', () => {
  const httpClient = supertest(app);

  beforeAll(async () => {
    await databaseClient.initialize();
  });
  afterAll(async () => {
    await databaseClient.dropDatabase();
    await databaseClient.destroy();
  });

  test('it should register a survey with valid data', async () => {
    const response = await httpClient.post('/surveys').send({
      title: 'Você curtiu o Ultramonstrão?',
      description:
        'Recentemente, você adquiriu um dos nossos produtos e queremos saber: O que achou dele?',
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(String),
      title: 'Você curtiu o Ultramonstrão?',
      description:
        'Recentemente, você adquiriu um dos nossos produtos e queremos saber: O que achou dele?',
    });
    expect(Date.parse(response.body.createdAt)).not.toBeNaN();
  });
});
