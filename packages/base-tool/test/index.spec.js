const { CreateSymbolTool } = require('../index');
describe('Test for CreateSymbolTool', () => {
    test('it should return a symbol map', () => {
        const testList = ['name1', 'name2', 'name3'];
        const result = CreateSymbolTool(testList);
        testList.map(name => {
            expect(typeof result[name]).toBe('symbol');
        });
    });
});
