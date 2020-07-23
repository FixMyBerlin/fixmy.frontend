// read .env files in node tests
require('dotenv').config();
// make sure window.fetch is defined in node tests
global.fetch = require("node-fetch");

