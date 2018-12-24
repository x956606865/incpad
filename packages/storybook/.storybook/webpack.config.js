module.exports = {
    module: {
        rules: [
            {
                test: /\.stories\.js?$/,
                loaders: [
                    require.resolve('@storybook/addon-storysource/loader'),
                ],
                enforce: 'pre',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};
