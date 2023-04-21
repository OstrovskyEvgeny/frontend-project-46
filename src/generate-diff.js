import { getObject } from './file-parser.js';
import { getDiffObject, getSortDiffObject } from './diff-object.js';
import objectToStringConverter from './object-to-string-converter.js';

export default (filepath1, filepath2) => {
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);

  const diffObject = getDiffObject(obj1, obj2);
  const sortDiffObject = getSortDiffObject(diffObject);
  const diffObjectToString = objectToStringConverter(sortDiffObject);

  return diffObjectToString;
};
