// @ts-ignore
import { IConfigFromPlugins } from '@@/core/pluginConfig';
import { IConfig } from '@noaejs/types';

// IConfig types is prior to IConfigFromPlugins in the same key.
export function defineConfig(config: IConfigFromPlugins | IConfig): IConfigFromPlugins | IConfig {
  return config;
}
