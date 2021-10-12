import lozad from 'lozad';
import Comment from '@molecules/comment';

class Main {
  constructor(template = undefined) {
    this.template = template;
  }

  init() {
    if (this.template === 'blog') {
      const comment = new Comment();
      comment.init();

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
        }

        if (elm.getAttribute('data-srcset')) {
          elm.srcset = elm.getAttribute('data-srcset');
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

        if (elm.getAttribute('id') === 'remarkbox-iframe') {
          import(
            /* webpackChunkName: "iFrameResizer" */
            'iframe-resizer'
          ).then(({ default: iFrameResizer })=> {
            const { iframeResize } = iFrameResizer;

            iframeResize(
              {
                checkOrigin: ["https://my.remarkbox.com"],
                inPageLinks: true,
                onInit: function(e) {
                  e.iFrameResizer.moveToAnchor(window.location.hash)
                }
              },
              document.getElementById("remarkbox-iframe")
            );
            window.setTimeout(() => {
              const loadingElm = document.getElementsByClassName('m-comment__loading')[0];
              loadingElm.style = 'display: none;';
            }, 500);
          });
        }
      }
    });

    observer.observe();
  }
}

export default Main;