import { IApi } from '@noaejs/types';

export default (api: IApi) => {
  api.describe({
    key: 'styleLoader',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  });
};
