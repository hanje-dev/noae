import { deepmerge, lodash } from '@noaejs/utils';

interface IOpts {
  defaultConfig: any;
  config: any;
}

export default ({ defaultConfig, config }: IOpts) => {
  if (lodash.isPlainObject(defaultConfig) && lodash.isPlainObject(config)) {
    return deepmerge(defaultConfig, config);
  }
  return typeof config !== 'undefined' ? config : defaultConfig;
};
