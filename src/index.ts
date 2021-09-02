import { ApolloServer } from 'apollo-server';
import { GraphQLSchema } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import schema from './graphql';
import config from './config';

async function startApolloServer(_schema: GraphQLSchema) {
  const server = new ApolloServer({
    schema: _schema,
    context: async ({ req }): Promise<{ user: { username?: string } }> => {
      const token = req.headers.authorization;
      const user = { username: token };
      return { user };
    },
    validationRules: [depthLimit(10)],
  });
  const { url } = await server.listen({ port: config.SERVER_PORT });
  console.info(`🚀 Server ready at ${url}`);
}

startApolloServer(schema);
