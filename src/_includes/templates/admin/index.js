import Article from "./preview/article";
import './_index.scss';

if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
        if (!user) {
            window.netlifyIdentity.on("login", () => {
                document.location.href = "/admin";
            });
        }
    });
}

// Register the Article component as the preview for entries in the blog collection
CMS.registerPreviewTemplate("articles", Article);
CMS.registerPreviewStyle("/styles-blog.css");
