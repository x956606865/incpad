const validator = require('fastest-validator'),
    {
        schemaList,
        customCheckerList,
        customMessages,
    } = require('./validator.schema');

let v = null;
const compiledCheckerCache = {};
//-----------------------------------------
// do init
function initValidator() {
    if (v === null) {
        v = new validator({
            messages: customMessages,
        });
        for (const [key, func] of Object.entries(customCheckerList)) {
            v.add(key, value => func(value, v));
        }
    }
}

function initCheckerSchema(checkerName) {
    if (!compiledCheckerCache[checkerName]) {
        const descScheme = schemaList[checkerName];
        initValidator();
        compiledCheckerCache[checkerName] = v.compile(descScheme);
    }
}

//-----------------------------------------
//get checker
function getChecker(checkerName) {
    initCheckerSchema(checkerName);
    return compiledCheckerCache[checkerName];
}

//-----------------------------------------
//exported checker
/**
 * check the validation of the desc.json
 * @param {String} checkerName - checker name
 * @param {*} target - desc object
 * @returns {*} - the result
 */
function Validator(checkerName, target) {
    return getChecker(checkerName)(target);
}

module.exports = {
    Validator,
};
