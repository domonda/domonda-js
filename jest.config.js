module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.tsx?$',
  testPathIgnorePatterns: ['/node_modules/', '(/__tests__/.*|(\\.|/)(test))\\.d.ts$'],
  moduleNameMapper: {
    '^@domonda/ui(.*)$': '<rootDir>/packages/domonda-ui/src/$1',
    '^@domonda/form(.*)$': '<rootDir>/packages/domonda-form/src/$1',
    '^@domonda/react-form(.*)$': '<rootDir>/packages/domonda-react-form/src/$1',
    '^@domonda/plumb(.*)$': '<rootDir>/packages/domonda-plumb/src/$1',
    '^@domonda/query-params(.*)$': '<rootDir>/packages/domonda-query-params/src/$1',
    '^@domonda/react-plumb(.*)$': '<rootDir>/packages/domonda-react-plumb/src/$1',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
      diagnostics: {
        warnOnly: true,
        ignoreCodes: [
          151001, // ts-jest.Errors.ConfigNoModuleInterop
        ],
      },
    },
  },
};
