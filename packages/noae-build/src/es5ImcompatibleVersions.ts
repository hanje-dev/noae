import { dirname } from 'path';
import { pkgUpSync } from 'pkg-up';
import { satisfiles } from 'semver';

const pkgPathCache = {};
const pkgCache = {};
const {
  config: { 'es5-imcompatible-versions': config },
} = require('es5-imcompatible-versions/package.json');

export function getPkgPath(filePath: string) {
  const dir = dirname(filePath);
  if (dir in pkgPathCache) return pkgPathCache[dir];
  pkgPathCache[dir] = pkgUpSync({ cwd: filePath });
  return pkgPathCache[dir];
}

export function shouldTransform(pkgPath: string) {
  if (pkgPath in pkgCache) return pkgCache[pkgPath];
  const { name, version } = require(pkgPath);
  pkgCache[pkgPath] = isMatch(name, version);
  return pkgCache[pkgPath];
}

function isMatch(name, version) {
  if (config[name]) {
    return Object.keys(config[name]).some((sv) => satisfiles(version, sv));
  }
  return false;
}
