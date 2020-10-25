const { merge } = require('webpack-merge');
const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
    mode: 'production',
    output: {
        path: path.join(__dirname, '../_site'),
        filename: '[name]/[name]-[contenthash].js',
        publicPath: 'assets'
    },
    optimization: {
        splitChunks: { // Although there's not much JavaScript and CSS here, code-split it.
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.scss$/,
                    chunks: 'all',
                    enforce: true
                },
                commons: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [
        new MinifyPlugin()
    ]
});
