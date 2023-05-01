import path from 'path';
import fs from 'fs';
import { load } from 'js-yaml';

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf8');

const parseJSONFile = (jsonData) => JSON.parse(jsonData);
const parseYAMLFile = (yamlData) => load(yamlData);

export const getPathToFile = (file) => path.resolve(process.cwd(), file);

export const getExtensionFile = (pathToFile) => path.extname(pathToFile);

export default (pathToFile, extension) => {
  const dataFile = readFile(pathToFile);

  if (extension === '.yaml' || extension === '.yml') {
    const result = parseYAMLFile(dataFile);
    return result;
  }
  if (extension === '.json') {
    const result = parseJSONFile(dataFile);
    return result;
  }

  return null;
};
