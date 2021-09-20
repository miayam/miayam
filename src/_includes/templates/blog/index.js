import './_index.scss';

import(
    /* webpackChunkName: "analytics" */
    '@scripts/utilities/analytics'
).then(({ default: module }) => {
    module();
});
