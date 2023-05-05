import isObjectLike from 'lodash/isObjectLike.js';

const getCorrectValueForDisplay = (value) => {
  if (isObjectLike(value) && !Array.isArray(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const plain = (collectionsDiff) => {
  const iter = (diff, currentPath = '') => diff.reduce((accumulator, {
    key, value, type, children,
  }) => {
    const path = currentPath === '' ? `${currentPath}${key}` : `${currentPath}.${key}`;
    const valueForDisplay = getCorrectValueForDisplay(value);

    switch (type) {
      case 'added':
        return `${accumulator}Property '${path}' was added with value: ${valueForDisplay}\n`;
      case 'deleted':
        return `${accumulator}Property '${path}' was removed\n`;
      case 'unchanged':
        return accumulator;
      case 'changed': {
        if (children) {
          return accumulator + iter(children, path);
        }
        const [value1, value2] = value;
        const value1ForDisplay1 = getCorrectValueForDisplay(value1);
        const value1ForDisplay2 = getCorrectValueForDisplay(value2);
        return `${accumulator}Property '${path}' was updated. From ${value1ForDisplay1} to ${value1ForDisplay2}\n`;
      }
      default:
        return accumulator;
    }
  }, '');
  const result = iter(collectionsDiff);

  return result.slice(0, -1);
};

export default plain;
