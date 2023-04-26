/* eslint-disable no-undef */
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixtureFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFixtureFile = (filename) => fs.readFileSync(getFixtureFilePath(filename), 'utf-8');

test('diff json files', () => {
  const filePath1 = getFixtureFilePath('file1.json');
  const filePath2 = getFixtureFilePath('file2.json');
  const diff = readFixtureFile('diff-files-1-2.txt');

  expect(genDiff(filePath1, filePath2)).toEqual(diff);
});

test('diff yaml files', () => {
  const filePath1 = getFixtureFilePath('file1.yml');
  const filePath2 = getFixtureFilePath('file2.yml');
  const diff = readFixtureFile('diff-files-1-2.txt');

  expect(genDiff(filePath1, filePath2)).toEqual(diff);
});
