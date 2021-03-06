import { IApi } from '@noaejs/types';

export default (api: IApi) => {
  api.describe({
    key: 'dynamicImportSyntax',
    config: {
      schema(joi) {
        return joi.object().description('Code splitting for import statement syntax');
      },
    },
  });
};
