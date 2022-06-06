import { cloneDeep, merge } from 'lodash';
import { IBundleOptions } from './types';

function stripDotSlashPrefix(path: string) {
  return path.replace(/^\.\//, '');
}

export default function (entry: string, opts: IBundleOptions): IBundleOptions {
  let clone: IBundleOptions = cloneDeep(opts);
  const stripedEntry = stripDotSlashPrefix(entry);
  if (clone.overridesByEntry) {
    Object.keys(clone.overridesByEntry).forEach((key) => {
      const stripeKey = stripDotSlashPrefix(key);
      if (stripeKey !== key) {
        clone.overridesByEntry[stripeKey] = clone.overridesByEntry[key];
      }
    });
    if (clone.overridesByEntry[stripedEntry]) {
      clone = merge(clone, clone.overridesByEntry[stripedEntry]);
    }
    delete clone.overridesByEntry;
  }
  return clone;
}
