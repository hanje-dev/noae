import { IApi } from '@noaejs/types';
import { chalk } from '@noaejs/utils';

export default (api: IApi) => {
  api.registerCommand({
    name: 'plugin',
    description: 'inspect noae plugins',
    details: `
# List plugins
$ noae plugin list

# List plugins with key
$ noae plugin list --key
    `.trim(),
    fn({ args }) {
      const command = args._[0];

      if (!command) {
        throw new Error(`
Sub command not found: noae plugin
Did you mean:
  noae plugin list
        `);
      }

      switch (command) {
        case 'list':
          list();
          break;
        default:
          throw new Error(`Unsupported sub command ${command} for noae plugin.`);
      }

      function list() {
        console.log();
        console.log(`  Plugins:`);
        console.log();
        Object.keys(api.service.plugins).forEach((pluginId) => {
          const plugin = api.service.plugins[pluginId];
          const keyStr = args.key ? ` ${chalk.blue(`[key: ${[plugin.key]}]`)}` : '';
          const isPresetStr = plugin.isPreset ? ` ${chalk.green('(preset)')}` : '';
          console.log(`    - ${plugin.id}${keyStr}${isPresetStr}`);
        });
        console.log();
      }
    },
  });
};
