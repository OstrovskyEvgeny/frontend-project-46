import isPlainObject from 'lodash/isPlainObject.js';

const makeStringFromObject = (obj, deep = 1, wildcard = '    ') => {
  if (!isPlainObject(obj) || Array.isArray(obj)) return obj;

  const padding = wildcard.repeat(deep);
  const propertyes = Object.entries(obj);

  const result = propertyes.reduce((accumulator, [key, value]) => {
    if (isPlainObject(value)) {
      const valueObject = makeStringFromObject(value, deep + 1, wildcard);
      return `${accumulator}${padding}${key}: ${valueObject}\n`;
    }
    return `${accumulator}${padding}${key}: ${value}\n`;
  }, '{\n');

  return `${result}${wildcard.repeat(deep - 1)}}`;
};

const stylish = (collectionsDiff, deep = 1, wildcard = '    ') => {
  const result = collectionsDiff.reduce((accumulator, {
    key, value, oldValue, type, children,
  }) => {
    const valueForDisplay = makeStringFromObject(value, deep + 1, wildcard);
    const padding = wildcard.repeat(deep);

    switch (type) {
      case 'added':
        return `${accumulator}${padding.slice(2)}+ ${key}: ${valueForDisplay}\n`;
      case 'deleted':
        return `${accumulator}${padding.slice(2)}- ${key}: ${valueForDisplay}\n`;
      case 'unchanged':
        return `${accumulator}${padding}${key}: ${valueForDisplay}\n`;
      case 'changed': {
        if (children) {
          const childrens = stylish(children, deep + 1, wildcard);

          return `${accumulator}${padding}${key}: ${childrens}\n`;
        }
        const oldValueForDisplay = makeStringFromObject(oldValue, deep + 1, wildcard);

        return `${accumulator}${padding.slice(2)}- ${key}: ${oldValueForDisplay}\n${padding.slice(2)}+ ${key}: ${valueForDisplay}\n`;
      }
      default:
        return accumulator;
    }
  }, ('{\n'));

  return `${result}${wildcard.repeat(deep - 1)}}`;
};

export default stylish;
