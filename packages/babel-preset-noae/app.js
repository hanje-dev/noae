module.exports = function (context, opts) {
  const { nodeEnv } = opts;
  delete nodeEnv.nodeEnv;
  return {
    presets: [
      [
        require('./lib').default,
        require('@noaejs/utils').deepmerge(
          {
            typescript: true,
            env: {
              useBuiltIns: 'entry',
              corejs: 3,
              modules: false,
            },
            react: {
              development: nodeEnv === 'development',
            },
            transformRuntime: {},
            reactRemovePropTypes: nodeEnv === 'production',
            reactRequire: true,
            lockCoreJS3: {},
          },
          opts
        ),
      ],
    ],
  };
};
