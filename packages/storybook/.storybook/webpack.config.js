// module.exports = {
//     module: {
//         rules: [
//             {
//                 test: /\.stories\.js?$/,
//                 loaders: [
//                     require.resolve('@storybook/addon-storysource/loader'),
//                 ],
//                 enforce: 'pre',
//             },
//             {
//                 test: /\.css$/,
//                 use: ['style-loader', 'css-loader'],
//             },
//         ],
//     },
// };

// const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
    // Extend defaultConfig as you need.

    // For example, add typescript loader:
    defaultConfig.module.rules.push({
        test: /\.stories\.js?$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre',
    });
    defaultConfig.resolve.extensions.push('.web.js');
    defaultConfig.resolve.extensions.push('.web.jsx');
    defaultConfig.resolve.alias['react-native'] = 'react-native-web';
    console.log(defaultConfig.resolve);

    // defaultConfig.resolve.extensions.push(".ts", ".tsx");

    return defaultConfig;
};
