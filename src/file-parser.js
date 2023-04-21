import path from 'path';
import fs from 'fs';

export const getPathToFile = (file) => path.resolve(process.cwd(), file);

export const getFileDataFromPath = (pathToFile) => fs.readFileSync(pathToFile, 'utf8');

export const getObjWithJsonParse = (json) => JSON.parse(json);

export const getObject = (filepath) => {
  const pathToFile = getPathToFile(filepath);
  const data = getFileDataFromPath(pathToFile);
  const obj = getObjWithJsonParse(data);

  return obj;
};
