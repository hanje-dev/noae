import { IApi } from '@noaejs/types';
import { lodash, winPath } from '@noaejs/utils';
import assert from 'assert';

const reserveLibrarys = ['noae']; // reserve library
const reserveExportsNames = [
  'Link',
  'NavLink',
  'Redirect',
  'dynamic',
  'router',
  'withRouter',
  'Route',
];

interface INoaeExport {
  source: string;
  exportAll?: boolean;
  specifiers?: any[];
}

export function generateExports({
  item,
  noaeExportsHook,
}: {
  item: INoaeExport;
  noaeExportsHook: object;
}) {
  assert(item.source, 'source should be supplied.');
  assert(item.exportAll || item.specifiers, 'exportAll or specifiers should be supplied.');
  assert(
    !reserveLibrarys.includes(item.source),
    `${item.source} is reserve library, Please don't use it.`
  );
  if (item.exportAll) {
    return `export * from '${winPath(item.source)}';`;
  }
  assert(
    Array.isArray(item.specifiers),
    `specifiers should be Array, but got ${item.specifiers!.toString()}.`
  );
  const specifiersStrArr = item.specifiers!.map((specifier: any) => {
    if (typeof specifier === 'string') {
      assert(
        !reserveExportsNames.includes(specifier),
        `${specifier} is reserve name, you can use 'exported' to set alias.`
      );
      assert(
        !noaeExportsHook[specifier],
        `${specifier} is Defined, you can use 'exported' to set alias.`
      );
      noaeExportsHook[specifier] = true;
      return specifier;
    }
    assert(
      lodash.isPlainObject(specifier),
      `Configure item context should be Plain Object, but got ${specifier}.`
    );
    assert(specifier.local && specifier.exported, 'local and exported should be supplied.');
    return `${specifier.local} as ${specifier.exported}`;
  });
  return `export { ${specifiersStrArr.join(', ')} } from '${winPath(item.source)}';`;
}

export default function (api: IApi) {
  api.onGenerateFiles(async () => {
    const noaeExports = await api.applyPlugins({
      key: 'addNoaeExports',
      type: api.ApplyPluginsType.add,
      initialValue: [],
    });

    const noaeExportsHook = {}; // repeated definition
    api.writeTmpFile({
      path: 'core/noaeExports.ts',
      content:
        noaeExports
          .map((item: INoaeExport) => {
            return generateExports({
              item,
              noaeExportsHook,
            });
          })
          .join('\n') + `\n`,
    });
  });
}
