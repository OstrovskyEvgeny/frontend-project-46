import sortBy from 'lodash/sortBy.js';
import isPlainObject from 'lodash/isPlainObject.js';
import isEqual from 'lodash/isEqual.js';

const makeDiffObject = (key, type, value, oldValue) => {
  const obj = {
    key,
    type,
    value,
    oldValue,
  };

  return obj;
};

const getDiffTree = (obj1, obj2) => {
  const objMerger = { ...obj1, ...obj2 };
  const keys = Object.keys(objMerger);
  const sortKeys = sortBy(keys);

  return sortKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (isPlainObject(value1) && isPlainObject(value2)) {
      if (isEqual(value1, value2)) {
        return makeDiffObject(key, 'unchanged', value1);
      }
      const diffObj = makeDiffObject(key, 'changed', value2, value1);
      diffObj.children = getDiffTree(value1, value2); // это аля мутация, по сути тесты бы не прошли

      return diffObj;
    }

    if (!isEqual(value1, value2)) {
      if (value2 === undefined) {
        return makeDiffObject(key, 'deleted', value1);
      }
      if (value1 === undefined) {
        return makeDiffObject(key, 'added', value2);
      }
      return makeDiffObject(key, 'changed', value2, value1);
    }
    return makeDiffObject(key, 'unchanged', value1);
  });
};

export default getDiffTree;
