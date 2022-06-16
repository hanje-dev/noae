"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _noae() {
  const data = require("noae");

  _noae = function _noae() {
    return data;
  };

  return data;
}

const winPath = _noae().utils.winPath;

function _default() {
  return `import { useState, useEffect, useContext, useRef } from 'react';
// @ts-ignore
import isEqual from '${winPath(require.resolve('fast-deep-equal'))}';
// @ts-ignore
import { NoaeContext } from './helpers/constant';
import { Model, models } from './Provider';

export type Models<T extends keyof typeof models> = Model<T>[T]

export function useModel<T extends keyof Model<T>>(model: T): Model<T>[T]
export function useModel<T extends keyof Model<T>, U>(model: T, selector: (model: Model<T>[T]) => U): U

export function useModel<T extends keyof Model<T>, U>(
  namespace: T,
  updater?: (model: Model<T>[T]) => U
) : typeof updater extends undefined ? Model<T>[T] : ReturnType<NonNullable<typeof updater>>{

  type RetState = typeof updater extends undefined ? Model<T>[T] : ReturnType<NonNullable<typeof updater>>
  const dispatcher = useContext<any>(NoaeContext);
  const updaterRef = useRef(updater);
  updaterRef.current = updater;
  const [state, setState] = useState<RetState>(
    () => updaterRef.current ? updaterRef.current(dispatcher.data![namespace]) : dispatcher.data![namespace]
  );
  const stateRef = useRef<any>(state);
  stateRef.current = state;

  const isMount = useRef(false);
  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
    }
  }, [])

  useEffect(() => {
    const handler = (e: any) => {
      if(!isMount.current) {
        // 如果 handler 执行过程中，组件被卸载了，则强制更新全局 data
        setTimeout(() => {
          dispatcher.data![namespace] = e;
          dispatcher.update(namespace);
        });
      } else {
        if(updater && updaterRef.current){
          const currentState = updaterRef.current(e);
          const previousState = stateRef.current
          if(!isEqual(currentState, previousState)){
            setState(currentState);
          }
        } else {
          setState(e);
        }
      }
    }
    try {
      dispatcher.callbacks![namespace]!.add(handler);
      dispatcher.update(namespace);
    } catch (e) {
      dispatcher.callbacks![namespace] = new Set();
      dispatcher.callbacks![namespace]!.add(handler);
      dispatcher.update(namespace);
    }
    return () => {
      dispatcher.callbacks![namespace]!.delete(handler);
    }
  }, [namespace]);

  return state;
};
`;
}