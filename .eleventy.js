const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");

module.exports = (config) => {
    // Needed to prevent eleventy from ignoring changes to generated
    // templates since it is in our `.gitignore`
    config.setUseGitIgnore(false);

    // Pass-through files
    config.addPassthroughCopy({ 'src/assets/public': '/' });
    config.addPassthroughCopy({ 'src/scripts/utilities/sw.js': 'sw.js' });
    config.addPassthroughCopy('src/assets/files');
    config.addPassthroughCopy('src/assets/images');

    // Markdown 
    config.setLibrary('md',
        require('markdown-it')('commonmark')
            .use(require('markdown-it-attrs'))
    );

    // Strip HTML
    config.addFilter('stripHtml', (content) => {
        const strippedContent = content.replace(/(<([^>]+)>)/gi, "")
                                       .replace(/\r?\n|\r/gi, " ")
                                       .trim();
        return strippedContent;
    });

    // Minify any files
    config.addPlugin(eleventyPluginFilesMinifier);

    // Syntax highlighting on Markdown
    config.addPlugin(syntaxHighlight, {

        // Change which syntax highlighters are installed
        templateFormats: ["*"], // default

        // Or, just njk and md syntax highlighters (do not install liquid)
        // templateFormats: ["njk", "md"],

        // init callback lets you customize Prism
        init: function ({ Prism }) {
            Prism.languages.myCustomLanguage = '';
        },

        // Added in 3.0, set to true to always wrap lines in `<span class="highlight-line">`
        // The default (false) only wraps when line numbers are passed in.
        alwaysWrapLineHighlights: true,

        // Added in 3.0.2, set to false to opt-out of pre-highlight removal of leading
        // and trailing whitespace
        trim: true,

        // Added in 3.0.4, change the separator between lines (you may want "\n")
        lineSeparator: "<br>",
    });

    return {
        dir: {
            input: 'src',
            output: '_site',
            layouts: '_includes/templates',
            includes: '_includes',
        },
        templateFormats: ['md', 'pug', 'njk'],
        htmlTemplateEngine: 'pug'
    };
};
