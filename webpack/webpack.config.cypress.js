/*
 *
 * The cypress code (setup files and test files) needs to be processed with
 * (parts of) our webpack config in order to properly resolve import paths
 * from test files to our code. BUT since we are running tests in payroll in our
 * e2e test CI runs, we need to make sure we are not using CleanWebpackPlugin
 * before those builds, otherwise files requested in Job A will be deleted
 * when job B clears the build folder.
 *
 * https://github.com/FixMyBerlin/fixmy.platform/issues/437
 *
 * Since we actually do not need any of our webpack plugins to process the
 * cypress code, we will set the plugins property to an empty list.
 */

const devConfig = require('./webpack.config.dev');

devConfig.plugins = [];

module.exports = devConfig;
