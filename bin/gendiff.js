#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/genDiff.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')

  .action(() => {
    const [filepath1, filepath2] = program.args;
    const formatName = program.opts().format;

    console.log(genDiff(filepath1, filepath2, formatName));
  });

program.parse();
