import { ApolloContext } from '../apollo';
import { GraphQLObjectType, GraphQLInputObjectType, GraphQLList, GraphQLString, GraphQLID, GraphQLNonNull  } from 'graphql';
import { UserEntity } from '../utils/DB/entities/DBUsers';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    subscribedToUser: { type: new GraphQLList(GraphQLID) },
  },
});

const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const UpdateUserInput = new GraphQLInputObjectType({
  name: 'UpdateUserInput',
  fields: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const createUserMutation = {
  type: UserType,
  args: {
    input: { type: CreateUserInput },
  },
  resolve: (
    _: any,
    { input }: { input: Omit<UserEntity, 'id' | 'subscribedToUserIds'> },
    { dataSources }: ApolloContext
  ) => {
    return dataSources.usersAPI.createUser(input);
  },
};

const updateUserMutation = {
  type: UserType,
  args: {
    input: { type: UpdateUserInput },
  },
  resolve: (
    _: any,
    { id, input }: { id: string, input: Partial<Omit<UserEntity, 'id' | 'subscribedToUserIds'>> },
    { dataSources }: ApolloContext
  ) => {
    return dataSources.usersAPI.updateUser(id, input);
  },
};

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
  Mutation: {
    createUser: (_: any, args: any, context: any) => createUserMutation.resolve(_, args, context),
    updateUser: (_: any, args: any, context: any) => updateUserMutation.resolve(_, args, context),
  },
};
