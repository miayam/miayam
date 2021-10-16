const workboxBuild = require('workbox-build');
const fs = require('fs');
const terser = require('terser');
const swSrc = 'src/scripts/utilities/sw.js';
const swDest = '_site/sw.js';

workboxBuild.injectManifest({
  swSrc,
  swDest,
  globDirectory: '_site',
}).then(({count, size, filePaths}) => {
  terser.minify(fs.readFileSync(filePaths[0], 'utf8')).then((data) => {
    fs.writeFileSync(filePaths[0], data.code, 'utf8');
  });
  console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
});
