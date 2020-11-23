// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

// Some vendors publish their sources without transpiling. You need to say
// jest to transpile such files
const esModules = ['common-tags', 'ky'];

module.exports = {
  roots: [
    '<rootDir>/src',
    '<rootDir>/jest', // allow putting the mocks folder lower down than root https://github.com/facebook/jest/issues/2726#issuecomment-390625860
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(unit|integration).+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: './jest/tsconfig.jest.json',
      diagnostics: false, // do not type check in unit tests. https://github.com/kulshekhar/ts-jest/issues/822#issue-372232259
    },
  },

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,ts,tsx}'],
  coveragePathIgnorePatterns: ['node_modules', 'stories.', '.test.'],

  // An array of directory names to be searched recursively up from the
  // requiring module's location
  moduleDirectories: ['node_modules'],

  // A map from regular expressions to module names that allow to stub out
  // resources with a single module
  moduleNameMapper: {
    // mock static assets
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$':
      '<rootDir>/jest/mocks/fileMock.js',
    'images/hbi-stop-icons': '<rootDir>/jest/mocks/fileMock.js',
    // handle webpack aliases
    '^~/(.*)$': '<rootDir>/src/$1',
  },

  // The root directory that Jest should scan for tests and modules within
  rootDir: '../', // since config is not stored in project root

  // A list of paths to modules that run some code to configure or
  // set up the testing framework before each test file in the suite is executed.
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.js'],

  // An array of regexp pattern strings that are matched against all source
  // file paths, matched files will skip transformation
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!${esModules.join('|')})`,
  ],
};
