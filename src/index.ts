// /ignore file coverage/
import apolloServer from './apollo';
import schema from './graphql';
import config from './config';

if (config.SERVER_PORT === undefined || Number.isNaN(config.SERVER_PORT)) {
  throw new Error(`Invalid port number: ${config.SERVER_PORT}`);
}

apolloServer.startServer(schema, config.SERVER_PORT);
