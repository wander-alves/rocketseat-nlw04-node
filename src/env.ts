import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['prod', 'dev', 'test']).optional().default('dev'),
  PORT: z.coerce.number().optional().default(3333),
  HOST: z.string().optional().default('0.0.0.0'),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWD: z.string(),
  POSTGRES_DB: z.string(),
});

const env = envSchema.parse(process.env);

export { env };
