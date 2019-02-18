let nativePath = null,
    fs = null;
const { getRuntimePlatform } = require('./base');
const constants = require('./constant').getConstant('BaseToolConstant');
if (getRuntimePlatform() === constants.NODE) {
    nativePath = require('path');
    fs = require('fs');
}

function convertPathWithinCustomRootDir(rootDir, path) {
    return nativePath.resolve(rootDir, path);
}

function convertPathWithinRuntimeDir(path) {
    return convertPathWithinCustomRootDir(process.cwd(), path);
}

function checkExist(path) {
    try {
        fs.accessSync(path);
        return true;
    } catch (e) {
        return false;
    }
}

function readFileSync(path, options) {
    return fs.readFileSync(path, options);
}

function readFileWithinRuntimeDirSync(path, options) {
    return fs.readFileSync(convertPathWithinRuntimeDir(path), options);
}

module.exports = {
    convertPathWithinCustomRootDir,
    convertPathWithinRuntimeDir,
    checkExist,
    readFileSync,
    readFileWithinRuntimeDirSync,
};
