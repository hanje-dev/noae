import { Compiler } from '@noaejs/deps/compiled/webpack';
// @ts-ignore
import { RawSource } from '@noaejs/deps/compiled/webpack-sources2';
import { MF_VA_PREFIX } from './constants';

export class RuntimePublicPathPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap('RuntimePublicPathPlugin', (compilation): any => {
      // @ts-ignore
      compilation.hooks.processAssets.tap('RuntimePublicPathPlugin', () => {
        const s = compilation.getAsset(`${MF_VA_PREFIX}remoteEntry.js`);
        if (s) {
          compilation.updateAsset(`${MF_VA_PREFIX}remoteEntry.js`, () => {
            return new RawSource(
              s.source
                .source()
                .toString()
                .replace(
                  `__webpack_require__.p = "/";`,
                  `__webpack_require__.p = window.publicPath;`
                )
            );
          });
        }
      });
    });
  }
}
