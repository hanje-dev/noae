import { mergeConfig } from '@noaejs/utils';
import { dirname } from 'path';

interface IImportPluginOpts {
  libraryName: string;
  libraryDirectory?: string;
  style?: boolean;
  camel2DashComponentName?: boolean;
}

export interface IOpts {
  typescript?: boolean;
  react?: object;
  debug?: boolean;
  env?: object;
  transformRuntime?: object;
  reactRemovePropTypes?: boolean;
  reactRequire?: boolean;
  dynamicImportNode?: boolean;
  importToAwaitRequire?: object;
  autoCSSModules?: boolean;
  svgr?: object;
  import?: IImportPluginOpts[];
  lockCoreJS3?: object;
  modify?: Function;
  noAnonymousDefaultExport?: boolean;
}

function toObject<T extends object>(obj: T | boolean): T | Partial<T> {
  return typeof obj === 'object' ? obj : {};
}

export default (context: any, opts: IOpts = {}) => {
  const defaultEnvConfig = {
    exclude: [
      'transform-typeof-symbol',
      'transform-sticky-regex',
      'transform-new-target',
      'transform-modules-umd',
      'transform-modules-systemjs',
      'transform-modules-amd',
      'transform-literals',
    ],
  };
  const preset = {
    presets: [
      opts.env && [
        require('@noaejs/deps/compiled/babel/preset-env').default,
        {
          ...mergeConfig(defaultEnvConfig, toObject(opts.env)),
          debug: opts.debug,
        },
      ],
      opts.react && [
        require('@noaejs/deps/compiled/babel/preset-react').default,
        toObject(opts.react),
      ],
      opts.typescript && [
        require('@noaejs/deps/compiled/babel/preset-typescript').default,
        {
          // https://babeljs.io/docs/en/babel-plugin-transform-typescript#impartial-namespace-support
          allowNamespaces: true,
        },
      ],
    ].filter(Boolean),
    plugins: [
      // https://github.com/webpack/webpack/issues/10227
      [
        require('@noaejs/deps/compiled/babel/plugin-proposal-optional-chaining').default,
        {
          loose: false,
        },
      ],
      // https://github.com/webpack/webpack/issues/10227
      [
        require('@noaejs/deps/compiled/babel/plugin-proposal-nullish-coalescing-operator').default,
        { loose: false },
      ],
      require('@noaejs/deps/compiled/babel/plugin-syntax-top-level-await').default,
      // Necessary to include regardless of the environment because
      // in practice some other transforms (such as object-rest-spread)
      // don't work without it: https://github.com/babel/babel/issues/7215
      [
        require('@noaejs/deps/compiled/babel/plugin-transform-destructuring').default,
        { loose: false },
      ],
      // https://www.npmjs.com/package/babel-plugin-transform-typescript-metadata#usage
      // should be placed before @babel/plugin-proposal-decorators.
      opts.typescript && [
        require.resolve('@noaejs/deps/compiled/babel/babel-plugin-transform-typescript-metadata'),
      ],
      [
        require('@noaejs/deps/compiled/babel/plugin-proposal-decorators').default,
        {
          legacy: true,
        },
      ],
      [
        require('@noaejs/deps/compiled/babel/plugin-proposal-class-properties').default,
        {
          loose: true,
        },
      ],
      [
        require('@noaejs/deps/compiled/babel/plugin-proposal-private-methods').default,
        {
          loose: true,
        },
      ],
      [
        require('@noaejs/deps/compiled/babel/plugin-proposal-private-property-in-object').default,
        {
          loose: true,
        },
      ],
      require('@noaejs/deps/compiled/babel/plugin-proposal-export-default-from').default,
      [
        require('@noaejs/deps/compiled/babel/plugin-proposal-pipeline-operator').default,
        {
          proposal: 'minimal',
        },
      ],
      require('@noaejs/deps/compiled/babel/plugin-proposal-do-expressions').default,
      require('@noaejs/deps/compiled/babel/plugin-proposal-function-bind').default,
      require('@noaejs/deps/compiled/babel/plugin-proposal-logical-assignment-operators').default,
      opts.transformRuntime && [
        require('@noaejs/deps/compiled/babel/plugin-transform-runtime').default,
        {
          version: require('@babel/runtime/package.json').version,
          // https://babeljs.io/docs/en/babel-plugin-transform-runtime#absoluteruntime
          // lock the version of @babel/runtime
          // make sure we are using the correct version
          // this path will be used by babel like `require.resolve(path, { paths: [absoluteRuntime] })`
          // so we need to place the absolute path of this package
          // refer: https://github.com/babel/babel/blob/v7.16.12/packages/babel-plugin-transform-runtime/src/get-runtime-path/index.ts#L19
          absoluteRuntime: dirname(require.resolve('../package.json')),
          useESModules: true,
          ...toObject(opts.transformRuntime),
        },
      ],
      opts.reactRemovePropTypes && [
        require.resolve(
          '@noaejs/deps/compiled/babel/babel-plugin-transform-react-remove-prop-types'
        ),
        {
          removeImport: true,
        },
      ],
      opts.reactRequire && [
        require.resolve('@noaejs/deps/compiled/babel/babel-plugin-react-require'),
      ],
      opts.dynamicImportNode && [
        require.resolve('@noaejs/deps/compiled/babel/babel-plugin-dynamic-import-node'),
      ],
      opts.svgr && [
        require.resolve('@noaejs/deps/compiled/babel/babel-plugin-named-asset-import'),
        {
          loaderMap: {
            svg: {
              ReactComponent: `${require.resolve(
                '@noaejs/deps/compiled/babel/svgr-webpack'
              )}?-svgo,+titleProp,+ref![path]`,
            },
          },
        },
      ],
      ...(opts.import
        ? opts.import.map((importOpts) => {
            return [
              require.resolve('@noaejs/deps/compiled/babel/babel-plugin-import'),
              importOpts,
              importOpts.libraryName,
            ];
          })
        : []),
      opts.autoCSSModules && [require.resolve('@noaejs/babel-plugin-auto-css-modules')],
      opts.importToAwaitRequire && [
        require.resolve('@noaejs/babel-plugin-import-to-await-require'),
        opts.importToAwaitRequire,
      ],
      opts.lockCoreJS3 && [
        require.resolve('@noaejs/babel-plugin-lock-core-js-3'),
        opts.lockCoreJS3,
      ],
      opts.noAnonymousDefaultExport && [
        require.resolve('@noaejs/babel-plugin-no-anonymous-default-export'),
      ],
      [
        require('@noaejs/deps/compiled/babel/plugin-proposal-record-and-tuple').default,
        {
          syntaxType: 'hash',
          polyfillModuleName: '@noaejs/deps/reexported/record-tuple-polyfill',
          importPolyfill: true,
        },
      ],
    ].filter(Boolean),
  };
  return opts.modify ? opts.modify(preset) : preset;
};
