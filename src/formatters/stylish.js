import isObjectLike from 'lodash/isObjectLike.js';

const makeStringFromObject = (obj, deep = 1, wildcard = '    ') => {
  if (!isObjectLike(obj) || Array.isArray(obj)) return obj;

  const padding = wildcard.repeat(deep);
  const propertyes = Object.entries(obj);

  const result = propertyes.reduce((accumulator, [key, value]) => {
    if (isObjectLike(value) && !Array.isArray(value)) {
      const valueObject = makeStringFromObject(value, deep + 1, wildcard);
      return `${accumulator}${padding}${key}: ${valueObject}\n`;
    }
    return `${accumulator}${padding}${key}: ${value}\n`;
  }, '{\n');

  return `${result}${wildcard.repeat(deep - 1)}}`;
};

const stylish = (collectionsDiff, deep = 1, wildcard = '    ') => {
  const result = collectionsDiff.reduce((accumulator, {
    key, value, type, children,
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
        const [value1, value2] = value; // насколько лаконично решение?
        const value1ForDisplay = makeStringFromObject(value1, deep + 1, wildcard);
        const value2ForDisplay = makeStringFromObject(value2, deep + 1, wildcard);

        return `${accumulator}${padding.slice(2)}- ${key}: ${value1ForDisplay}\n${padding.slice(2)}+ ${key}: ${value2ForDisplay}\n`;
      }
      default:
        return accumulator;
    }
  }, ('{\n'));

  return `${result}${wildcard.repeat(deep - 1)}}`;
};

export default stylish;
