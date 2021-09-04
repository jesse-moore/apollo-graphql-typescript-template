import { expect } from 'chai';
import { gql } from 'apollo-server';
import sinon, { SinonSandbox } from 'sinon';
import request from 'supertest';
import apolloServer from '../../../src/apollo';
import schema from '../../../src/graphql';

let sandbox: SinonSandbox;
beforeEach(async () => {
  sandbox = sinon.createSandbox();
});

describe('Apollo Server', () => {
  describe('init', () => {
    it('should start', async () => {
      const consoleStub = sandbox.stub(console, 'info');
      const server = await apolloServer.startServer(schema, 4001);
      expect(consoleStub.calledOnce).to.be.true;
      expect(consoleStub.calledWith('🚀 Server ready at http://localhost:4001/')).to.be.true;
      await server.stop();
    });
  });
  describe('context', () => {
    it('should be called with correct arguments', async () => {
      const server = await apolloServer.startServer(schema, 4002);
      const HELLO_WORLD = gql`
        query HelloWorld {
          helloWorld
        }
      `;
      const test = await server.executeOperation({
        query: HELLO_WORLD,
      });
      expect(test.data).to.not.be.undefined;
      expect(test.errors).to.be.undefined;
      await server.stop();
    });
  });
});

describe('context', () => {
  it('should be return context', async () => {
    const server = await apolloServer.startServer(schema, 4003);

    const res = await request('http://localhost:4003/').post('graphql').send({
      query: 'query HelloWorld{helloWorld}',
      operationName: 'HelloWorld',
    });
    expect(res.status).to.be.equal(200);
    expect(res.body.data).to.not.be.undefined;
    await server.stop();
  });
});

afterEach(async () => {
  sandbox.restore();
});
