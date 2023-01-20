import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { graphqlBodySchema } from './schema';
import { fastifyApolloHandler } from '@as-integrations/fastify';
import { getApollo, getApolloContext } from '../../apollo';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.post(
    '/',
    {
      schema: {
        body: graphqlBodySchema,
      },
    },
    fastifyApolloHandler(await getApollo(), { context: getApolloContext })
  );
};

export default plugin;
