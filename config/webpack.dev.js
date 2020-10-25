const { merge } = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
    mode: 'development',
    output: {
        filename: 'assets/[name]/[name]-[contenthash].js'
    }
});
