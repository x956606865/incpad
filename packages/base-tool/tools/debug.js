adapterToRN();
const _debug = require('debug');
let OPTIONS = {
    RUN_ONLY_DEBUG: true,
};
const customDebbuger = {};
_debug.enable('*');
addNewDebugger('debugger');

//rn has window object, but haven't localStorage prop
function adapterToRN() {
    if (typeof window !== 'undefined' && !window.localStorage) {
        process.type = 'renderer';
        window.localStorage = {
            debug: '*',
            getItem: () => '*',
        };
    }
}

function addNewDebugger(name) {
    if (typeof name !== 'string') {
        throw new Error('debugger name must be string');
    }
    customDebbuger[name] = _debug(name);
}

function getCustomDebugger(name) {
    if (typeof name !== 'string') {
        throw new Error('debugger name must be string');
    }
    if (!customDebbuger[name]) {
        throw new Error('debugger not exist');
    }
    const debuger = function(...args) {
        if (!OPTIONS.RUN_ONLY_DEBUG || __DEV__) {
            customDebbuger[name](...args);
        }
    };
    return debuger;
}

/**
 * update the options
 * @param options {*} -
 * @returns {void} -
 */
function updateOptions(options) {
    try {
        OPTIONS = Object.assign(OPTIONS, options);
    } catch (e) {
        throw e;
    }
}

/**
 * console and return the params
 * @param args {*[]} -
 * @returns {*[]} -
 * @example funcA(xxx,tap(varA))
 */
function tap(...args) {
    const logTool = getCustomDebugger('debugger');
    logTool(...args);
    return args;
}

updateOptions({
    RUN_ONLY_DEBUG: false,
});
module.exports = {
    tap,
    updateOptions,
    addNewDebugger,
    getCustomDebugger,
};
