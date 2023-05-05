import isPlainObject from 'lodash/isPlainObject.js';

const getCorrectValueForDisplay = (value) => {
  if (isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const plain = (collectionsDiff) => {
  const iter = (diff, currentPath = '') => diff.reduce((accumulator, {
    key, value, oldValue, type, children,
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
        const oldValueForDisplay = getCorrectValueForDisplay(oldValue);
        return `${accumulator}Property '${path}' was updated. From ${oldValueForDisplay} to ${valueForDisplay}\n`;
      }
      default:
        return accumulator;
    }
  }, '');
  const result = iter(collectionsDiff);

  return result.slice(0, -1);
};

export default plain;
