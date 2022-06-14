#!/usr/bin/env node

require('v8-compile-cache');

const resolveCwd = require('@noaejs/deps/compiled/resolve-cwd');
const { name, bin } = require('../package.json');

const localCLI = resolveCwd.silent(`${name}/${bin.noae}`);

if (!process.env.USE_GLOBAL_NOAE && localCLI && localCLI !== __filename) {
  const debug = require('@noaejs/utils').createDebug('noae:cli');
  debug('Using local install of noae');
  require(localCLI);
} else {
  require('../lib/cli');
}
