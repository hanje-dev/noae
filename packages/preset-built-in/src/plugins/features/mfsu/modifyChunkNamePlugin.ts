import { Compiler } from '@noaejs/deps/compiled/webpack';

const pluginId = 'ModifyChunkNamePlugin';
class ModifyChunkNamePlugin {
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(pluginId, (compilation): any => {
      compilation.hooks.afterOptimizeChunkIds.tap(pluginId, (chunks: any) => {
        for (const chunk of chunks) {
          // @ts-ignore
          chunk.id = 'mf-dep_' + chunk.id;
          chunk.ids = [chunk.id!];
        }
      });
    });
  }
}

export default ModifyChunkNamePlugin;
