const nativePath = require('path'),
    fs = require('fs');

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

module.exports = {
    convertPathWithinCustomRootDir,
    convertPathWithinRuntimeDir,
    checkExist,
    resolve: nativePath.resolve,
};