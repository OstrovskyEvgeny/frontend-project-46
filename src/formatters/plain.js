import _ from 'lodash';

const getCorrectValueForDisplay = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  } if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }

  return value;
};

const reverseKeySign = (sign, key) => {
  const result = sign === '-' ? key.replace(sign, '+') : key.replace(sign, '-');
  return result;
};

const plainFormatter = (obj) => {
  const regular = /[\s+|-]+/g;

  const iter = (diff, path = '') => {
    const properties = Object.entries(diff);

    return properties.reduce((accumulator, [key, value]) => {
      const currentPath = path === '' ? `${path}${key}` : `${path}.${key}`;

      const sign = key[0];
      const keyWithBackwardSign = reverseKeySign(sign, key);

      const correctValueForDisplay = getCorrectValueForDisplay(value);
      const correctPropertyForDisplay = currentPath.replace(regular, '');

      if (sign === ' ' && typeof value === 'object' && value !== null) {
        return accumulator + iter(value, currentPath);
      }
      if (sign === '-') {
        return _.has(diff, keyWithBackwardSign)
          ? `${accumulator}Property '${correctPropertyForDisplay}' was updated. From ${correctValueForDisplay} to ${getCorrectValueForDisplay(diff[keyWithBackwardSign])}\n`
          : `${accumulator}Property '${correctPropertyForDisplay}' was removed\n`;
      }
      if (sign === '+') {
        return _.has(diff, keyWithBackwardSign)
          ? accumulator
          : `${accumulator}Property '${correctPropertyForDisplay}' was added with value: ${correctValueForDisplay}\n`;
      }

      return accumulator;
    }, '');
  };
  const result = iter(obj);

  return result.slice(0, -1);
};

export default plainFormatter;
