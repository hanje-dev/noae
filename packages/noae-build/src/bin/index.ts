#!/usr/bin/env node

import { existsSync } from 'fs';
import { join } from 'path';
import yParser from 'yargs-parser';
import chalk from 'chalk';
import signale from 'signale';
import updater from 'update-notifier';
import compiler from '../build';

// print version and @local
const args = yParser(process.argv.slice(2));
if (args.v || args.version) {
  console.log(require('../package').version);
  if (existsSync(join(__dirname, '../.local'))) {
    console.log(chalk.cyan('@local'));
  }
  process.exit(1);
}

const pkg = require('../../package.json');

updater({ pkg }).notify({ defer: true });

function stripEmptyKeys(obj: any) {
  Object.keys(obj).forEach((key) => {
    if (!obj[key] || (Array.isArray(obj[key]) && !obj[key].length)) {
      delete obj[key];
    }
  });
  return obj;
}

(async function build() {
  // Parse buildArgs from cli
  const buildArgs = stripEmptyKeys({
    esm: args.esm && { type: args.esm === true ? 'rollup' : args.esm },
    cjs: args.cjs && { type: args.cjs === true ? 'rollup' : args.cjs },
    umd: args.umd && { name: args.umd === true ? undefined : args.umd },
    file: args.file,
    target: args.target,
    entry: args._,
    config: args.config,
  });

  console.log('----------------------------');
  console.log(buildArgs);
  console.log('----------------------------');
  if (buildArgs.file && buildArgs.entry && buildArgs.entry.length > 1) {
    signale.error(
      new Error(`Cannot specify file when have multiple entries (${buildArgs.entry.join(', ')})`)
    );
    process.exit(1);
  }

  try {
    await compiler({
      cwd: args.root || process.cwd(),
      watch: args.w || args.watch,
      clean: args.clean,
      buildArgs,
    });
  } catch (err) {
    signale.error(err);
    process.exit(1);
  }
})();
