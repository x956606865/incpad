const { CreateSymbolTool, getRuntimePlatform } = require('../tools/base');
const constants = require('../tools/constant');
describe('Test for CreateSymbolTool', () => {
    test('it should return a symbol map', () => {
        const testList = ['name1', 'name2', 'name3'];
        const result = CreateSymbolTool(testList);
        testList.map(name => {
            expect(typeof result[name]).toBe('symbol');
        });
    });
});
describe('Test for getRuntimePlatform', () => {
    test('it should be in JEST env', () => {
        const env = getRuntimePlatform();
        expect(env).toBe(constants.JEST);
    });
});
