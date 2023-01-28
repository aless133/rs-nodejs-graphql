import { join } from 'path';
import AutoLoad from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import { addSampleData } from './sample-data';

const app: FastifyPluginAsync = async (fastify): Promise<void> => {
  await fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: {},
  });
  await addSampleData(fastify.db);

  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: {},
  });
  
};

export default app;
