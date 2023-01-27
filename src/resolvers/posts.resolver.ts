import { ApolloContext } from '../apollo';

export const postsResolver = {
  Query: {
    posts: (parent: any,args: any, { dataSources }: ApolloContext, info: any) => {
      return dataSources.postsAPI.getPosts();
    },
    post: (parent: any, { id }: { id: string }, { dataSources }: ApolloContext, info: any) => {
      return dataSources.postsAPI.getPost(id);
    },
  },
};
