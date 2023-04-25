import path from 'path';
import fs from 'fs';

export const getPathToFile = (file) => path.resolve(process.cwd(), file);
// fs.realpathSync - for full path

export const getFileDataFromPath = (pathToFile) => fs.readFileSync(pathToFile, 'utf8');

export const getObjWithJsonParse = (json) => JSON.parse(json);

export const makeObjFromJSON = (file) => {
  const pathToFile = getPathToFile(file);
  const data = getFileDataFromPath(pathToFile);
  const obj = getObjWithJsonParse(data); // сделать проверку на расширение файла

  return obj;
};
