import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';

export default (formatName) => {
  let formatter;
  if (formatName === 'stylish') {
    formatter = stylishFormatter;
  } else if (formatName === 'plain') {
    formatter = plainFormatter;
  }

  return formatter;
};
