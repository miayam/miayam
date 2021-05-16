import './_index.scss';

if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
        if (!user) {
            window.netlifyIdentity.on("login", () => {
                document.location.href = "/admin/";
            });
        }
    });
}

if (window.CMS) {
    CMS.registerPreviewStyle("/styles-admin.css");
}
