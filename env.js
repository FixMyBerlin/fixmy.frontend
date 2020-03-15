// central place to read and expose env vars and to assign default values
// TODO: consider move other references of process.env to here

// read env vars
const result = require('dotenv').config();

if (result.error) {
  throw result.error
}
const env = result.parsed;

module.exports = {
  region: env.REGION || 'bonn',
  cypressBrowserWindow: env.CYPRESS_BROWSER_WINDOW
}
