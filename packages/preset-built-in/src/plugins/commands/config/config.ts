import { IApi } from '@noaejs/types';
import { chalk } from '@noaejs/utils';

export default (api: IApi) => {
  api.registerCommand({
    name: 'config',
    description: 'noae config cli',
    details: `
# List configs
$ noae config list

# List the specific config
$ noae config list --name history
    `.trim(),
    fn({ args }) {
      const command = args._[0];
      switch (command) {
        case 'list':
          list();
          break;
        default:
          throw new Error(`Unsupported sub command ${command} for noae config.`);
      }

      function list() {
        const getValue = (value: any) => {
          if (typeof value !== 'function') {
            return value;
          }
          return chalk.yellow('The value data type does not support the view');
        };
        const print = (key: string) => {
          console.log(` - ${chalk.blue(`[key: ${key}]`)}`, getValue(api.config[key]));
          console.log();
        };
        console.log();
        console.log(`  Configs:`);
        console.log();
        if (args.name) {
          if (!api.config[args.name as string]) {
            // current key not existed
            throw new Error(`key ${args.name} not found`);
          }
          print(args.name as string);
        } else {
          // list all
          Object.keys(api.config).forEach((key) => {
            print(key);
          });
        }

        console.log();
      }
    },
  });
};
