import { ApolloContext } from '../apollo';
import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import { ProfileEntity } from '../utils/DB/entities/DBProfiles';

const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    avatar: { type: new GraphQLNonNull(GraphQLString) },
    sex: { type: new GraphQLNonNull(GraphQLString) },
    birthday: { type: new GraphQLNonNull(GraphQLInt) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    street: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: GraphQLID },
    memberTypeId: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    avatar: { type: new GraphQLNonNull(GraphQLString) },
    sex: { type: new GraphQLNonNull(GraphQLString) },
    birthday: { type: new GraphQLNonNull(GraphQLInt) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    street: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: GraphQLID },
    memberTypeId: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const UpdateProfileInput = new GraphQLInputObjectType({
  name: 'UpdateProfileInput',
  fields: {
    avatar: { type: GraphQLString },
    sex: { type: GraphQLString },
    birthday: { type: GraphQLInt },
    country: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    memberTypeId: { type: GraphQLString },
  },
});

const createProfileMutation = {
  type: ProfileType,
  args: {
    input: { type: CreateProfileInput },
  },
  resolve: (
    _: any,
    { input }: { input: Omit<ProfileEntity, 'id'> },
    { dataSources }: ApolloContext
  ) => {
    return dataSources.profilesAPI.createProfile(input);
  },
};

const updateProfileMutation = {
  type: ProfileType,
  args: {
    input: { type: UpdateProfileInput },
  },
  resolve: (
    _: any,
    { id, input }: { id: string, input: Partial<Omit<ProfileEntity, 'id' | 'userId'>> },
    { dataSources }: ApolloContext
  ) => {
    return dataSources.profilesAPI.updateProfile(id, input);
  },
};

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
  },

  Mutation: {
    createProfile: (_: any, args: any, context: any) => createProfileMutation.resolve(_, args, context),
    updateProfile: (_: any, args: any, context: any) => updateProfileMutation.resolve(_, args, context),
  },

};
