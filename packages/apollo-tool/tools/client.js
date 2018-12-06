const axios = require('axios');
const defaultConfig = require('../config/server');
const errorHandle = require('@incpad/error-handle');
const errorSchema = require('../error.schema');
const { tap } = require('@incpad/base-tool/tools/debug');
const { initValidatorWithObject, Validator } = require('@incpad/validator');
const validatorSchema = require('../validator.schema');
const { doWrapAndPipeData } = require('@incpad/base-tool/tools/wrapper');
const errorHandleI = new errorHandle();
const env = {
    DEV: 'dev',
    PRO: 'pro',
};
initValidatorWithObject(validatorSchema);
errorHandleI.initCustomErrorWithObject(errorSchema);

function getUrlsByConfig(config, namespace) {
    return {
        withoutCache: `${config.host}:${config.port}/configs/${config.appId}/${
            config.clusterName
        }/${namespace}${config.clientIp ? '?ip=' + config.clientIp : ''}`,
    };
}

function mergeAndValidateConfig(config) {
    const realConfig = combineDefaultConfig(config);
    validateConfig(realConfig);
    return realConfig;
}

function validateConfig(config) {
    const validateResult = Validator('requestConfig', config);
    if (validateResult !== true) {
        errorHandleI.throwErrorByName('appConfigFormatError');
    }
}

function combineDefaultConfig(config) {
    return Object.assign({}, defaultConfig[config.env || env.DEV], config);
}

function _getConfigSkipCache(config = {}) {
    const map = config.namespaceName.map(namespace =>
        axios.get(getUrlsByConfig(config, namespace).withoutCache)
    );

    return Promise.all(map);
}

function mergeResult(axiosResult) {
    let result = {};
    const validStatus = [200, 304];
    axiosResult.map(r => {
        if (!validStatus.includes(r.status)) {
            throw new Error(r.status);
        }
        result = Object.assign({}, result, r.data.configurations);
    });
    return result;
}

function wrapFunc(func, context = null) {
    return doWrapAndPipeData(func, {
        before: mergeAndValidateConfig,
        after: mergeResult,
        context,
    });
}

const getConfigSkipCache = wrapFunc(_getConfigSkipCache);
getConfigSkipCache({
    appId: 'AirlineRatingsID2',
    env: env.DEV,
    namespaceName: ['incpad.adConfig', 'application'],
}).catch(tap);

module.exports = {
    env,
    getConfigSkipCache: wrapFunc(_getConfigSkipCache),
};
