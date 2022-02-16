const fs = require('fs');
const path = require('path');
const basePath = path.resolve(__dirname, '../src'); // It is relative to `config` folder.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const PostCSSPresetEnv = require('postcss-preset-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ENTRY_POINTS = fs.readdirSync(`${basePath}/components/templates`) 
                       .filter(template => template !== 'base');

const multipleHtmlPlugins = ENTRY_POINTS.map(name => {
    return new HtmlWebpackPlugin({
        template: `${basePath}/components/templates/base/index.pug`,
        filename: `${basePath}/components/templates/${name}/index.pug`,
        chunks: [`${name}`],
        inject: false,
        hash: true
    });
});

module.exports = {
    entry: ENTRY_POINTS.reduce((prev, curr) => {
        return {
            ...prev,
            [curr]: `./src/components/templates/${curr}/index.js` // Relative to webpack.config.js file
        }
    }, {}),
    plugins: [
        ...multipleHtmlPlugins,
        new HtmlWebpackPugPlugin({
            ast: true,
            adjustIndent: true
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
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '@atoms': `${basePath}/components/atoms`,
            '@molecules': `${basePath}/components/molecules`,
            '@organisms': `${basePath}/components/organisms`,
            '@templates': `${basePath}/components/templates`,
            '@constants': `${basePath}/constants`,
            '@scripts': `${basePath}/scripts`,
            '@styles': `${basePath}/styles`,
            '@fonts': `${basePath}/assets/fonts`
        }
    }
}
