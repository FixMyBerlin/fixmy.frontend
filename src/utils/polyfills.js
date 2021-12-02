/*
 * All necessary polyfills should be required here
 * */

import 'core-js/stable';
import 'core-js/proposals/iterator-helpers';

import 'regenerator-runtime/runtime';

// we need this because the ky package needs fetch and it does not get added automatically with @babel/preset-env
import 'whatwg-fetch';

// we need this for adding the abort function in fetch used in the reports module
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';

import 'intersection-observer';
