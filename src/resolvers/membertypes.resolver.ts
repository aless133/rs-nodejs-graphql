import { ApolloContext } from '../apollo';

export const memberTypesResolver = {
  Query: {
    memberTypes: (parent: any, args: any, { dataSources }: ApolloContext, info: any) => {
      return dataSources.memberTypesAPI.getMemberTypes();
    },
    memberType: (parent: any, { id }: { id: string }, { dataSources }: ApolloContext, info: any) => {
      return dataSources.memberTypesAPI.getMemberType(id);
    },
  },
};
