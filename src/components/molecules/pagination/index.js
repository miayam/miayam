class Pagination {
  constructor(className="m-pagination") {
    this.className = className;
    this.prev = document.querySelector(`.${this.className}__item.--prev`);
    this.next = document.querySelector(`.${this.className}__item.--next`);
    this.first = document.querySelector(`.${this.className}__item.--first`);
    this.last = document.querySelector(`.${this.className}__item.--last`);
    this.select = document.getElementById('pagination');
  }

  activeOption() {
    this.select.value = window.location.pathname;
  }

  onSelect() {
    const postsCards = document.getElementsByClassName('o-posts__cards')[0];
    const postsSkeletonCards = document.getElementsByClassName('o-posts__skeletonCards')[0];

    this.select.addEventListener('change', e => {
      const selectedPaginationUrl = e.target[e.target.selectedIndex].value;
      console.log(selectedPaginationUrl, 'woi');
      postsCards.style = 'display: none;';  
      postsSkeletonCards.style = 'display: block;';

      fetch(selectedPaginationUrl)
        .then(response => response.text())
        .then(html => {
          const posts = html.match(/<section class="o-posts__cards"[^>]*>([\s\S.]*)<\/section>/i)[1];
          const title = html.match(/<title[^>]*>([\s\S.]*)<\/title>/i)[1];

          if (posts) {
            history.pushState({ href: selectedPaginationUrl }, selectedPaginationUrl, selectedPaginationUrl);
            postsCards.innerHTML = posts;
            document.title = title;
          }

          postsSkeletonCards.style = '';
          postsCards.style = '';  
        })
        .catch(() => {
          postsSkeletonCards.style = '';
          postsCards.style = '';  
        });
    });

    window.onpopstate = function () {
      location.reload();
    };
  }

  init() {
    this.activeOption();
    this.onSelect();
  }
}

export default Pagination;