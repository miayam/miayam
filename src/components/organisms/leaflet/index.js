import lozad from 'lozad';

class Leaflet {
  constructor(template = undefined) {
    this.template = template;
  }

  init() {
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

    const observer = lozad(document.querySelectorAll('img, iframe'), {
      load(elm) {
        if (elm.getAttribute('data-src')) {
          elm.src = elm.getAttribute('data-src');
          elm.removeAttribute('data-src');
        }

        if (elm.getAttribute('data-srcset')) {
          elm.srcset = elm.getAttribute('data-srcset');
          elm.removeAttribute('data-srcset');
        }

        if (elm.getAttribute('data-sizes')) {
          elm.sizes = elm.getAttribute('data-sizes');
          elm.removeAttribute('data-sizes');
        }

        if (elm.getAttribute('id') === 'js-share') {
          import(
            /* webpackChunkName: "share" */
            '@molecules/share'
          ).then(({ default: Share }) => {
            const share = new Share();
            share.init();
          });
        }
      }
    });

    observer.observe();
  }
}

export default Leaflet;