module.exports = function (api, opts) {
  return {
    presets: [
      [
        require('./lib').default,
        require('@noaejs/utils').deepmerge(
          {
            typescript: true,
            react: true,
            env: {
              targets: {
                node: 'current',
              },
              modules: 'commonjs',
            },
          },
          opts
        ),
      ],
    ],
  };
};
