const glob = require('glob');
const path = require('path');
const critical = require('critical');

glob.glob('_site/**/*.html', async (err, matches) => {
    const files = matches.map(function (match) {
        return path.relative('_site', match);
    });
    for (const filePath of files) {
        const criticalObject = await critical.generate({
            base: '_site',
            src: filePath,
            target: filePath,
            inline: true,
            dimensions: [
                {
                    width: 1300,
                    height: 900
                },
                {
                    width: 600,
                    height: 900
                },
                {
                    width: 360,
                    height: 640
                }
            ],
            concurrency: 1,
            // Minify critical-path CSS when inlining
            minify: true,
            // Extract inlined styles from referenced stylesheets
            extract: true,
            // Bump penthouse’s page load timeout to 2 minutes to avoid crashes
            // which could cause lingering processes as it’s possible some pages
            // can take a long time to load.
            penthouse: { timeout: 120000 }
        })

        console.log(`Critical path for ${filePath}`, criticalObject);
    }

    if (err) {
        console.log(err);
    }
});
