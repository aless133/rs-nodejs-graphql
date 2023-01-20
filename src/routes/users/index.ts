import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createUserBodySchema, changeUserBodySchema, subscribeBodySchema } from './schemas';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<UserEntity[]> {
    return fastify.db.users.findMany();
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const user = await fastify.db.users.findOne({ key: 'id', equals: request.params.id });
      if (!user) {
        throw fastify.httpErrors.notFound('User not found');
      }
      return user;
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createUserBodySchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      return fastify.db.users.create(request.body);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity | null> {
      try {
        return await fastify.db.users.delete(request.params.id);
      } catch (error) {
        throw fastify.httpErrors.badRequest('User not found');
      }
    }
  );

  fastify.post(
    '/:id/subscribeTo',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity | null> {
      const user = await fastify.db.users.findOne({ key: 'id', equals: request.params.id });
      if (user) {
        if (await fastify.db.users.findOne({ key: 'id', equals: request.body.userId })) {
          if (user.subscribedToUserIds.includes(request.body.userId)) {
            return user;
          } else {
            return fastify.db.users.change(request.params.id, {
              subscribedToUserIds: [...user.subscribedToUserIds, request.body.userId],
            });
          }
        } else {
          throw fastify.httpErrors.badRequest('Subscriber not found');
        }
      } else {
        throw fastify.httpErrors.notFound('User not found');
      }
    }
  );

  fastify.post(
    '/:id/unsubscribeFrom',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity | null> {
      const user = await fastify.db.users.findOne({ key: 'id', equals: request.params.id });
      if (user) {
        if (await fastify.db.users.findOne({ key: 'id', equals: request.body.userId })) {
          const i = user.subscribedToUserIds.indexOf(request.body.userId);
          if (i >= 0) {
            user.subscribedToUserIds.splice(i, 1);
            return fastify.db.users.change(request.params.id, { subscribedToUserIds: user.subscribedToUserIds });
          } else {
            throw fastify.httpErrors.badRequest('Not subscribed');
          }
        } else {
          throw fastify.httpErrors.badRequest('Subscriber not found');
        }
      } else {
        throw fastify.httpErrors.notFound('User not found');
      }
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeUserBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      try {
        return await fastify.db.users.change(request.params.id, request.body);
      } catch (error) {
        throw fastify.httpErrors.badRequest(error as string);
      }
    }
  );
};

export default plugin;
