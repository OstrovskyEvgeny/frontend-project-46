import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';

const readFile = (pathToFile) => readFileSync(pathToFile, 'utf8');

const parseJSONFile = (jsonData) => JSON.parse(jsonData);
const parseYAMLFile = (yamlData) => load(yamlData);

export const getPathToFile = (file) => resolve(process.cwd(), file);

export const getExtensionFile = (pathToFile) => extname(pathToFile);

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
