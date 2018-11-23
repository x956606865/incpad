const nativePath = require('path'),
    fs = require('fs');

function existPath(value, validator) {
    let flag = false;
    if (nativePath.isAbsolute(value)) {
        flag = fs.existsSync(value);
    } else {
        flag = fs.existsSync(nativePath.resolve(value));
    }
    if (!flag) {
        return validator.makeError('existPathError', null, value);
    }
    return true;
}

module.exports = {
    schemaList: {
        desc: {
            entry: {
                type: 'existPath',
            },
            type: {
                type: 'enum',
                values: ['node', 'webpack', 'npmScript', 'babel-node'],
            },
        },
        errorOptions: {
            code: {
                type: 'number',
                min: 1000,
            },
            msg: 'string',
            name: 'string',
            handleFunc: {
                type: 'function',
                optional: true,
            },
        },
    },
    customCheckerList: {
        existPath,
    },
    customMessages: {
        existPathError: 'path not exist',
    },
};
