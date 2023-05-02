/* eslint-disable no-param-reassign */
const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

const stylishFormatter = (diff, deep = 1, wildcard = '    ') => {
  const props = Object.entries(diff);

  const result = props.reduce((accumulator, [key, value]) => {
    const padding = key[0] === '-'
    || key[0] === '+'
    || key[0] === ' ' ? wildcard.repeat(deep).slice(2) : wildcard.repeat(deep);

    if (isObject(value)) {
      const valueIsObject = stylishFormatter(value, deep + 1, wildcard);
      return `${accumulator}${padding}${key}: ${valueIsObject}\n`;
    }
    if (!isObject(value)) {
      return `${accumulator}${padding}${key}: ${value}\n`;
    }

    return accumulator;
  }, ('{\n'));
  const paddingForClosingBrackets = wildcard.repeat(deep - 1);

  return `${result}${paddingForClosingBrackets}}`;
};

export default stylishFormatter;
