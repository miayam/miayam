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

if (window.CMS && window.React) {
    const h = React.createElement;
    class ArticlePreview extends React.Component {
        render() {
            var entry = this.props.entry;
            return h('main', {"className": "o-main"}, {},
                h('h1', {}, entry.getIn(['data', 'title'])),
                h('div', {"className": "text"}, this.props.widgetFor('body'))
            );
        }
    };

    CMS.registerPreviewTemplate("articles", ArticlePreview);
    CMS.registerPreviewStyle("/styles-admin.css");
}
