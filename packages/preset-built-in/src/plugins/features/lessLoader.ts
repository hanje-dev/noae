import { IApi } from '@noaejs/types';

export default (api: IApi) => {
  api.describe({
    key: 'lessLoader',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  });
};
