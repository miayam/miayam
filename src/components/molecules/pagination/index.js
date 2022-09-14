import bring from '@scripts/utilities/bring';

class Pagination {
  constructor(className="m-pagination") {
    this.className = className;
    this.navigator = document.querySelector('li[data-total]');
    this.prev = document.querySelector(`.${this.className}__item.--prev`);
    this.next = document.querySelector(`.${this.className}__item.--next`);
    this.first = document.querySelector(`.${this.className}__item.--first`);
    this.last = document.querySelector(`.${this.className}__item.--last`);
    this.select = document.getElementById('pagination');
    this.postsCards = document.getElementsByClassName('o-posts__cards')[0];
    this.postsSkeletonCards = document.getElementsByClassName('o-posts__skeletonCards')[0];
  }

  setCurrentPage(page) {
    document.querySelector('div[data-current-page]').setAttribute('data-current-page', page);
  }

  togglePrevAndNext() {
    const page = Number(document.querySelector('div[data-current-page]').getAttribute('data-current-page'));
    const total = Number(this.navigator.getAttribute('data-total'));

    console.log(page, 'wowow');
    console.log(total, 'total');

    if (page === 1 && total > 1) {
      this.prev.classList.add('--disable');
      this.next.classList.remove('--disable');
    } else if (page === total && total > 1) {
      this.next.classList.add('--disable');
      this.prev.classList.remove('--disable');
    } else if (total === 1) {
      this.prev.classList.add('--disable');
      this.next.classList.add('--disable');
    } else {
      this.prev.classList.remove('--disable');
      this.next.classList.remove('--disable');
    }
  }

  activeOption() {
    this.select.value = window.location.pathname;
  }

  pullIn(url) {
    const self = this;
    this.postsCards.style = 'display: none;';  
    this.postsSkeletonCards.style = 'display: block;';

    const htmlHandler = (html) => {
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
    };

    const errorHandler = (error) => {
      console.error(error);
      self.postsSkeletonCards.style = '';
      self.postsCards.style = '';  
    };

    const fetch = bring(htmlHandler, errorHandler);
    fetch(url);
  }

  navigation() {
    const total = Number(this.navigator.getAttribute('data-total'));
    const baseLink = this.navigator.getAttribute('data-baseLink');

    this.prev.addEventListener('click', e => {
      const prevIndex = this.select.selectedIndex - 1;
      if (prevIndex < 0) {
        e.preventDefault();
        return false;
      }

      const url = prevIndex + 1 === 1 ? `${baseLink}/` : `${baseLink}/${prevIndex + 1}/`;

      this.pullIn(url);
      this.setCurrentPage(prevIndex + 1);
      this.togglePrevAndNext();
    });

    this.next.addEventListener('click', e => {
      const nextIndex = this.select.selectedIndex + 1;

      if (nextIndex + 1 > total) {
        e.preventDefault();
        return false;
      }

      this.pullIn(`${baseLink}/${nextIndex + 1}/`);
      this.setCurrentPage(nextIndex + 1);
      this.togglePrevAndNext();
    });

    this.first.addEventListener('click', () => {
      this.pullIn(`${baseLink}/`);
      this.setCurrentPage(1);
      this.togglePrevAndNext();
    });

    this.last.addEventListener('click', () => {
      this.pullIn(`${baseLink}/${total}/`)
      this.setCurrentPage(total);
      this.togglePrevAndNext();
    });
  }

  onSelect() {
    const self = this;
    this.select.addEventListener('change', e => {
      const selectedItem = e.target[e.target.selectedIndex]
      const url = selectedItem.value;
      const page = Number(selectedItem.label);
      self.postsCards.style = 'display: none;';  
      self.postsSkeletonCards.style = 'display: block;';
      self.pullIn(url);
      this.setCurrentPage(page);
      this.togglePrevAndNext();
    });
  }

  init() {
    console.log('it is called');
    this.activeOption();
    this.togglePrevAndNext();
    this.onSelect();
    this.navigation();
  }
}

export default Pagination;