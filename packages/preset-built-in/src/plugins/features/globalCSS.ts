import { IApi } from '@noaejs/types';
import { createDebug } from '@noaejs/utils';
import { relative } from 'path';
import { getGlobalFile } from '../utils';

const debug = createDebug('noae:preset-build-in:global-css');

export default (api: IApi) => {
  const {
    paths,
    utils: { winPath },
  } = api;
  const { absSrcPath = '', absTmpPath = '' } = paths;
  const files = [
    'global.css',
    'global.less',
    'global.scss',
    'global.sass',
    'global.styl',
    'global.stylus',
  ];
  const globalCSSFile = getGlobalFile({ absSrcPath, files });
  debug('globalCSSFile', globalCSSFile);

  api.addEntryCodeAhead(
    () =>
      `${globalCSSFile.map((file) => `import '${winPath(relative(absTmpPath, file))}';`).join('')}`
  );
};
