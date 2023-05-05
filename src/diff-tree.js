import sortBy from 'lodash/sortBy.js';
import isObjectLike from 'lodash/isObjectLike.js';
import isEqual from 'lodash/isEqual.js';

const getDiffTree = (obj1, obj2) => {
  const objMerger = { ...obj1, ...obj2 };
  const keys = Object.keys(objMerger);
  const sortKeys = sortBy(keys);

  return sortKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (
      isObjectLike(value1) && isObjectLike(value2)
      && !Array.isArray(value1) && !Array.isArray(value2)) {
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
        value: [value1, value2], // подумать что с этим сделать
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
