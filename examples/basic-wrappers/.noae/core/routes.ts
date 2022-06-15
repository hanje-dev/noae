// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/hanje/frontend/projects/noae/packages/runtime';
import * as noaeExports from './noaeExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "exact": true,
    "component": require('@/pages/index.tsx').default,
    "wrappers": [require('@/wrappers/auth').default]
  },
  {
    "path": "/login",
    "exact": true,
    "component": require('@/pages/login.tsx').default
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
