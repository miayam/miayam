module.exports = (config) => {
    // Needed to prevent eleventy from ignoring changes to generated
    // templates since it is in our `.gitignore`
    config.setUseGitIgnore(false);

    // Pass-through files
    config.addPassthroughCopy('src/assets');
    config.addPassthroughCopy({ 'src/scripts/utilities/sw.js': 'sw.js' });
    config.addPassthroughCopy({ 'src/public/favicon.ico': 'favicon.ico' });
    config.addPassthroughCopy({ 'src/public/manifest.webmanifest': 'manifest.webmanifest' });
    config.addPassthroughCopy({ 'src/public/robot.txt': 'robot.txt' });

    return {
        dir: {
            input: 'src',
            output: '_site',
            layouts: '_includes/templates',
            includes: '_includes',
        },
        templateFormats: ["md"],
        htmlTemplateEngine: 'pug'
    };
};
