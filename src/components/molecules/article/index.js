import lozad from 'lozad';
import bring from '@scripts/utilities/bring';

class Article {
  constructor(className="m-article") {
    this.className = className;
    this.article = document.getElementsByClassName(this.className)[0];
    this.skeletonArticle = document.getElementsByClassName('m-skeletonArticles')[0];
  }

  init() {
    const self = this;
    const links = document.getElementsByClassName('a-langSwitcher');

    Array.from(links).forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        const url = link.getAttribute('href');
        this.article.style = 'display: none;';
        this.skeletonArticle.style = 'display: block;';

        const htmlHandler = (html) => {
          const result = html.match(/<article class="m-article"[^>]*>([\s\S.]*)<\/article>/i)[1];
          const title = html.match(/<title[^>]*>([\s\S.]*)<\/title>/i)[1];

          if (result) {
            history.pushState({ href: url }, url, url);
            this.article.innerHTML = result;
            document.title = title;
            this.article.style = '';
            this.skeletonArticle.style = '';
            self.init();
          }

          const observer = lozad(document.querySelectorAll('img, iframe'));
          observer.observe();
        };

        const errorHandler = (error) => {
          console.error(error);
          this.article.style = '';
          this.skeletonArticle.style = '';
        };

        const fetch = bring(htmlHandler, errorHandler);
        fetch(url);
      });
    });
  }
}

export default Article;