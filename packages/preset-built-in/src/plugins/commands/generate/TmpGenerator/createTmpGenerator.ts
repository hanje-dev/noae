import { IApi } from '@noaejs/types';
import { Generator } from '@noaejs/utils';
import generateFiles from '../../generateFiles';

export default ({ api }: { api: IApi }) => {
  return class TmpGenerator extends Generator {
    // eslint-disable-next-line no-useless-constructor
    constructor(opts: any) {
      super(opts);
    }

    async writing() {
      await generateFiles({
        api,
      });
    }
  };
};
