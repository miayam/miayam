const { merge } = require('webpack-merge');
const path = require('path');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
    mode: 'production',
    output: {
        path: path.join(__dirname, '../_site'),
        filename: 'scripts/[name]-[contenthash].js',
        publicPath: '/'
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: { // Although there's not much JavaScript and CSS here, code-split it.
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$i/,
                    chunks: 'all',
                    enforce: true
                },
                commons: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    enforce: true
                },
            }
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css'
        }),
        new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true,
                },
                // Run cssnano in safe mode to avoid
                // potentially unsafe transformations.
                safe: true,
            },
            canPrint: false
        })
    ]
});
