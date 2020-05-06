module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.tsx?$',
  testPathIgnorePatterns: ['/node_modules/', '(/__tests__/.*|(\\.|/)(test))\\.d.ts$'],
  moduleNameMapper: {
    // react
    '^react$': '<rootDir>/node_modules/react/',
    '^react-dom$': '<rootDir>/node_modules/react-dom/',
    // packages
    '^@domonda/ui(.*)$': '<rootDir>/packages/ui/src$1',
    '^@domonda/form(.*)$': '<rootDir>/packages/form/src$1',
    '^@domonda/react-form(.*)$': '<rootDir>/packages/react-form/src$1',
    '^@domonda/plumb(.*)$': '<rootDir>/packages/plumb/src$1',
    '^@domonda/query-params(.*)$': '<rootDir>/packages/query-params/src$1',
    '^@domonda/react-plumb(.*)$': '<rootDir>/packages/react-plumb/src$1',
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
