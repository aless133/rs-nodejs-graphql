import { ApolloContext } from '../apollo';

export const usersResolver = {
  Query: {
    users: (parent: any, args: any, { dataSources }: ApolloContext, info: any) => {
      return dataSources.usersAPI.getUsers();
    },
  },
  // User: {
  //   profile: (parent: any, args: any, { dataSources }: ApolloContext, info: any) => {
  //     return dataSources.profilesAPI.getProfile(parent.);
  //   },
  // }
};
