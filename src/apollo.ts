import { ApolloServer } from '@apollo/server';
// import fastifyApollo, { fastifyApolloHandler, ApolloFastifyContextFunction } from '@as-integrations/fastify';
import { ApolloFastifyContextFunction } from '@as-integrations/fastify';
import typeDefs from './schema.graphql';

import { usersResolver } from './resolvers/users.resolver';
import { profilesResolver } from './resolvers/profiles.resolver';
import { UsersAPI } from './datasources/users.rest';
import { ProfilesAPI } from './datasources/profiles.rest';

const resolvers = {
  Query: {
    test: (parent: any, args: any, context: ApolloContext, info: any) => {
      return 'GraphQL online ' + context.dummy;
    },
    ...usersResolver.Query,
    ...profilesResolver.Query,
  },
};

const apollo = new ApolloServer<ApolloContext>({
  typeDefs,
  resolvers,
});
let started = false;

export const getApollo = async () => {
  if (!started) await apollo.start();
  return apollo;
};

export interface ApolloContext {
  dummy: number;
  dataSources: {
    usersAPI:UsersAPI;
    profilesAPI:ProfilesAPI;
  }
}
export const getApolloContext: ApolloFastifyContextFunction<ApolloContext> = async (_request, _reply) => {
  const { cache } = apollo;
  return {
    dummy: 1,
    dataSources: {
      usersAPI: new UsersAPI({ cache }),
      profilesAPI: new ProfilesAPI({ cache }),
    },
  };
};
