import './_index.scss';

import(
    /* webpackChunkName: "analytics" */
    '@scripts/utilities/analytics'
).then(({ default: module }) => {
    module();
}).catch(error => {
    console.log(error);
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
};
