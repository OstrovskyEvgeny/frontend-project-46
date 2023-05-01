/* eslint-disable no-param-reassign */
const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

const stylishFormatter = (diff, deep = 1, wildcard = '    ') => {
  const props = Object.entries(diff);
  let padding;

  const result = props.reduce((accumulator, pair) => {
    const [key, value] = pair;
    let newValue = value;

    padding = key[0] === '-'
    || key[0] === '+'
    || key[0] === ' ' ? wildcard.repeat(deep).slice(2) : padding = wildcard.repeat(deep);

    if (isObject(newValue)) {
      newValue = stylishFormatter(value, deep + 1, wildcard);
    }
    accumulator = `${accumulator}${padding}${key}: ${newValue}\n`;

    return accumulator;
  }, ('{\n'));
  padding = wildcard.repeat(deep - 1);

  return `${result}${padding}}`;
};

export default stylishFormatter;
