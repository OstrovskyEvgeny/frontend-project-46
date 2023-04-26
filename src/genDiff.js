import parser, { getPathToFile, getExtensionFile } from './parser.js';
import { getDiffObject, getSortDiffObject } from './diff-object.js';
import objectToStringConverter from './object-to-string-converter.js';

export default (file1, file2) => {
  const pathToFile1 = getPathToFile(file1);
  const pathToFile2 = getPathToFile(file2);

  const extensionFile1 = getExtensionFile(pathToFile1);
  const extensionFile2 = getExtensionFile(pathToFile2);

  const obj1 = parser(pathToFile1, extensionFile1);
  const obj2 = parser(pathToFile2, extensionFile2);

  const diffObject = getDiffObject(obj1, obj2);

  const sortDiffObject = getSortDiffObject(diffObject);

  const diffObjectToString = objectToStringConverter(sortDiffObject);

  return diffObjectToString;
};