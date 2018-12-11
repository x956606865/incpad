const constants = require('./constant').getConstant('BaseToolConstant');
const get = require('lodash.get');

function CreateSymbolTool(keyArray) {
    if (!Array.isArray(keyArray)) {
        throw new Error('error type');
    }
    const result = {};
    keyArray.map(key => {
        if (typeof key !== 'string') {
            throw new Error('error type');
        }
        result[key] = Symbol(key);
    });
    return result;
}

function getValueFromEnv(envKey, defaultValue = null) {
    return process.env[envKey] || defaultValue;
}

function getRuntimePlatform() {
    const checkList = {
        [constants.JEST]: _isJestEnv,
        [constants.BROWSER]: _isBrowserEnv,
        [constants.RNLike]: _isReactNativeLikeEnv,
        [constants.NODE]: _isNodeEnv,
    };
    for (const [key, value] of Object.entries(checkList)) {
        if (value()) {
            return key;
        }
    }
    return constants.UNKNOWN;
}

function _isJestEnv() {
    //jest env has both window and global ,and global === window
    if (
        typeof window !== 'undefined' &&
        typeof global !== 'undefined' &&
        window === global
    ) {
        return true;
    }
    return false;
}

function _isBrowserEnv() {
    return ![typeof window, typeof document].includes('undefined');
}

function _isReactNativeLikeEnv() {
    //RN has window object too,but haven't localStorage prop
    if (typeof global === 'undefined') {
        return false;
    }
    const r = get(global, 'navigator.product');
    if (r === constants.RN) {
        return true;
    }
    return false;
}

function _isNodeEnv() {
    //node has global bug has not window
    if (typeof process === 'undefined') {
        return false;
    }
    const r = get(process, 'release.name');
    if (r === 'node') {
        return true;
    }
    return false;
}

function pipeAsyncFuncs(...fns) {
    return arg =>
        fns.reduce(
            (prev, cur) =>
                prev
                    .then(data => Promise.resolve(cur(data)))
                    .catch(e => {
                        throw e;
                    }),
            Promise.resolve(arg)
        );
}

module.exports = {
    CreateSymbolTool,
    getValueFromEnv,
    getRuntimePlatform,
    pipeAsyncFuncs,
};
