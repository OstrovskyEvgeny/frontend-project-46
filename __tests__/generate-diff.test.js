/* eslint-disable no-undef */
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixtureFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFixtureFile = (filename) => fs.readFileSync(getFixtureFilePath(filename), 'utf-8');

test('diff json files with default formatter', () => {
  const filePath1 = getFixtureFilePath('file1.json');
  const filePath2 = getFixtureFilePath('file2.json');
  const diff = readFixtureFile('diff-files-stylish-output.txt');

  expect(genDiff(filePath1, filePath2)).toEqual(diff);
});

test('diff yaml files with stylish formatter', () => {
  const filePath1 = getFixtureFilePath('file1.yml');
  const filePath2 = getFixtureFilePath('file2.yml');
  const diff = readFixtureFile('diff-files-stylish-output.txt');
  console.log(diff === genDiff(filePath1, filePath2));

  expect(genDiff(filePath1, filePath2, 'stylish')).toEqual(diff);
});

test('diff json files with plain formatter', () => {
  const filePath1 = getFixtureFilePath('file1.yml');
  const filePath2 = getFixtureFilePath('file2.yml');
  const diff = readFixtureFile('diff-files-plain-output.txt');
  console.log(diff === genDiff(filePath1, filePath2, 'plain'));
  expect(genDiff(filePath1, filePath2, 'plain')).toEqual(diff);
});

test('diff yaml files with plain formatter', () => {
  const filePath1 = getFixtureFilePath('file1.yml');
  const filePath2 = getFixtureFilePath('file2.yml');
  const diff = readFixtureFile('diff-files-plain-output.txt');
  console.log(diff === genDiff(filePath1, filePath2, 'plain'));
  expect(genDiff(filePath1, filePath2, 'plain')).toEqual(diff);
});
