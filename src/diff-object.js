import _ from 'lodash';

export const getDiffObject = (obj1, obj2) => {
  const propsObj1 = Object.entries(obj1);
  const cloneObj2 = {...obj2};

  const result = propsObj1.reduce((acc, pairOfObj1) => {
    const [key, value] = pairOfObj1;
    if (_.has(obj2, key)) {

      if (obj1[key] === obj2[key]) {
        acc[`  ${key}`] = value;
        delete cloneObj2[key];

        return acc;
      } else {
        acc[`- ${key}`] = value;
        acc[`+ ${key}`] = obj2[key];
        delete cloneObj2[key];

        return acc;
      }
    } else if (!_.has(obj2, key)) {
      acc[`- ${key}`] = value;

      return acc;
    }
  }, {})

  Object.entries(cloneObj2).map(pair => {
    const [key, value] = pair;
    return result[`+ ${key}`] = value;
  });

  return result;
};

export const getSortDiffObject = obj => _.fromPairs(_.sortBy(_.toPairs(obj), ([key]) => key[2]));
