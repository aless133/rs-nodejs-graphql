import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema, idsBodySchema } from '../../utils/reusedSchemas';
import { createUserBodySchema, changeUserBodySchema, subscribeBodySchema } from './schemas';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';
import type { ProfileEntity } from '../../utils/DB/entities/DBProfiles';
import type { PostEntity } from '../../utils/DB/entities/DBPosts';

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

  fastify.get(
    '/:id/profile',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const profile = await fastify.db.profiles.findOne({ key: 'userId', equals: request.params.id });
      if (!profile) {
        throw fastify.httpErrors.notFound('User profile not found');
      }
      return profile;
    }
  );  

  fastify.get(
    '/:id/posts',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<PostEntity[]> {
      return await fastify.db.posts.findMany({ key: 'userId', equals: request.params.id });
    }
  );   

  fastify.get(
    '/:id/following',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity[]> {
      const user = await fastify.db.users.findOne({ key: 'id', equals: request.params.id });
      if (!user) {
        throw fastify.httpErrors.notFound('User not found');
      }
      return await fastify.db.users.findMany({ key: 'id', equalsAnyOf: user.subscribedToUserIds });
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
      const profile = await fastify.db.profiles.findOne({ key: 'userId', equals: request.params.id });
      if (profile) {
        await fastify.db.profiles.delete(profile.id);
      }

      const posts = await fastify.db.posts.findMany({ key: 'userId', equals: request.params.id });
      if (posts) {
        posts.forEach(async (post) => {
          await fastify.db.posts.delete(post.id);
        });
      }

      const subs = await fastify.db.users.findMany({ key: 'subscribedToUserIds', inArray: request.params.id });
      if (subs) {
        subs.forEach(async (sub) => {
          const i = sub.subscribedToUserIds.indexOf(request.params.id);
          sub.subscribedToUserIds.splice(i, 1);
          fastify.db.users.change(sub.id, { subscribedToUserIds: sub.subscribedToUserIds });
        });
      }   
         
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
        const user2 = await fastify.db.users.findOne({ key: 'id', equals: request.body.userId });
        if (user2) {
          if (user2.subscribedToUserIds.includes(request.params.id)) {
            return user2;
          } else {
            return fastify.db.users.change(user2.id, {
              subscribedToUserIds: [...user2.subscribedToUserIds, user.id],
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
        const user2 = await fastify.db.users.findOne({ key: 'id', equals: request.body.userId });
        if (user2) {
          const i = user2.subscribedToUserIds.indexOf(user.id);
          if (i >= 0) {
            user2.subscribedToUserIds.splice(i, 1);
            return fastify.db.users.change(user2.id, { subscribedToUserIds: user2.subscribedToUserIds });
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

  fastify.post(
    '/byids',
    {
      schema: {
        body: idsBodySchema,
      },
    },
    async function (request, reply): Promise<UserEntity[]> {
      console.log(request.body);
      return await fastify.db.users.findMany({ key: 'id', equalsAnyOf: request.body.ids });
    }
  );  
};

export default plugin;
