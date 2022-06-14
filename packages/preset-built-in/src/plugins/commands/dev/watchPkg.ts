import { isPluginOrPreset, PluginType } from '@noaejs/core';
import { chokidar, lodash, winPath } from '@noaejs/utils';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

function getNoaePlugins(opts: { pkg: any }) {
  return Object.keys({
    ...opts.pkg.dependencies,
    ...opts.pkg.devDependencies,
  }).filter((name) => {
    return isPluginOrPreset(PluginType.plugin, name) || isPluginOrPreset(PluginType.preset, name);
  });
}

function getNoaePluginsFromPkgPath(opts: { pkgPath: string }) {
  let pkg = {};
  if (existsSync(opts.pkgPath)) {
    try {
      pkg = JSON.parse(readFileSync(opts.pkgPath, 'utf-8'));
    } catch (e) {}
  }
  return getNoaePlugins({ pkg });
}

export function watchPkg(opts: { cwd: string; onChange: Function }) {
  const pkgPath = join(opts.cwd, 'package.json');
  const plugins = getNoaePluginsFromPkgPath({ pkgPath });
  const watcher = chokidar.watch(pkgPath, {
    ignoreInitial: true,
  });
  watcher.on('all', () => {
    const newPlugins = getNoaePluginsFromPkgPath({ pkgPath });
    if (!lodash.isEqual(plugins, newPlugins)) {
      // 已经重启了，只处理一次就够了
      opts.onChange();
    }
  });
  return () => {
    watcher.close();
  };
}

export function watchPkgs(opts: { cwd: string; onChange: Function }) {
  const unwatchs = [watchPkg({ cwd: opts.cwd, onChange: opts.onChange })];
  if (winPath(opts.cwd) !== winPath(process.cwd())) {
    unwatchs.push(watchPkg({ cwd: process.cwd(), onChange: opts.onChange }));
  }
  return () => {
    unwatchs.forEach((unwatch) => {
      unwatch();
    });
  };
}
