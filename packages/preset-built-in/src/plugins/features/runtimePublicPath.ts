import { IApi } from '@noaejs/types';

export default (api: IApi) => {
  api.describe({
    key: 'runtimePublicPath',
    config: {
      schema(joi) {
        return joi.boolean();
      },
    },
  });
};
