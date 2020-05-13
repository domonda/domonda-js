module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.tsx?$',
  testPathIgnorePatterns: ['/node_modules/', '(/__tests__/.*|(\\.|/)(test))\\.d.ts$'],
  moduleNameMapper: {
    '^@domonda/(.*)/(.*)$': '<rootDir>/packages/$1/src/$2',
    '^@domonda/(.*)$': '<rootDir>/packages/$1/src',
  },
};
