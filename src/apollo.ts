import { ApolloServer, BaseContext } from '@apollo/server';
import * as typeDefs from './schema.graphql';

const resolvers = {
  Query: {
    books: () => 'qwe',
  },
};

const apollo = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
});
let started = false;
export async function getApollo() {
  if (!started) await apollo.start();
  return apollo;
}
