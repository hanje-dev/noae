import { dirname } from 'path';
import pkgUp from 'pkg-up';
import { satisfies } from 'semver';

const pkgPathCache: Record<string, any> = {};
const pkgCache: Record<string, any> = {};
const {
  config: { 'es5-imcompatible-versions': config },
} = require('es5-imcompatible-versions/package.json');

export function getPkgPath(filePath: string) {
  const dir = dirname(filePath);
  if (dir in pkgPathCache) return pkgPathCache[dir];
  pkgPathCache[dir] = pkgUp.sync({ cwd: filePath });
  return pkgPathCache[dir];
}

export function shouldTransform(pkgPath: string) {
  if (pkgPath in pkgCache) return pkgCache[pkgPath];
  const { name, version } = require(pkgPath);
  pkgCache[pkgPath] = isMatch(name, version);
  return pkgCache[pkgPath];
}

function isMatch(name: string, version: string) {
  if (config[name]) {
    return Object.keys(config[name]).some((sv) => satisfies(version, sv));
  }
  return false;
}
