import { IApi } from '@noaejs/types';

export default (api: IApi) => {
  api.describe({
    key: 'chainWebpack',
    config: {
      schema(joi) {
        return joi.function();
      },
    },
  });
};
