import { IApi } from '@noaejs/types';

export default (api: IApi) => {
  api.describe({
    key: 'extraPostCSSPlugins',
    config: {
      schema(joi) {
        return joi.array();
      },
    },
  });
};
