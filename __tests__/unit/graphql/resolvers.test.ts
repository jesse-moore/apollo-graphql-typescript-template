import { expect } from 'chai';
import { ApolloServer, gql } from 'apollo-server';
import apolloServer from '../../../src/apollo';
import schema from '../../../src/graphql';

let server: ApolloServer;
beforeEach(async () => {
  server = await apolloServer.startServer(schema, 4000);
});

describe('Query Resolvers', () => {
  describe('helloWorld', () => {
    it('helloWorld should return "Hello World"', async () => {
      const res = await server.executeOperation({
        query: gql`
          query HelloWorld {
            helloWorld
          }
        `,
      });
      expect(res.errors).to.be.undefined;
      expect(res.data?.helloWorld).to.be.equal('Hello World');
    });
  });

  describe('integer', () => {
    it('integer should return integer', async () => {
      const res = await server.executeOperation({
        query: gql`
          query Integer($integer: PerPage!) {
            integer(integer: $integer)
          }
        `,
        variables: { integer: 10 },
      });
      expect(res.errors).to.be.undefined;
      expect(res.data?.integer).to.be.equal(10);
    });
    it('integer should throw error if over max threshold', async () => {
      const res = await server.executeOperation({
        query: gql`
          query Integer($integer: PerPage!) {
            integer(integer: $integer)
          }
        `,
        variables: { integer: 26 },
      });
      if (res.errors === undefined) throw new Error('errors is undefined');
      expect(res.errors[0].message).to.include('Provided value is greater than 25');
      expect(res.data).to.be.undefined;
    });
    it('integer should throw error if not provided an integer', async () => {
      const res = await server.executeOperation({
        query: gql`
          query Integer($integer: PerPage!) {
            integer(integer: $integer)
          }
        `,
        variables: { integer: 'h' },
      });
      if (res.errors === undefined) throw new Error('errors is undefined');
      expect(res.errors[0]?.message).to.include('h is not an integer');
      expect(res.data).to.be.undefined;
    });
  });
});

afterEach(async () => {
  await server.stop();
});
