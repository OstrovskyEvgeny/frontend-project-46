import sortBy from 'lodash/sortBy.js';
import isPlainObject from 'lodash/isPlainObject.js';
import isEqual from 'lodash/isEqual.js';

const getDiffTree = (obj1, obj2) => {
  const objMerger = { ...obj1, ...obj2 };
  const keys = Object.keys(objMerger);
  const sortKeys = sortBy(keys);

  return sortKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (isPlainObject(value1) && isPlainObject(value2)) {
      if (isEqual(value1, value2)) {
        return {
          key,
          value: value1,
          type: 'unchanged',
        };
      }

      return {
        key,
        type: 'changed',
        children: getDiffTree(value1, value2),
      };
    }

    if (!isEqual(value1, value2)) {
      if (value2 === undefined) {
        return {
          key,
          value: value1,
          type: 'deleted',
        };
      }
      if (value1 === undefined) {
        return {
          key,
          value: value2,
          type: 'added',
        };
      }

      return {
        key,
        value: value2,
        oldValue: value1, // то самое
        type: 'changed',
      };
    }

    return {
      key,
      value: value1,
      type: 'unchanged',
    };
  });
};

export default getDiffTree;
