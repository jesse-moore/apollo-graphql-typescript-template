module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: ['./tsconfig.eslint.json'],
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  rules: {
    'no-console': ['warn', { allow: ['info', 'error'] }],
    quotes: ['error', 'single'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_', args: 'after-used' },
    ],
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 0,
    'object-curly-newline': [
      'warn',
      {
        ObjectPattern: { multiline: true },
        ImportDeclaration: 'never',
        ExportDeclaration: { multiline: true, minProperties: 3 },
      },
    ],
  },
};
