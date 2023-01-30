import { ApolloContext } from '../apollo';
import { CreatePostDTO, ChangePostDTO } from '../datasources/common.rest';

export const postsResolver = {
  Query: {
    posts: (parent: any,args: any, { dataSources }: ApolloContext, info: any) => {
      return dataSources.postsAPI.getPosts();
    },
    post: (parent: any, { id }: { id: string }, { dataSources }: ApolloContext, info: any) => {
      return dataSources.postsAPI.getPost(id);
    },
  },
  Mutation: {
    createPost: (parent: any, { input }: { input: CreatePostDTO }, { dataSources }: ApolloContext) => {
      return dataSources.postsAPI.createPost(input);
    },
    updatePost: (parent: any, { id, input }: { id: string; input: ChangePostDTO }, { dataSources }: ApolloContext) => {
      return dataSources.postsAPI.updatePost(id, input);
    },
  },  
};
