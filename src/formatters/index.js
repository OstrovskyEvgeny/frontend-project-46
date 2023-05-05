import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormatter from './json.js';

export default (formatName) => {
  if (formatName === 'stylish') {
    return stylish;
  } if (formatName === 'plain') {
    return plain;
  } if (formatName === 'json') {
    return jsonFormatter;
  }

  return null;
};
