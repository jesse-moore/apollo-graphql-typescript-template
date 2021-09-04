import { UserInputError } from 'apollo-server-core';
import { GraphQLScalarType } from 'graphql';

interface IntScalarOptions {
  min?: number;
  max?: number;
  name: string;
  description: string;
}

const intScalar = (options: IntScalarOptions): GraphQLScalarType => {
  const { name, description, min, max } = options;

  const validateInt = (value: string): number => {
    const valueInt = parseInt(value, 10);
    if (Number.isNaN(valueInt)) throw new UserInputError(`${value} is not an integer`);
    if (max !== undefined && valueInt > max) {
      throw new UserInputError(`Provided value is greater than ${max}`);
    }
    if (min !== undefined && valueInt < min) {
      throw new UserInputError(`Provided value is less than ${min}`);
    }
    return valueInt;
  };

  const scalar = new GraphQLScalarType({
    name,
    description,
    parseValue: validateInt,
    serialize: validateInt,
  });

  return scalar;
};

export default { intScalar };
