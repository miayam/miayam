import './_index.scss';

import(
    /* webpackChunkName: "analytics" */
    '@scripts/utilities/analytics'
).then(({ default: module }) => {
    module();
});

if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
        if (!user) {
            window.netlifyIdentity.on("login", () => {
                document.location.href = "/admin/";
            });
        }
    });
}
