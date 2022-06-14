import { IApi } from '@noaejs/types';

export default (api: IApi) => {
  api.addHTMLHeadScripts(() => [
    {
      content: `//! noae version: ${process.env.NOAE_VERSION}`,
    },
  ]);

  api.addEntryCode(
    () => `
    window.g_noae = {
      version: '${process.env.NOAE_VERSION}',
    };
  `
  );
};
