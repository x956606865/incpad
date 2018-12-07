const errorHandle = require('@incpad/error-handle');
const errorSchema = require('./error.schema');
const { tap } = require('@incpad/base-tool/tools/debug');
const { initValidatorWithObject, Validator } = require('@incpad/validator');
const validatorSchema = require('./validator.schema');
const errorHandleI = new errorHandle();
initValidatorWithObject(validatorSchema);
errorHandleI.initCustomErrorWithObject(errorSchema);

module.exports = {};
