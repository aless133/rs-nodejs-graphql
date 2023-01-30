import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema, idsBodySchema } from '../../utils/reusedSchemas';
import { changeMemberTypeBodySchema } from './schema';
import type { MemberTypeEntity } from '../../utils/DB/entities/DBMemberTypes';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<MemberTypeEntity[]> {
    return fastify.db.memberTypes.findMany();
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<MemberTypeEntity> {
      const memberType = await fastify.db.memberTypes.findOne({ key: 'id', equals: request.params.id });
      if (!memberType) {
        throw fastify.httpErrors.notFound('MemberType not found');
      }
      return memberType;
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeMemberTypeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<MemberTypeEntity> {
      try {
        return await fastify.db.memberTypes.change(request.params.id, request.body);
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
    async function (request, reply): Promise<MemberTypeEntity[]> {
      return await fastify.db.memberTypes.findMany({ key: 'id', equalsAnyOf: request.body.ids });
    }
  );  
};

export default plugin;
