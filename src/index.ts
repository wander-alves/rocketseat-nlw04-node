import { app } from './app';
import { env } from './env';

app.listen(env.PORT, env.HOST, () => {
  console.log(`Running on port http://${env.HOST}:${env.PORT}`);
});
