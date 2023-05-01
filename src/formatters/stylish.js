/* eslint-disable no-param-reassign */
const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

const stylishFormatter = (diff, deep = 1, wildcard = '    ') => {
  const props = Object.entries(diff);

  const result = props.reduce((accumulator, pair) => {
    const [key, value] = pair;

    const padding = key[0] === '-'
    || key[0] === '+'
    || key[0] === ' ' ? wildcard.repeat(deep).slice(2) : wildcard.repeat(deep);

    if (isObject(value)) {
      const valueIsObject = stylishFormatter(value, deep + 1, wildcard);
      accumulator = `${accumulator}${padding}${key}: ${valueIsObject}\n`;
    } else {
      accumulator = `${accumulator}${padding}${key}: ${value}\n`;
    }

    return accumulator;
  }, ('{\n'));
  const paddingForClosingBrackets = wildcard.repeat(deep - 1);

  return `${result}${paddingForClosingBrackets}}`;
};

export default stylishFormatter;
