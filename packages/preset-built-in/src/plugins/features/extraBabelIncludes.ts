import { IApi } from '@noaejs/types';

export default (api: IApi) => {
  api.describe({
    key: 'extraBabelIncludes',
    config: {
      schema(joi) {
        return joi.array();
      },
    },
  });
};
