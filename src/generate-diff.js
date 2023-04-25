import { makeObjFromJSON } from './file-parser.js';
import { getDiffObject, getSortDiffObject } from './diff-object.js';
import objectToStringConverter from './object-to-string-converter.js';

export default (file1, file2) => {
  const obj1 = makeObjFromJSON(file1);
  const obj2 = makeObjFromJSON(file2);

  const diffObject = getDiffObject(obj1, obj2);
  const sortDiffObject = getSortDiffObject(diffObject);
  const diffObjectToString = objectToStringConverter(sortDiffObject);

  return diffObjectToString;
};
