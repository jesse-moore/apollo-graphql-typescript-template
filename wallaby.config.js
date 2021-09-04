module.exports = function (wallaby) {
  process.env.NODE_ENV = 'test';
  return {
    files: ['src/**/*.*'],

    tests: ['__tests__/unit/**/*test.ts'],
    env: {
      type: 'node',
      runner: 'node',
    },
    setup: (wallaby) => {
      const chai = require('chai');
      chai.should();

      global.expect = require('chai').expect;
    },
    testFramework: 'mocha',
    filesWithNoCoverageCalculated: [],
    runMode: 'onsave',
    trace: true,
  };
};
