import { ApolloServer } from 'apollo-server';
import { GraphQLSchema } from 'graphql';
import depthLimit from 'graphql-depth-limit';

const startServer = async (schema: GraphQLSchema, port: number | string): Promise<ApolloServer> => {
  const server = new ApolloServer({
    schema,
    context: async ({ req }): Promise<{ user: { username?: string } }> => {
      const token = req ? req.headers.authorization : undefined;
      const user = { username: token };
      return { user };
    },
    validationRules: [depthLimit(10)],
  });
  const { url } = await server.listen({ port });
  console.info(`🚀 Server ready at ${url}`);
  return server;
};

export default { startServer };
