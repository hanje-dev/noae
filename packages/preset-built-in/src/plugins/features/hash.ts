import { IApi } from '@noaejs/types';

export default (api: IApi) => {
  api.describe({
    key: 'hash',
    config: {
      schema(joi) {
        return joi.boolean();
      },
    },
  });
};
