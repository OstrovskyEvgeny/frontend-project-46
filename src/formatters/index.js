import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';
import jsonFormatter from './json.js';

export default (formatName) => {
  if (formatName === 'stylish') {
    return stylishFormatter;
  } if (formatName === 'plain') {
    return plainFormatter;
  } if (formatName === 'json') {
    return jsonFormatter;
  }

  return null;
};
