import type { Config } from 'jest';

/**
 * Dependencies
 * - jest
 * - ts-jest
 * - ts-node
 */

const config: Config = {
  bail: true,
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testMatch: ['**/tests/**/*.test.ts'],
};

export default config;
