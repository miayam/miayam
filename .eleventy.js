const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const chunk = require('lodash.chunk');

module.exports = (config) => {
    // Needed to prevent eleventy from ignoring changes to generated
    // templates since it is in our `.gitignore`
    config.setUseGitIgnore(false);

    // Pass-through files
    config.addPassthroughCopy({ 'src/assets/public': '/' });
    config.addPassthroughCopy({ 'src/scripts/utilities/sw.js': 'sw.js' });
    config.addPassthroughCopy('src/assets/files');
    config.addPassthroughCopy('src/assets/images');
    config.addPassthroughCopy('src/assets/videos');

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

    // Categorize contents
    config.addCollection('categories', (collection) => {
        // Get unique list of tags
        let tagSet = new Set();
        collection.getAllSorted().map(item => {
            if ("tags" in item.data) {
                const tags = item.data.tags;
                // Optionally filter things out before you iterate over.
                for (let tag of tags) {
                    tagSet.add(tag);
                }
            }
        });

        const paginationSize = 5;
        const tagMap = [];
        const tagArray = [...tagSet];

        for (let tagName of tagArray) {
            const tagItems = collection.getFilteredByTag(tagName);
            const tagItemsWithPrevAndNext = tagItems.map((tagItem, index, thisArray) => {
                const prev = thisArray[index - 1];
                const next = thisArray[index + 1];
                tagItem.data["prev"] = {...tagItem.data["prev"], [tagName]: prev};
                tagItem.data["next"] = {...tagItem.data["next"], [tagName]: next};
                return tagItem;
            });

            const pagedItems = chunk(tagItemsWithPrevAndNext, paginationSize);
            pagedItems.forEach((pagedItem, index) => {
                tagMap.push({
                    tagName,
                    pageNumber: index,
                    pageData: pagedItem
                });
            });
       }

       return tagMap;
    });

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
