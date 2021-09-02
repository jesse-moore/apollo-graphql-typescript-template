module.exports = function (wallaby) {
  const path = require('path');
  process.env.NODE_PATH += path.delimiter + path.join(wallaby.localProjectDir, 'functions', 'node_modules');
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
