"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModels = getModels;

function _noae() {
  const data = require("noae");

  _noae = function _noae() {
    return data;
  };

  return data;
}

var _index = require("./index");

function getModels(cwd, pattern) {
  const files = _noae().utils.glob.sync(pattern || '**/*.{ts,tsx,js,jsx}', {
    cwd
  }).filter(file => !file.endsWith('.d.ts') && !file.endsWith('.test.js') && !file.endsWith('.test.jsx') && !file.endsWith('.test.ts') && !file.endsWith('.test.tsx'));

  return (0, _index.getValidFiles)(files, cwd);
}