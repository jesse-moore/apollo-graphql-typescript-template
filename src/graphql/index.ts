import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';
import typeDefs from './typedefs';

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
