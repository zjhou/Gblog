const { flow } = require('lodash');
const parseBase64 = s => Buffer.from(s, 'base64').toString();
const parseBase64JSONStr = flow(parseBase64, JSON.parse);

const strUtils = {
  parseBase64JSONStr,
  parseBase64,
};

module.exports = strUtils;
