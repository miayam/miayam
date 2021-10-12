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
                initCallback: function(e) {
                  document.getElementsByClassName('m-comment__loading')[0].style = 'display: none;';
                  e.iFrameResizer.moveToAnchor(window.location.hash)
                }
              },
              document.getElementById("remarkbox-iframe")
            );
          });
        }
      }
    });

    observer.observe();
  }
}

export default Main;