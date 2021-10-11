class Pagination {
  constructor(className="m-pagination") {
    this.className = className;
    this.prev = document.querySelector(`.${this.className}__item.--prev`);
    this.next = document.querySelector(`.${this.className}__item.--next`);
    this.first = document.querySelector(`.${this.className}__item.--first`);
    this.last = document.querySelector(`.${this.className}__item.--last`);
    this.select = document.getElementById('pagination');
    this.postsCards = document.getElementsByClassName('o-posts__cards')[0];
    this.postsSkeletonCards = document.getElementsByClassName('o-posts__skeletonCards')[0];
  }

  activeOption() {
    this.select.value = window.location.pathname;
  }

  navigation() {
    const self = this;
    const navigator = document.querySelector('li[data-total]');
    const total = Number(navigator.getAttribute('data-total'));
    const baseLink = navigator.getAttribute('data-baseLink');

    this.prev.addEventListener('click', e => {
      const prevIndex = this.select.selectedIndex - 1;
      if (prevIndex < 0) {
        e.preventDefault();
        return false;
      }

      const url = prevIndex + 1 === 1 ? `${baseLink}/` : `${baseLink}/${prevIndex + 1}/`;

      self.bring(url);
    });

    this.next.addEventListener('click', e => {
      const nextIndex = this.select.selectedIndex + 1;

      if (nextIndex + 1 > total) {
        e.preventDefault();
        return false;
      }

      self.bring(`${baseLink}/${nextIndex + 1}/`);
    });

    this.first.addEventListener('click', () => {
      this.bring(`${baseLink}/`);
    });

    this.last.addEventListener('click', () => {
      this.bring(`${baseLink}/${total}/`)
    });
  }

  bring(url) {
    const self = this;
    this.postsCards.style = 'display: none;';  
    this.postsSkeletonCards.style = 'display: block;';

    fetch(url)
      .then(response => response.text())
      .then(html => {
        const posts = html.match(/<section class="o-posts__cards"[^>]*>([\s\S.]*)<\/section>/i)[1];
        const title = html.match(/<title[^>]*>([\s\S.]*)<\/title>/i)[1];

        if (posts) {
          history.pushState({ href: url }, url, url);
          self.postsCards.innerHTML = posts;
          self.select.value = url;
          document.title = title;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        self.postsSkeletonCards.style = '';
        self.postsCards.style = '';  
      })
      .catch(() => {
        self.postsSkeletonCards.style = '';
        self.postsCards.style = '';  
      });
  }

  onSelect() {
    const self = this;
    this.select.addEventListener('change', e => {
      const url = e.target[e.target.selectedIndex].value;
      self.postsCards.style = 'display: none;';  
      self.postsSkeletonCards.style = 'display: block;';
      self.bring(url);
    });

    window.onpopstate = function () {
      location.reload();
    };
  }

  init() {
    this.activeOption();
    this.onSelect();
    this.navigation();
  }
}

export default Pagination;