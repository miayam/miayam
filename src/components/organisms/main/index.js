import lozad from 'lozad';

class Main {
  constructor(template = undefined) {
    this.template = template;
  }
  init() {
    const observer = lozad(document.querySelectorAll('img, iframe'));

    observer.observe();

    if (this.template === 'blog') {
      import(
        /* webpackChunkName: "iterator" */
        '@molecules/iterator'
      ).then(({ default: Iterator }) => {
        const iterator = new Iterator();
        iterator.init();
      });
    }

    if (this.template === 'about') {
      import(
        /* webpackChunkName: "article" */
        '@molecules/article'
      ).then(({ default: Article }) => {
        const article = new Article();
        article.init();
      });
    }
  }
}

export default Main;