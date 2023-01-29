import { ApolloContext } from '../apollo';
import { CreateProfileDTO, ChangeProfileDTO } from '../datasources/common.rest';

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
    createProfile: (parent: any, { input }: { input: CreateProfileDTO }, { dataSources }: ApolloContext) => {
      return dataSources.profilesAPI.createProfile(input);
    },
    updateProfile: (parent: any, { id, input }: { id: string; input: ChangeProfileDTO }, { dataSources }: ApolloContext) => {
      return dataSources.profilesAPI.updateProfile(id, input);
    },    
  },

};
