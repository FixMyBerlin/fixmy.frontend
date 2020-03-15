const env = require('./env.js');

// compile list of e2e tests to run depending on city config stated in env vars
const cityConfig = env.region;

let cypressConfigOverride = '';
if (cityConfig === 'bonn') {
  const ignoredPages = ['Analysis', 'Home', 'KatasterKI'];
  const globs = ignoredPages.map((page) => `**/${page}/**/*`);
  cypressConfigOverride = `--config ignoreTestFiles=${JSON.stringify(globs)}`;
}


// TODO: Update README with updated instructions about how to run/test/build stuff using nps
// usage example: to run the `e2eChrome` script, run nps test.e2e

module.exports = {
  scripts: {
    build: {
      default: 'cross-env NODE_ENV=production webpack',
      bonn: 'nps build'
    },
    default: 'webpack-dev-server',
    lint: 'eslint src',
    test: {
      default: 'jest --verbose --config=jest/jest.config.js',
      watch: 'nps "test -- --watch"',
      coverage: 'nps "test --coverage --collectCoverageFrom=**/state;/*"',
      e2e: `cypress run ${cypressConfigOverride}`,
      e2eChrome: 'nps "e2E -- --browser chrome"',
      e2eDevServer: 'start-server-and-test start http://localhost:8080 test:e2e'
    },
    cypress: 'cypress',
    generateKatasterSchema: './src/pages/KatasterKI/scheme/generate.sh'
  }
};
