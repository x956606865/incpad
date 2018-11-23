const MSG = 'error format of adapter';
module.exports = {
    schemaList: {
        adapter: {
            getMod: 'function',
            tester: 'function',
        },
    },
    customCheckerList: {},
    customMessages: {
        function: MSG,
        required: MSG,
    },
};
