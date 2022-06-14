import { Plugin } from '@noaejs/runtime';
import { IRoute } from '../commonExports';

export interface IRouterComponentProps {
  routes: IRoute[];
  plugin: Plugin;
  history: any;
  ssrProps?: object;
  defaultTitle?: string;
  dynamicImport?: boolean;
  isServer?: boolean;
}

export interface IOpts extends IRouterComponentProps {
  rootElement?: string | HTMLElement;
  callback?: () => void;
}
