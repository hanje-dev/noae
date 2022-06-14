import { IApi } from '@noaejs/types';
import { getScripts } from './utils';

export default function (api: IApi) {
  api.describe({
    key: 'scripts',
    config: {
      schema(joi) {
        return joi.array();
      },
    },
  });

  api.addHTMLScripts(() => {
    return getScripts(api.config?.scripts || []);
  });
}
