const { merge } = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
    mode: 'development',
    output: {
        path: path.join(__dirname, '../_site'),
        filename: 'assets/scripts/[name]-[contenthash].js',
        publicPath: '/'
    }
});
