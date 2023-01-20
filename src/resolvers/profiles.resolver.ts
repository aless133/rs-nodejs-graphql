import { ApolloContext } from '../apollo';

export const profilesResolver = {
  Query: {
    profiles: (parent: any, args: any, { dataSources }: ApolloContext, info: any) => {
      return dataSources.profilesAPI.getProfiles();
    },
  },
};
