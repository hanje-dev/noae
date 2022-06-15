import { IServiceOpts, Service as CoreService } from '@noaejs/core';
import { dirname } from 'path';

class Service extends CoreService {
  constructor(opts: IServiceOpts) {
    process.env.NOAE_VERSION = require('../package').version;
    process.env.NOAE_DIR = dirname(require.resolve('../package'));

    super({
      ...opts,
      presets: [require.resolve('@noaejs/preset-built-in'), ...(opts.presets || [])],
      plugins: [require.resolve('./plugins/noaeAlias'), ...(opts.plugins || [])],
    });
  }
}

export { Service };
