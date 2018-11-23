module.exports = {
    schemaList: {
        errorOptions: {
            code: {
                type: 'number',
                min: 1000,
            },
            msg: 'string',
            name: 'string',
            handleFunc: {
                type: 'function',
                optional: true,
            },
        },
    },
    customCheckerList: {},
    customMessages: {},
};
