import { IApi } from '@noaejs/types';

export default (api: IApi) => {
  api.describe({
    key: 'singular',
    config: {
      schema(joi) {
        return joi.boolean();
      },
    },
  });
};
