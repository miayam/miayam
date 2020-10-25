const { merge } = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
    mode: 'development',
    output: {
        // Why '../_site' instead of '_site'? It must be relative to webpack.config.js on root folder.
        path: path.join(__dirname, '../_site'),
        filename: '[name]-[contenthash].js'
    }
});
