import bring from '@scripts/utilities/bring';

class Anchor {
  constructor(className='js-a-anchor') {
    this.className = className;
    this.activeStyle = 'border-bottom: 4px solid #333; font-weight: bold;';
  }

  updateHead(data) {
    const head = document.head;
    const newRawHead = data.match( /<head[^>]*>([\s\S.]*)<\/head>/i )[ 0 ];
    const newHead = document.createElement('head');
    newHead.innerHTML = newRawHead;
    const headTags = [ 
        "meta[name='keywords']",
        "meta[name='description']",
        "meta[property^='og']",
        "title",
        "meta[name^='twitter']",
        "meta[itemprop]",
        "link[itemprop]",
        "link[rel='prev']",
        "link[rel='next']",
        "link[rel='canonical']",
        "link[rel='alternate']",
    ].join( ',' );

    const oldHeadTags = head.querySelectorAll(headTags);
    oldHeadTags.forEach((tag) => {
      head.removeChild(tag);
    });

    const newHeadTags = newHead.querySelectorAll(headTags);
    newHeadTags.forEach((tag) => {
      head.appendChild(tag);
    });
  }

  activeLink() {
    const currentLocation = window.location.pathname || '/';
    const activeLink = document.querySelector(`a[href*="${currentLocation}"]`);

    if (activeLink) activeLink.style = this.activeStyle;
  }

  reset() {
    const anchors = document.getElementsByClassName(this.className);
    Array.from(anchors).map((anchor) => {
      anchor.style = '';
    });
  }

  init() {
    this.activeLink();

    const anchors = document.getElementsByClassName(this.className);

    Array.from(anchors).map((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        this.reset();


        const href = e.target.getAttribute('href');
        anchor.style = 'border-bottom: 4px solid #333; font-weight: bold;';

        const { text } = bring(href);

        text().then((data) => {
          this.updateHead(data);
          const main = /<main.*?>([\s\S]*)<\/main>/.exec(data)[1];
          history.pushState({}, '', href);
          document.getElementsByTagName('main')[0].innerHTML = main;
        });

        return false;
      });
    });
  }
}

export default Anchor;