import { IApi } from '@noaejs/types';

export default (api: IApi) => {
  api.describe({
    key: 'inlineLimit',
    config: {
      schema(joi) {
        return joi.number();
      },
    },
  });
};
