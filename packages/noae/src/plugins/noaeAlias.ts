import { IApi } from '@noaejs/types';

export default (api: IApi) => {
  api.chainWebpack((memo) => {
    if (process.env.NOAE_DIR) {
      memo.resolve.alias.set('noae', process.env.NOAE_DIR);
    }
    return memo;
  });
};
