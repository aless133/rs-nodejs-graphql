import { ApolloContext } from '../apollo';
import { CreateUserDTO, ChangeUserDTO } from '../datasources/common.rest';

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
      return dataSources.usersAPI.getUsersByIds(parent.subscribedToUserIds);
    },
    userSubscribedTo: (parent: any, args: any, { dataSources }: ApolloContext, info: any) => {
      return dataSources.usersAPI.getFollowing(parent.id);
    },
  },
  Mutation: {
    createUser: (parent: any, { input }: { input: CreateUserDTO }, { dataSources }: ApolloContext) => {
      return dataSources.usersAPI.createUser(input);
    },
    updateUser: (parent: any, { id, input }: { id: string; input: ChangeUserDTO }, { dataSources }: ApolloContext) => {
      return dataSources.usersAPI.updateUser(id, input);
    },
  },
};
