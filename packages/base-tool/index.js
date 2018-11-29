const base = require('./tools/base');
const path = require('./tools/path');
const constant = require('./tools/constant');
const debug = require('./tools/debug');
module.exports = {
    ...base,
    ...path,
    constant,
    debug,
};
