const validator = require('fastest-validator');

let v = null,
    schemaListG = null;
const compiledCheckerCache = {};
//-----------------------------------------
// do init
function initValidatorWithFile(schemaPath) {
    const {
        schemaList,
        customCheckerList,
        customMessages,
    } = require(schemaPath);
    schemaListG = schemaList;
    if (v === null) {
        v = new validator({
            messages: customMessages,
        });
        for (const [key, func] of Object.entries(customCheckerList)) {
            v.add(key, value => func(value, v));
        }
    }
}

function initValidatorWithObject(schemaObject) {
    const { schemaList, customCheckerList, customMessages } = schemaObject;
    schemaListG = schemaList;
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
        const descScheme = schemaListG[checkerName];
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
 * @param {String} checkerName - checkerName
 * @param {*} target - desc object
 * @returns {*} - the result
 */
function Validator(checkerName, target) {
    return getChecker(checkerName)(target);
}

module.exports = {
    Validator,
    initValidatorWithFile,
    initValidatorWithObject,
};
