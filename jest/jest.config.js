// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

// Packages from `node_modules` that explicitly need to be transpiled
const esModules = ['common-tags'];

module.exports = {
  // Jest root dir is parent of this config file's dir
  rootDir: '../',

  // These are run before each test file
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.js'],

  // allow putting the mocks folder lower down than root
  // https://github.com/facebook/jest/issues/2726#issuecomment-390625860
  roots: ['<rootDir>/src', '<rootDir>/jest'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(unit|integration).+(spec|test).+(ts|tsx|js)',
  ],
  moduleDirectories: ['node_modules'],

  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  // Import path patterns to ignore during transformation
  // exceptions are added using negative-lookahead by concatenating entries
  // from `esModules`
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!${esModules.join('|')})`,
  ],

  // A map from regular expressions to module names that allow to stub out
  // resources with a single module
  moduleNameMapper: {
    // mock static assets
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$':
      '<rootDir>/jest/mocks/fileMock.js',
    '\\.(css|less)$': '<rootDir>/jest/mocks/styleMock.js',

    // handle webpack aliases
    '^~/(.*)$': '<rootDir>/src/$1',
  },

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Coverage settings
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,ts,tsx}'],
  coveragePathIgnorePatterns: ['node_modules', 'stories.', '.test.'],

  verbose: false,

  globals: {
    'ts-jest': {
      tsConfig: './jest/tsconfig.jest.json',
      // do not type check in unit tests.
      diagnostics: false,
    },
  },
};
