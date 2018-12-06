const BaseToolConstant = {
    UNKNOWN: 'Unknown',
    BROWSER: 'Browser',
    NODE: 'Node',
    RN: 'ReactNative',
    RNLike: 'ReactNativeLike',
    JEST: 'Jest',
};
const constant = {
    BaseToolConstant,
};
function conbineWithConstantObject(name, object) {
    //need validate but haven't
    if (!constant[name]) {
        constant[name] = {};
    }
    constant[name] = Object.assign(constant[name], object);
}
function getConstant(name) {
    if (name) {
        return constant[name];
    }
    return constant;
}
module.exports = {
    getConstant,
    conbineWithConstantObject,
};
