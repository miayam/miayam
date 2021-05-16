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
    var ArticlePreview = createClass({
        render: function() {
            var entry = this.props.entry;
            var image = entry.getIn(['data', 'image']);
            var bg = this.props.getAsset(image);
            return h('main', {"className": "o-main"}, {},
                h('h1', {}, entry.getIn(['data', 'title'])),
                h('img', {src: bg.toString()}),
                h('div', {"className": "text"}, this.props.widgetFor('body'))
            );
        }
    });

    CMS.registerPreviewTemplate("articles", ArticlePreview);
    CMS.registerPreviewStyle("/styles-admin.css");
}
