import { IApi } from '@noaejs/types';

export default (api: IApi) => {
  api.describe({
    key: 'chunks',
    config: {
      schema(joi) {
        return joi.array().items(joi.string());
      },
    },
  });
};
