/**
 * Map of each city configs to a list of e2e tests that will be run depending on region setting.
 * Used during cypress initialization.
 * Background: Depending on which city config is set, the app will not contain all routes/features in the repo
 * which will make e2e tests for a non-existing page fail.
 */

const allTests = [
  'src/pages/KatasterKI/tests/e2e/profiles.e2e.test.js',
  'src/pages/KatasterKI/tests/e2e/scenes.e2e.test.js',
  'src/pages/KatasterKI/tests/e2e/z_landing.e2e.test.js',
  'src/pages/Map/tests/planungen.e2e.test.js',
  'src/pages/Reports/tests/form.e2e.test.js',
  'src/pages/Reports/tests/landing.e2e.test.js',
  'src/pages/Reports/tests/map.e2e.test.js'
];
const mapCityConfigsToTestPools = {
  aachen: allTests,
  berlin: allTests,
  bonn: allTests.filter((path) => path.includes('/Reports'))
};

const getTestWhitelistForCityConfig = (cityConfig) =>
  mapCityConfigsToTestPools[cityConfig] || allTests;

module.exports = {
  getTestWhitelistForCityConfig
};
