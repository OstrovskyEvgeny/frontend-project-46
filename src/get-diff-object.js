import _ from 'lodash';

const getDiffObject = (obj1, obj2) => {
  const objMerger = { ...obj1, ...obj2 };
  const keys = Object.keys(objMerger);
  const sortKeys = _.sortBy(keys);

  return sortKeys.reduce((accumulator, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (
      typeof value1 === 'object' && typeof value2 === 'object'
      && value1 !== null && value2 !== null
      && !Array.isArray(value1) && !Array.isArray(value2)) {
      accumulator[`  ${key}`] = getDiffObject(value1, value2);
    } else if (!_.isEqual(value1, value2)) {
      if (value2 === undefined) {
        accumulator[`- ${key}`] = value1;
      } else if (value1 === undefined) {
        accumulator[`+ ${key}`] = value2;
      } else {
        accumulator[`- ${key}`] = value1;
        accumulator[`+ ${key}`] = value2;
      }
    } else {
      accumulator[`  ${key}`] = value1;
    }

    return accumulator;
  }, {});
};

export default getDiffObject;
