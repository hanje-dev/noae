import { winPath } from '@noaejs/utils';
import { dirname } from 'path';

export const runtimePath = winPath(dirname(require.resolve('@noaejs/runtime/package.json')));
export const renderReactPath = winPath(
  dirname(require.resolve('@noaejs/renderer-react/package.json'))
);
