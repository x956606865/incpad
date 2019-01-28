const { CreateSymbolTool } = require('@incpad/base-tool/tools/base');
const { Validator, initValidatorWithObject } = require('@incpad/validator');
const schema = require('./validator.schema');
initValidatorWithObject(schema);
const SymbolTable = CreateSymbolTool([
    'ErrorList',
    'ErrorCodeList',
    'ErrorNameList',
    'throwError',
    'initInnerError',
    'initOutterError',
    'initErrorFromArray',
    'commonHandleFunc',
    'callErrorFunc',
    'createRuntimeError',
]);

class ErrorHandle {
    constructor() {
        this.constant = {
            innerErrors: {
                ErrorNotFound: 'ErrorNotFound',
            },
        };
        this[SymbolTable.ErrorList] = [];
        this[SymbolTable.ErrorCodeList] = {};
        this[SymbolTable.ErrorNameList] = {};
        this[SymbolTable.initInnerError]();
    }

    [SymbolTable.initErrorFromArray](arr, isInnerError = false) {
        arr.map(item => {
            this.addError(item, isInnerError);
        });
    }

    initCustomErrorWithObject(object) {
        this[SymbolTable.initErrorFromArray](object);
    }

    [SymbolTable.initInnerError]() {
        const arr = [
            {
                code: 0,
                msg: 'Error instance not found',
                name: 'ErrorNotFound',
            },
            {
                code: 1,
                msg: 'RuntimeError',
                name: 'RuntimeError',
            },
        ];
        this[SymbolTable.initErrorFromArray](arr, true);
    }

    addError(options, isInnerError = false) {
        const CError = new CustomError(options, isInnerError);
        const index = this[SymbolTable.ErrorList].length;
        this[SymbolTable.ErrorList].push(CError);
        this[SymbolTable.ErrorCodeList][CError.code] = index;
        this[SymbolTable.ErrorNameList][CError.name] = index;
    }

    throwErrorByCode(code, msg = null) {
        const errorIndex = this[SymbolTable.ErrorCodeList][code];
        const err = this[SymbolTable.ErrorList][errorIndex];
        if (msg) {
            err.msg = msg;
        }
        this[SymbolTable.throwError](err);
    }

    throwErrorByName(name, msg = null) {
        const errorIndex = this[SymbolTable.ErrorNameList][name];
        const err = this[SymbolTable.ErrorList][errorIndex];
        if (msg) {
            err.msg = msg;
        }
        this[SymbolTable.throwError](err);
    }

    throwRuntimeError(msg = null) {
        this.throwErrorByCode(1, msg);
    }

    [SymbolTable.throwError](err) {
        if (!err) {
            this.throwErrorByName(this.constant.innerErrors.ErrorNotFound);
        } else {
            this[SymbolTable.callErrorFunc](err);
            throw err;
        }
    }

    [SymbolTable.callErrorFunc](err) {
        if (err.handleFunc) {
            err.handleFunc(err);
        } else {
            this[SymbolTable.commonHandleFunc](err);
        }
    }

    [SymbolTable.commonHandleFunc](error) {
        console.log(error.msg);
    }
}

class CustomError extends Error {
    constructor(options, isInnerError = false) {
        if (!isInnerError) {
            const result = Validator('errorOptions', options);

            if (result !== true) {
                throw new Error(result[0].message);
            }
        }
        super(options.msg);
        this.code = options.code;
        this.msg = options.msg;
        this.name = options.name;
        this.handleFunc = options.handleFunc || null;
    }
}

module.exports = ErrorHandle;
