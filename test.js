const { Validator, initValidator } = require('./packages/validator');
initValidator('./validator.schema.js');
console.log(Validator('desc', {}));
