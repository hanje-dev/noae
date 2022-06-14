import { IApi } from '@noaejs/types';

export default (api: IApi) => {
  api.describe({
    key: 'cssModulesTypescriptLoader',
    config: {
      schema(joi) {
        return joi.object({
          mode: joi.string().valid('emit', 'verify').optional(),
        });
      },
    },
  });
};
