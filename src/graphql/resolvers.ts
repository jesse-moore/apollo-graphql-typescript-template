// import { AuthenticationError, UserInputError } from 'apollo-server'
import { UserInputError } from 'apollo-server';
import { GraphQLScalarType, Kind } from 'graphql';
import { QueryResolvers } from './generated';

const Query: QueryResolvers = {
  helloWorld: async (_parent, _args, _context: { user: unknown }, _info) => 'Hello World',
  integer: async (_parent, args) => args.integer,
  odd: async (_parent, args) => args.integer,
};

const parsePage = (value: string) => {
  const valueInt = parseInt(value, 10);
  if (valueInt > 25) throw new UserInputError('Provided value is greater than 25');
  return valueInt;
};

const PerPage = new GraphQLScalarType({
  name: 'PerPage',
  description: 'PerPage custom scalar type',
  parseValue: parsePage,
  serialize: parsePage,
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parsePage(ast.value);
    }
    throw new UserInputError('Provided value is not an integer');
  },
});

// const Mutation: MutationResolvers = {}

export default { Query, PerPage };
