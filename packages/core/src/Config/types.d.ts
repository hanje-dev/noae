import { BaseIConfig } from '@noaejs/types';
import { IRoute } from '../index';

type WithFalse<T> = {
  [P in keyof T]?: T[P] | false;
};

export interface BaseIConfig {
  singular?: boolean;
  outputPath?: string;
  publicPath?: string;
  title?: string;
  mountElementId?: string;
  routes?: IRoute[];
  exportStatic?: {
    htmlSuffix?: boolean;
    dynamicRoot?: boolean;
    supportWin?: boolean;
  };
}

export type IConfig = WithFalse<BaseIConfig>;
