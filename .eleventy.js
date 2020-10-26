module.exports = (config) => {
    // Needed to prevent eleventy from ignoring changes to generated
    // templates since it is in our `.gitignore`
    config.setUseGitIgnore(false);

    return {
        dir: { input: 'src', output: '_site' },
        htmlTemplateEngine: 'pug, md'
    };
};
