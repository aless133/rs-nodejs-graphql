import { ApolloContext } from '../apollo';

export const profilesResolver = {
  Query: {
    profiles: (parent: any, args: any, { dataSources }: ApolloContext, info: any) => {
      return dataSources.profilesAPI.getProfiles();
    },
    profile: (parent: any, { id }: { id: string }, { dataSources }: ApolloContext, info: any) => {
      return dataSources.profilesAPI.getProfile(id);
    },
  },

  Profile: {
    memberType: (parent: any, args: any, { dataSources }: ApolloContext, info: any) => {
      return dataSources.memberTypesAPI.getMemberType(parent.memberTypeId);
    },
  }
};
