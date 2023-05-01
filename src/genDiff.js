import parser, { getPathToFile, getExtensionFile } from './parser.js';
import getDiffObject from './get-diff-object.js';
import getFormatter from './formatters/index.js';

const genDiff = (file1, file2, formatName = 'stylish') => {
  const pathToFile1 = getPathToFile(file1);
  const pathToFile2 = getPathToFile(file2);

  const extensionFile1 = getExtensionFile(pathToFile1);
  const extensionFile2 = getExtensionFile(pathToFile2);

  const obj1 = parser(pathToFile1, extensionFile1);
  const obj2 = parser(pathToFile2, extensionFile2);

  const diffObject = getDiffObject(obj1, obj2);

  const formatter = getFormatter(formatName);

  const result = formatter(diffObject);

  return result;
};

export default genDiff;
