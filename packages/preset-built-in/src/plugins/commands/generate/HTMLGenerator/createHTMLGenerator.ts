import { IApi } from '@noaejs/types';
import { chalk, Generator, mkdirp } from '@noaejs/utils';
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { getHtmlGenerator } from '../../htmlUtils';

export default function ({ api }: { api: IApi }) {
  return class PageGenerator extends Generator {
    // eslint-disable-next-line no-useless-constructor
    constructor(opts: any) {
      super(opts);
    }

    async writing() {
      const html = getHtmlGenerator({ api });
      const content = await html.getContent({
        route: { path: (this.args.path as string) || '/' },
        noChunk: true,
      });
      const targetPath = join(api.paths.absOutputPath!, 'index.html');
      mkdirp.sync(dirname(targetPath));
      console.log(`${chalk.green('Write:')} dist/index.html`);
      writeFileSync(targetPath, content, 'utf-8');
    }
  };
}
