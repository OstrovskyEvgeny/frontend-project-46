import _ from 'lodash';

const getDiffObject = (obj1, obj2) => {
  const result = {};
  const keys = Object.keys({...obj1, ...obj2}).sort();

  keys.forEach((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (
      typeof value1 === 'object' && typeof value2 === 'object'
      && value1 !== null && value2 !== null
      && !Array.isArray(value1) && !Array.isArray(value2)) {
      result[`  ${key}`] = getDiffObject(value1, value2);
    } else if (!_.isEqual(value1, value2)) {
      if (value2 === undefined) {
        result[`- ${key}`] = value1;
      } else if (value1 === undefined) {
        result[`+ ${key}`] = value2;
      } else {
        result[`- ${key}`] = value1;
        result[`+ ${key}`] = value2;
      }
    } else {
      result[`  ${key}`] = value1;
    }
  });

  return result;
};

export default getDiffObject;
