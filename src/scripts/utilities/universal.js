// If compiled by the html-webpack-plugin
// HTML_WEBPACK_PLUGIN is set to true:
const backend = typeof HTML_WEBPACK_PLUGIN !== 'undefined';

module.exports = () => {
    return 'Hello World from ' + (backend ? 'backend' : 'frontend');
};
