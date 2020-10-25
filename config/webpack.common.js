const ENTRY_POINTS = [
    'home',
    'blog'
];
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const multipleHtmlPlugins = ENTRY_POINTS.map(name => {
    return new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/_includes/templates/base/index.pug'),
        filename: path.resolve(__dirname, `../src/_includes/templates/${name}/index.pug`),
        hash: true,
        inject: false
    });
});

module.exports = {
    entry: ENTRY_POINTS.reduce((prev, curr) => {
        return {
            ...prev,
            [curr]: `./src/_includes/templates/${curr}/index.js`
        }
    }, {}),
    plugins: [
        ...multipleHtmlPlugins
    ],
    resolve: {
        alias: {
            '@atoms': './src/_includes/atoms/',
            '@molecules': './src/_includes/molecules/',
            '@organisms': './src/_includes/organisms/',
            '@templates': './src/_includes/templates/'
        }
    }
}

