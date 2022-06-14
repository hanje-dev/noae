let ex = require('./lib/cjs');

try {
  const umiExports = require('@@/core/noaeExports');
  ex = Object.assign(ex, umiExports);
} catch (e) {}

module.exports = ex;
