import { ApolloContext } from '../apollo';

export const usersResolver = {
  Query: {
    users: (parent: any, args: any, { dataSources }: ApolloContext, info: any) => {
      return dataSources.usersAPI.getUsers();
    },
    user: (parent: any, { id }: { id: string }, { dataSources }: ApolloContext, info: any) => {
      return dataSources.usersAPI.getUser(id);
    },
  },
  User: {
    profile: (parent: any, args: any, { dataSources }: ApolloContext, info: any) => {
      return dataSources.usersAPI.getProfile(parent.id);
    },
    posts: (parent: any, args: any, { dataSources }: ApolloContext, info: any) => {
      return dataSources.usersAPI.getPosts(parent.id);
    },
    subscribedToUser: (parent: any, args: any, { dataSources }: ApolloContext, info: any) => {
      return dataSources.usersAPI.getFollowers(parent.id);
    },
    userSubscribedTo: (parent: any, args: any, { dataSources }: ApolloContext, info: any) => {
      return dataSources.usersAPI.getFollowing(parent.id);
    },
  },
};
