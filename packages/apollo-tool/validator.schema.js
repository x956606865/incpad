module.exports = {
    schemaList: {
        requestConfig: {
            host: 'string',
            port: 'string',
            appId: 'string',
            clusterName: 'string',
            namespaceName: {
                type: 'array',
                item: 'string',
            },
        },
    },
    customCheckerList: {},
    customMessages: {},
};
