import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import { app } from '../../../src/app';
import { databaseClient } from '../../../src/database/database-client';

describe('[POST] /customers', () => {
  const httpClient = supertest(app);

  beforeAll(async () => {
    await databaseClient.initialize();
  });
  afterAll(async () => {
    await databaseClient.dropDatabase();
    await databaseClient.destroy();
  });

  test('it should register a customer with valid data', async () => {
    const response = await httpClient.post('/customers').send({
      name: 'John Doe',
      email: 'john.doe@email.com',
    });
    expect(response.status).toBe(201);
  });

  test('it should not register a customer without name', async () => {
    const response = await httpClient.post('/customers').send({
      email: 'john.doe@email.com',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'An validation error has occured.',
      errors: expect.arrayContaining([
        {
          name: expect.any(String),
        },
      ]),
    });
  });

  test('it should not register a customer without email', async () => {
    const response = await httpClient.post('/customers').send({
      name: 'John Doe',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'An validation error has occured.',
      errors: expect.arrayContaining([
        {
          email: expect.any(String),
        },
      ]),
    });
  });
});
