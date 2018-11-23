const ErrorHandle = require('./packages/error-handle');
const list = [
    {
        code: 1001,
        msg: 'Path not valid',
        name: 'PathNotValid',
    },
];
const ErrorHandleInstance = new ErrorHandle();
ErrorHandleInstance.initCustomErrorWithObject(list);
ErrorHandleInstance.throwErrorByName('PathNotValid');
ErrorHandleInstance.throwErrorByCode(1001);
