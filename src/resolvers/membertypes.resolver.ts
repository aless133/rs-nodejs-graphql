import { ApolloContext } from '../apollo';
import { ChangeMemberTypeDTO } from '../datasources/common.rest';

export const memberTypesResolver = {
  Query: {
    memberTypes: (parent: any, args: any, { dataSources }: ApolloContext, info: any) => {
      return dataSources.memberTypesAPI.getMemberTypes();
    },
    memberType: (parent: any, { id }: { id: string }, { dataSources }: ApolloContext, info: any) => {
      return dataSources.memberTypesAPI.getMemberType(id);
    },
  },
  Mutation: {
    updateMemberType: (parent: any, { id, input }: { id: string; input: ChangeMemberTypeDTO }, { dataSources }: ApolloContext) => {
      return dataSources.memberTypesAPI.updateMemberType(id, input);
    },
  },    
};
