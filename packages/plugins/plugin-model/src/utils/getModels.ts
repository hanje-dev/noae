import { utils } from 'noae';
import { getValidFiles } from './index';

export function getModels(cwd: string, pattern?: string) {
  const files = utils.glob
    .sync(pattern || '**/*.{ts,tsx,js,jsx}', {
      cwd,
    })
    .filter(
      (file: string) =>
        !file.endsWith('.d.ts') &&
        !file.endsWith('.test.js') &&
        !file.endsWith('.test.jsx') &&
        !file.endsWith('.test.ts') &&
        !file.endsWith('.test.tsx')
    );

  return getValidFiles(files, cwd);
}
