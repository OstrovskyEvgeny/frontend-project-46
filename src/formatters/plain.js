/* eslint-disable no-param-reassign */
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
  const plain = (diff, path = '') => {
    const regular = /[\s+|-]+/g;
    const properties = Object.entries(diff);

    return properties.reduce((accumulator, property) => {
      const [key, value] = property;
      const currentPath = path === '' ? `${path}${key}` : `${path}.${key}`;

      const sign = key[0];
      const keyWithBackwardSign = reverseKeySign(sign, key);

      const correctValueForDisplay = getCorrectValueForDisplay(value);
      const correctPropertyForDisplay = currentPath.replace(regular, '');

      if (sign === ' ' && typeof value === 'object' && value !== null) {
        accumulator += plain(value, currentPath);
      } else if (sign === '-') {
        accumulator += _.has(diff, keyWithBackwardSign) ? `Property '${correctPropertyForDisplay}' was updated. From ${correctValueForDisplay} to ${getCorrectValueForDisplay(diff[keyWithBackwardSign])}\n` : `Property '${correctPropertyForDisplay}' was removed\n`;
      } else if (sign === '+') {
        if (_.has(diff, keyWithBackwardSign)) return accumulator;

        accumulator += `Property '${correctPropertyForDisplay}' was added with value: ${correctValueForDisplay}\n`;
      }

      return accumulator;
    }, '');
  };
  const result = plain(obj);

  return `${result.slice(0, -1)}\n`;
};

export default plainFormatter;
