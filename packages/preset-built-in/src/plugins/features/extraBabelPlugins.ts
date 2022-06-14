import { IApi } from '@noaejs/types';

export default (api: IApi) => {
  api.describe({
    key: 'extraBabelPlugins',
    config: {
      schema(joi) {
        return joi.array();
      },
    },
  });
};
