const {
    initValidatorWithObject,
    Validator,
    checkFuncParam,
} = require('../index');
const schema = {
    schemaList: {
        getGeoParamCheck: {
            cbSucc: 'function',
            cbErr: 'function',
        },
    },
    customCheckerList: {},
    customMessages: {},
};
initValidatorWithObject(schema);
describe('test @incpad/validator', () => {
    describe('test function:checkFuncParam', () => {
        it('should valid when param with right type', () => {
            let flag = null;
            try {
                checkFuncParam('getGeoParamCheck', {
                    cbSucc: () => {},
                    cbErr: () => {},
                });
                flag = true;
            } catch (e) {
                flag = false;
            }
            expect(flag).toBe(true);
        });
        it('should invalid when param with error type', () => {
            let flag = null,
                errorMsg = '';
            try {
                checkFuncParam('getGeoParamCheck', {
                    cbSucc: false,
                    cbErr: () => {},
                });
                flag = true;
            } catch (e) {
                flag = false;
                errorMsg = e.toString();
            }
            expect(flag).toBe(false);
            expect(errorMsg).toBe('Error: function params type not valid');
        });
    });
});
