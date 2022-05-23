// Modified `@pustelto/css-split`.
const fsOriginal = require("fs");
const { COPYFILE_FICLONE } = fsOriginal.constants;
const fs = fsOriginal.promises;
const path = require("path");
const glob = require("glob");
const url = require("url");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { PurgeCSS } = require("purgecss");

/**
 * Options params:
 * - `targetFolder` - path to the folder with a CSS and HTML files, usually a dist folder
 * - `html` - array of strings or objects with paths to HTML files. Each item in the array produce one CSS file for the HTML files cover by that path glob. Can be direct path to one HTML file or a glob to contain multiple HTML files in a folder. When using object, it has to have shape `{path: <string>, outputName: <string>}. path prop contain glob for HTML and outputName will be used to name a CSS chunk. This is mainly useful for glob pattern selecting multiple HTMl files.
 * - `cssPath` - path to a CSS file which should be code splitted
 * - `uniquePath` - path appended to CSS chunk name
 * @param {Options} opt
 */
function splitCSS(opt) {
  const pathToCss = path.join(process.cwd(), opt.targetFolder, opt.cssPath);
  const { dir: cssDir } = path.parse(pathToCss);

  opt.html.forEach((html) => {
    let htmlPath;

    if (typeof html === "string") {
      htmlPath = path.join(process.cwd(), opt.targetFolder, html);
    }

    if (html.path) {
      htmlPath = path.join(process.cwd(), opt.targetFolder) + "/" + html.path;
    }

    console.log(`Creating CSS chunk for: `, htmlPath);

    glob(htmlPath, async (error, files) => {
      if (error) {
        console.log(error);
      }

      try {
        if (files.length === 0) return;

        const { base: rootFolder } = path.parse(path.resolve(process.cwd(), opt.targetFolder));
        const [cssName] = opt.cssPath.split("/").slice(-1);
        const cssChunkName = getChunkName(html, rootFolder, opt.uniquePath);

        // 1. Create copies of original CSS file for all html files
        await fs.copyFile(pathToCss, path.join(cssDir, cssChunkName), COPYFILE_FICLONE);

        // 2. Update <link> in HMLT files to point to new stylesheet
        const fileUpdates = await Promise.all(
          files.map(async (file) => {
            const content = await fs.readFile(file, "utf-8");

            const cssLinkSelectors = ['link[rel="stylesheet"]', 'link[rel="preload"][as="style"]'];
            const dom = new JSDOM(content);
            const { document } = dom.window;
            const cssLinks = document.querySelectorAll(cssLinkSelectors.join(", "));

            Array.from(cssLinks)
              .filter((link) => {
                const href = url.parse(link.getAttribute("href"));
                const { pathname } = href;
                const [fileName] = pathname.split("/").slice(-1);

                return fileName === cssName;
              })
              .forEach((link) => {
                const oldHref = url.parse(link.getAttribute("href"));
                const { pathname, search } = oldHref;
                const pathArr = pathname.split("/");
                const newHref = (pathArr.splice(-1, 1, cssChunkName), pathArr).join("/") + search;

                link.setAttribute("href", newHref);
              });

            await fs.writeFile(file, dom.serialize());
          })
        );

        // 3. Purge the CSS files to create separete CSS files for each page
        const purgeCSSResult = await new PurgeCSS().purge({
          content: [htmlPath],
          css: [path.join(cssDir, cssChunkName)],
          whitelist: [":before", ":after", ":focus"],
        });
        const concatenateCSS = purgeCSSResult.map((res) => res.css).join();
        await fs.writeFile(path.join(cssDir, cssChunkName), concatenateCSS, "utf-8");
        console.log(
          `CSS chunk named ${cssChunkName} for HTML on path ${htmlPath} created successfully.`
        );
      } catch (e) {
        console.log("Error", e);
      }
    });
  });
}

function getChunkName(html, root, uniquePath) {
  if (html.outputName) {
    return `${html.outputName}.css`;
  }

  const appendedPath = uniquePath.replace('.html', '');

  try {
    const { dir } = path.parse(html.path || html);
    const [closestFolder] = dir.split("/").slice(-1);

    if (root === closestFolder || !closestFolder) {
      return "index.css";
    }

    if (!closestFolder.match(/^\*\*?$/)) {
      return `${appendedPath}-${closestFolder}.css`;
    }

    // fallback if we can't decide on another file name
    return `chunk-${Math.random().toString(36).substr(2, 9)}.css`;
  } catch (error) {
    console.error("Error when deciding CSS chunk name", error);
    return error;
  }
}

const anticiatedPaginationRoutes = Array.from(new Array(1000)).map((_, index) => {
  return {
    path: `${index + 1}`,
    template: 'home',
  };
})

const routes = [
  {
    path: 'articles',
    template: 'blog'
  },
  {
    path: 'docs',
    template: 'docs'
  },
  {
    path: 'index.html',
    template: 'home'
  },
  {
    path: 'tags',
    template: 'home'
  },
  {
    path: 'about',
    template: 'about'
  },
  ...anticiatedPaginationRoutes
];

// Grab all files that ends with index.html.
glob.glob(`_site/**/*.html`, async (err, matches) => {
  const groups = {};

  // Remove `_site`.
  const files = matches.map(match => match.replace('_site/', ''));

  // Grap all files filtered by included paths (articles | docs | index.html | tags | about | 1 - 1000 )
  const filteredFiles = files.filter((file => {
    const subPath = file.split('/')[0];
    return routes
      .map(route => route.path)
      .includes(subPath);
  }));

  filteredFiles.forEach(file => {
    const subPath = file.split('/')[0];
    if (Object.keys(groups).includes(subPath)) {
      groups[subPath].push(file);
    } else {
      groups[subPath] = [file];
    }
  });

  Object.keys(groups).forEach(key => {
    const route = routes.filter(route => route.path === key)[0];
    const CONFIG = {
      targetFolder: '_site',
      html: groups[key],
      cssPath: `styles-${route.template}.css`,
      uniquePath: route.path,
    };
    splitCSS(CONFIG);
  });

  if (err) {
    console.log('CSS split is aborted...')
  }
});
