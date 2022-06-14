import { IApi } from '@noaejs/types';

export default (api: IApi) => {
  api.registerCommand({
    name: 'version',
    description: 'show noae version',
    async fn() {},
  });
};
