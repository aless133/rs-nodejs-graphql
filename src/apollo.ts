import { ApolloServer } from '@apollo/server';
import { ApolloFastifyContextFunction } from '@as-integrations/fastify';
import depthLimit from 'graphql-depth-limit'
import typeDefs from './schema.graphql';

import { usersResolver } from './resolvers/users.resolver';
import { profilesResolver } from './resolvers/profiles.resolver';
import { postsResolver } from './resolvers/posts.resolver';
import { memberTypesResolver } from './resolvers/membertypes.resolver';

import { UsersAPI } from './datasources/users.rest';
import { ProfilesAPI } from './datasources/profiles.rest';
import { PostsAPI } from './datasources/posts.rest';
import { MemberTypesAPI } from './datasources/membertypes.rest';

const resolvers = {
  Query: {
    time: (parent: any, args: any, context: ApolloContext, info: any) => {
      return 'GraphQL online ' + context.time;
    },
    ...usersResolver.Query,
    ...profilesResolver.Query,
    ...postsResolver.Query,
    ...memberTypesResolver.Query,
  },
  User: usersResolver.User,
  Profile: profilesResolver.Profile,
  Mutation: {
    ...usersResolver.Mutation,
    ...profilesResolver.Mutation,
  },
};

const apollo = new ApolloServer<ApolloContext>({
  typeDefs,
  resolvers,
  validationRules:[depthLimit(6)],
});
let started = false;

export const getApollo = async () => {
  if (!started) await apollo.start();
  return apollo;
};

export interface ApolloContext {
  time: string;
  dataSources: {
    usersAPI: UsersAPI;
    profilesAPI: ProfilesAPI;
    postsAPI: PostsAPI;
    memberTypesAPI: MemberTypesAPI;
  };
}
export const getApolloContext: ApolloFastifyContextFunction<ApolloContext> = async (_request, _reply) => {
  const { cache } = apollo;
  return {
    time: new Date().toUTCString(),
    dataSources: {
      usersAPI: new UsersAPI({ cache }),
      profilesAPI: new ProfilesAPI({ cache }),
      postsAPI: new PostsAPI({ cache }),
      memberTypesAPI: new MemberTypesAPI({ cache }),
    },
  };
};
