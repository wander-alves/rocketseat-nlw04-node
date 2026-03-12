import { app } from './app';
import { databaseClient } from './database/database-client';
import { env } from './env';

try {
  databaseClient.initialize();
} catch (error) {
  console.error(error);
}

app.listen(env.PORT, env.HOST, () => {
  console.log(`Running on port http://${env.HOST}:${env.PORT}`);
});
