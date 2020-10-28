const ENTRY_POINTS = [
    'blog',
    'home',
    '404',
    'project',
    'about'
];
const path = require('path');
const basePath = path.resolve(__dirname, '../src'); // It is relative to `config` folder.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const PostCSSPresetEnv = require('postcss-preset-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const multipleHtmlPlugins = ENTRY_POINTS.map(name => {
    return new HtmlWebpackPlugin({
        template: `${basePath}/_includes/templates/base/index.pug`,
        filename: `${basePath}/_includes/templates/${name}/index.pug`,
        chunks: [`${name}`],
        hash: true,
        inject: false
    });
});

module.exports = {
    entry: ENTRY_POINTS.reduce((prev, curr) => {
        return {
            ...prev,
            [curr]: `./src/_includes/templates/${curr}/index.js` // Relative to webpack.config.js file
        }
    }, {}),
    plugins: [
        new Dotenv(),
        ...multipleHtmlPlugins,
        new HtmlWebpackPugPlugin({
            ast: true
        })
    ],
    module: {
        rules: [
            {
                test: /.js$/, // Enable modern JavaScript (ES6).
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/, // Enable Sassy CSS because we need mixin and stuff. Vanilla CSS is very hard my friend.
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: process.env.NODE_ENV === 'dev'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [PostCSSPresetEnv],
                            // Does not respect devtools option
                            sourceMap: true
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '@atoms': `${basePath}/_includes/atoms`,
            '@molecules': `${basePath}/_includes/molecules`,
            '@organisms': `${basePath}/_includes/organisms`,
            '@templates': `${basePath}/_includes/templates`,
            '@scripts': `${basePath}/scripts`,
            '@styles': `${basePath}/styles`
        }
    }
}

