const { merge } = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
    mode: 'development',
    output: {
        path: path.join(__dirname, '../_site'),
        filename: 'scripts-[name]-[contenthash].js',
        publicPath: '/'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles-[name].css'
        })
    ]
});
