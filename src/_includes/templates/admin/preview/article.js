import htm from "htm";

const html = htm.bind(h);

// Preview component for an article
const Article = createClass({
  render() {
    const entry = this.props.entry;

    return html`
      <main class="o-main">
        <article>
          <h1>${entry.getIn(["data", "title"], null)}</h1>
          ${this.props.widgetFor("body")}
        </article>
      </main>
    `;
  }
});

export default Article;
