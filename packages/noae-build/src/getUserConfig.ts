import Ajv from 'ajv';
import slash from 'slash2';
import { relative, isAbsolute, resolve } from 'path';
import signale from 'signale';
import { existsSync } from 'fs';
import schema from './schema';
import { getExistFile } from './utils';
import { IBundleOptions } from './types';

function testDefault(obj) {
  return obj.default || obj;
}

export const CONFIG_FILES = [
  '.noaerc.js',
  '.noaerc.jsx',
  '.noaerc.ts',
  '.noaerc.tsx',
  '.umirc.library.js',
  '.umirc.library.jsx',
  '.umirc.library.ts',
  '.umirc.library.tsx',
];

const CLASSES = {
  Function: Function,
};

const extendAjv = (ajv: Ajv) => {
  ajv.addKeyword({
    keyword: 'instanceof',
    compile: function (schema: string) {
      var Class = CLASSES[schema];
      return function (data: any) {
        return data instanceof Class;
      };
    },
  });
  return ajv;
};

export default function ({
  cwd,
  customPath,
}: {
  cwd: string;
  customPath?: string;
}): IBundleOptions {
  let finalPath = '';
  if (customPath) {
    finalPath = isAbsolute(customPath) ? customPath : resolve(process.cwd(), customPath);
    if (!existsSync(finalPath)) {
      throw new Error(`can\'t found config file: ${customPath}`);
    }
  }
  const configFile =
    finalPath ||
    getExistFile({
      cwd,
      files: CONFIG_FILES,
      returnRelative: false,
    });

  if (configFile) {
    const userConfig = testDefault(require(configFile));
    const userConfigs = Array.isArray(userConfig) ? userConfig : [userConfig];
    userConfigs.forEach((config) => {
      const ajv = extendAjv(new Ajv({ allErrors: true }));
      const isValid = ajv.validate(schema, config);
      if (!isValid) {
        const errors = ajv.errors.map(({ schemaPath, message }, index) => {
          return `${index + 1}. ${schemaPath}${schemaPath ? ' ' : ''}${message}`;
        });
        throw new Error(
          `Invalid options in ${slash(relative(cwd, configFile))} ${errors.join('\n')}`.trim()
        );
      }
    });
    return userConfig;
  }
  return {};
}
