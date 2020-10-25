const { merge } = require('webpack-merge');
const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
    mode: 'production',
    output: {
        path: path.join(__dirname, '../_site'), // Why '../_site' instead of 'dist'? It must be relative to webpack.config.js on root folder. It's kind of weird.
        filename: '[name]-[contenthash].js',
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
