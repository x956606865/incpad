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

function test() {}

test();
module.exports = {
    CreateSymbolTool,
    getValueFromEnv,
};
