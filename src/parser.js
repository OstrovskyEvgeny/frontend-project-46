import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf8');

const parseJSONFile = (jsonData) => JSON.parse(jsonData);
const parseYAMLFile = (yamlData) => yaml.load(yamlData);

export const getPathToFile = (file) => path.resolve(process.cwd(), '__fixtures__', file);

export const getExtensionFile = (pathToFile) => path.extname(pathToFile);

export default (pathToFile, extension) => {
  const dataFile = readFile(pathToFile);
  let obj = {};

  if (extension === '.json') {
    obj = parseJSONFile(dataFile);
  } else if (extension === '.yaml' || extension === '.yml') {
    obj = parseYAMLFile(dataFile);
  }
  return obj;
};
