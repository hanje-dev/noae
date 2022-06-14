import { IApi } from '@noaejs/types';

export default (api: IApi) => {
  api.describe({
    key: 'define',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  });
};
