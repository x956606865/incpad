const modCache = {};
const cacheTime = 1000 * 60;
/**
 * get module by name
 * @param {String} moduleName - module name
 * @return {Module} -
 */
function getMod(moduleName) {
    return _requireMod(moduleName);
}

function _requireMod(moduleName) {
    if (!modCache[moduleName]) {
        const mod = require(moduleName);
        modCache[moduleName] = mod;
        setTimeout(removeModFromCache, cacheTime, moduleName);
    }

    return modCache[moduleName];
}
function removeModFromCache(moduleName) {
    modCache[moduleName] = null;
}
module.exports = {
    getMod,
    tester: () => true,
};
