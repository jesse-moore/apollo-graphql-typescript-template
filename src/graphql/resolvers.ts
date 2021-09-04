import { QueryResolvers } from './generated';
import generateScalar from './generateScalar';

const Query: QueryResolvers = {
  helloWorld: async (_parent, _args, _context: { user: unknown }, _info) => 'Hello World',
  integer: async (_parent, args) => args.integer,
};

const PerPage = generateScalar.intScalar({
  name: 'PerPage',
  description: 'PerPage custom scalar type',
  min: 1,
  max: 25,
});

// const Mutation: MutationResolvers = {}

export default { Query, PerPage };
