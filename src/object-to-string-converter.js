export default (obj) => {
  const prop = Object.entries(obj);

  const reuslt = prop.reduce((acc, pair) => {
    const [key, value] = pair;
    const trimKey = key.slice(0, key.length);
    const trimValue = typeof value === typeof 'string' ? value.slice(0, value.length) : value;

    // eslint-disable-next-line no-param-reassign
    acc = `${acc}  ${trimKey}: ${trimValue}\n`;
    return acc;
  }, '');

  return `{\n${reuslt}}`;
};
