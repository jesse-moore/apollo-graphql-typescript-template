import { UserInputError } from 'apollo-server';
import { expect } from 'chai';
import { GraphQLScalarType } from 'graphql';
import generateScalar from '../../../src/graphql/generateScalar';

describe('generateScalar', () => {
  describe('intScalar', () => {
    it('should return a GraphQLScalarType', () => {
      const scalar = generateScalar.intScalar({ name: 'intScalar', description: 'Test Scalar' });
      expect(scalar.name).to.equal('intScalar');
      expect(scalar.description).to.equal('Test Scalar');
      expect(scalar).to.be.instanceOf(GraphQLScalarType);
    });

    it('should parse correct value with min and max options', () => {
      const scalar = generateScalar.intScalar({
        name: 'intScalar',
        description: 'Test Scalar',
        min: 0,
        max: 10,
      });
      expect(scalar).to.be.instanceOf(GraphQLScalarType);
      expect(scalar.parseValue(1)).to.equal(1);
      expect(scalar.parseValue('1')).to.equal(1);
    });

    it('should throw error with incorrect values with min and max options', () => {
      const scalar = generateScalar.intScalar({
        name: 'intScalar',
        description: 'Test Scalar',
        min: 0,
        max: 10,
      });
      expect(scalar).to.be.instanceOf(GraphQLScalarType);
      expect(() => scalar.parseValue(-1)).to.throw(UserInputError);
      expect(() => scalar.parseValue(12)).to.throw(UserInputError);
    });
  });
});
