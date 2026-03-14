import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import { app } from '../../../src/app';
import { databaseClient } from '../../../src/database/database-client';
import { customersRepository } from '../../../src/database/repositories/customers-repository';

describe('[GET] /customers', () => {
  const httpClient = supertest(app);

  beforeAll(async () => {
    await databaseClient.initialize();
  });
  afterAll(async () => {
    await databaseClient.dropDatabase();
    await databaseClient.destroy();
  });

  test('it should list paginated customers', async () => {
    await customersRepository.save(
      customersRepository.create({
        name: 'Customer 01',
        email: 'customer01@email.com',
      }),
    );

    await customersRepository.save(
      customersRepository.create({
        name: 'Customer 02',
        email: 'customer02@email.com',
      }),
    );

    const response = await httpClient.get('/customers').send();

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Customer 01',
        }),
        expect.objectContaining({
          name: 'Customer 02',
        }),
      ]),
    );
  });

  test('it should return a paginated list of customers', async () => {
    for (let i = 0; i <= 9; i++) {
      await customersRepository.save(
        customersRepository.create({
          name: `Customer ${i}`,
          email: `customer${i}@email.com`,
        }),
      );
    }

    const response = await httpClient.get('/customers?page=2').send();

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Customer 8',
        }),
        expect.objectContaining({
          name: 'Customer 9',
        }),
      ]),
    );
  });
});
