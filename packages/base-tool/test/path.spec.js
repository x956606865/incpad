const path = require('../path');
const nativePath = require('path');
describe('test path module', () => {
    describe('test convertPathWithinCustomRootDir', () => {
        it('should be pwd with parent dir plus testDir', () => {
            const parentDir = nativePath.resolve(__dirname, '../');
            const targetPath = path.convertPathWithinCustomRootDir(
                parentDir,
                'test'
            );
            expect(targetPath).toBe(__dirname);
        });
    });
});
