//cSpell:disable
//handle lodash-modularized
const isNil = require('lodash.isnil');
const isString = require('lodash.isstring');
const curry = require('lodash.curry');
const { initValidatorWithObject, Validator } = require('@incpad/validator');
const errorHandle = require('@incpad/error-handle');
const schame = require('./validator.schema');
const errorSchema = require('./error.schema');
const errorHandleInstance = new errorHandle();
errorHandleInstance.initCustomErrorWithObject(errorSchema);
initValidatorWithObject(schame);
//load adapter
const normalAdapter = require('./adapter/normal.adpter');

const adapters = [normalAdapter];
/**
 * load module when it in need,
 * @date 2018-09-20
 * @param {String} name - module name
 * @param {*} context - context that store the module
 * @param {String} [nickname=name] - the key in context,same as name by default
 * @param {boolean} [force=false] - if set true,it will override the context object
 * @returns {Object | void} - return module if context is not set
 */
function need(name, context = {}, nickname) {
    //check is name valid or not
    checkName(name);
    //make sure context is object
    //type of null is object,so just fix this
    if (!(typeof context === 'object' && !isNil(context))) {
        context = {};
    }
    nickname = getValidAlias(nickname, name);
    //load the module
    let mod = null;
    const findAdapter = curry(checkAdapter)(name);
    const adapter = adapters.find(findAdapter);
    if (adapter !== undefined) {
        mod = adapter.getMod(name);
    }
    context[nickname] = mod;
    return mod;
}
/**
 * if nickname is valid return nickname,or return modulename
 * @param {String} nickname - nickname
 * @param {String} moduleName - module name
 * @return {String} - name
 */
function getValidAlias(nickname, moduleName) {
    if (isString(nickname) && nickname.length > 0) {
        return nickname;
    }
    return moduleName;
}
/**
 * check is name valid
 * @param {String} name - name
 * @return {Boolean} - result
 */
function checkName(name) {
    if (isString(name) && name.length > 0) {
        return true;
    }
    throw new Error('invalid name');
}
function checkAdapter(moduleName, adapter) {
    if (adapter.tester(moduleName)) {
        return true;
    }
}
function addAdapter(adapterOptions) {
    const validate = Validator('adapter', adapterOptions);
    if (validate !== true) {
        errorHandleInstance.throwErrorByName('formatError');
    }
    adapters.unshift(adapterOptions);
}
module.exports = {
    need,
    addAdapter,
};
