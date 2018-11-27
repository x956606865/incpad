const validatorSchema = require('./validator.schame');
const validator = require('@incpad/validator');
validator.initValidatorWithObject(validatorSchema);

function getGeo(cbSucc, cbErr) {
    validator.checkFuncParam('getGeoParamCheck', { cbSucc, cbErr });
    return navigator.geolocation.getCurrentPosition(
        data => {
            cbSucc(data);
        },
        err => {
            cbErr(err);
        },
        {
            enableHighAccuracy: true,
            timeout: 20000,
            //去除该条属性，因为在安卓上会导致无法获取到地理位置
            // maximumAge: 3600000
        }
    );
}

module.exports = {
    getGeo,
};
