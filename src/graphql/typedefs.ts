import { gql } from 'apollo-server';

export default gql`
  scalar PerPage
  scalar Odd
  """
  Description for Query
  """
  type Query {
    """
    Returns string 'Hello World'
    """
    helloWorld: String!
    integer(integer: PerPage!): Int!
    odd(integer: Odd!): Int!
  }
`;
