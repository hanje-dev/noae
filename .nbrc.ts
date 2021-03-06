import { readdirSync } from 'fs';
import { join } from 'path';

// utils must build before core
// runtime must build before renderer-react
const headPkgs = ['utils', 'ast', 'runtime', 'core', 'server'];
const tailPkgs = ['noae'];
const otherPkgs = readdirSync(join(__dirname, 'packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgs.includes(pkg) && !tailPkgs.includes(pkg)
);
const pluginPkgs = readdirSync(join(__dirname, 'packages/plugins'));

export default {
  target: 'node',
  cjs: { type: 'babel', lazy: true },
  disableTypeCheck: true,
  // pkgs: [...headPkgs, ...otherPkgs, ...pluginPkgs, ...tailPkgs],
  pkgs: [...pluginPkgs],
};
