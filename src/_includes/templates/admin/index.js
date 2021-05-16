import Article from "./preview/article";
import './_index.scss';

if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
        if (!user) {
            window.netlifyIdentity.on("login", () => {
                document.location.href = "/admin/index.html";
            });
        }

        if (user) {
            window.netlifyIdentity.on("logout", () => {
                document.location.href = "/index.html";
            });
        }
    });
}

// Register the Article component as the preview for entries in the blog collection
CMS.registerPreviewTemplate("articles", Article);
CMS.registerPreviewStyle("/styles-blog.css");

// Register any CSS file on the home page as a preview style
var timeout;
timeout = setTimeout(() => {
    fetch("/admin/")
        .then(response => response.text())
        .then(html => {
            const f = document.createElement("html");
            f.innerHTML = html;
            Array.from(f.getElementsByTagName("link")).forEach(tag => {
            if (tag.rel == "stylesheet" && !tag.media) {
                CMS.registerPreviewStyle(tag.href);
            }
            });
        });
}, 3000);
