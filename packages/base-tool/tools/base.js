const constants = require('./constant').getConstant('BaseToolConstant');

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
    //RN has window object too,but haven't localStorage prop
    if (typeof window !== 'undefined' && window.localStorage) {
        return true;
    }
    return false;
}

function _isReactNativeLikeEnv() {
    //RN has window object too,but haven't localStorage prop
    if (typeof window !== 'undefined' && !window.localStorage) {
        return true;
    }
    return false;
}

function _isNodeEnv() {
    //node has global bug has not window
    if (typeof global !== 'undefined' && typeof window === 'undefined') {
        return true;
    }
    return false;
}

module.exports = {
    CreateSymbolTool,
    getValueFromEnv,
    getRuntimePlatform,
};
