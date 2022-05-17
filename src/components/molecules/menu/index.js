import Pagination from '@molecules/pagination';
import bring from '@scripts/utilities/bring';

class Menu {
  constructor(className="m-menu") {
    this.className = className;
    this.menu = document.getElementsByClassName(this.className)[0];
    this.tabs = document.getElementsByClassName(`${this.className}__tab`);
    this.moreTab = document.getElementsByClassName(`${this.className}__moreTab`)[0];
    this.visibleTabs = document.getElementsByClassName(`${this.className}__tabs`)[0];
    this.hiddenTabs = document.getElementsByClassName(`${this.className}__hiddenTabs`)[0];
  }

  priorityPlus() {
    const calcWidth = (e) => {
      let tabsWidth = 0; // Total tabs width.
      const adjustment = e && e.type === 'load' ? 0 : 50;
      const menuWidth = this.menu.offsetWidth;
      const moreTabWidth = this.moreTab.offsetWidth + adjustment;
      const availableSpace = menuWidth - moreTabWidth;

      Array.from(this.visibleTabs.childNodes).forEach(tab => {
        tabsWidth += tab.offsetWidth;
      });

      if (tabsWidth > availableSpace) {
        const visibleTabsCount = this.visibleTabs.childElementCount;
        const lastVisibleTab = this.visibleTabs.childNodes[visibleTabsCount - 1];
        lastVisibleTab.setAttribute('data-width', lastVisibleTab.offsetWidth);
        this.hiddenTabs.insertBefore(lastVisibleTab, this.hiddenTabs.childNodes[0]);
        calcWidth();
      } else {
        const firstHiddenTab = this.hiddenTabs.childNodes[0];
        const firstHiddenTabWidth = Number(firstHiddenTab.getAttribute('data-width'));
        if (tabsWidth + firstHiddenTabWidth < availableSpace) {
          this.visibleTabs.appendChild(firstHiddenTab);
        }
      }

      if (this.hiddenTabs.childElementCount) {
        this.moreTab.style.display = 'inline-block';
      } else {
        this.moreTab.style.display = 'none';
      }
    };

    window.addEventListener('resize', calcWidth);
    window.addEventListener('load', calcWidth);
  }

  toggle() {
    this.hiddenTabs.style.display = 'none';

    const clickOutside = (e) => {
      if (e.target === this.hiddenTabs || this.hiddenTabs.contains(e.target)) {
        this.hiddenTabs.style.display = 'block';
      } else if (e.target === this.moreTab) {
        return;
      } else {
        this.hiddenTabs.style.display = 'none';
      }
    };

    const clickInside = () => {
      if (this.hiddenTabs.style.display === 'none') {
        this.hiddenTabs.style.display = 'block';
      } else {
        this.hiddenTabs.style.display = 'none';
      }
    };

    this.moreTab.addEventListener('click', clickInside);
    document.addEventListener('click', clickOutside);
  }

  activeLink() {
    Array.from(this.tabs).forEach(tab => {
      const link = tab.getElementsByClassName(`${this.className}__label`)[0];
      let ownTag = link.getAttribute('data-tag');
      const activeTag = document.querySelector(`p[data-tag*=${ownTag}`);

      if (activeTag) {
        link.style = 'border-bottom: 2px solid #333; font-weight: bold;';
      } else {
        link.style = '';
      }
    });
  }

  resetTabs() {
    Array.from(this.tabs).forEach(tab => {
      const link = tab.getElementsByClassName(`${this.className}__label`)[0];
      link.style = '';
    });
  }

  changeTags() {
    const self = this;
    Array.from(this.tabs).forEach(tab => {
      const label = tab.getElementsByClassName(`${this.className}__label`)[0];
      const tag = label.getAttribute('data-tag');
      const postsCards = document.getElementsByClassName('o-posts__cards')[0];
      const postsSkeletonCards = document.getElementsByClassName('o-posts__skeletonCards')[0];
      const paginationContainer = document.getElementsByClassName('m-pagination')[0];

      tab.addEventListener('click', () => {
        const url = tag === 'all' ? '/' : `/tags/${tag}/`;
        postsCards.style = 'display: none;';  
        postsSkeletonCards.style = 'display: block;';

        const htmlHandler = (html) => {
          const posts = html.match(/<section class="o-posts__cards"[^>]*>([\s\S.]*)<\/section>/i)[1];
          const pagination = html.match(/<nav class="m-pagination"[^>]*>([\s\S.]*)<\/nav>/i)[1];
          const title = html.match(/<title[^>]*>([\s\S.]*)<\/title>/i)[1];

          if (posts) {
            self.resetTabs();
            history.pushState({ tag }, url, url);
            postsCards.innerHTML = posts;
            paginationContainer.innerHTML = pagination;

            const description = document.querySelector('span[data-description]').getAttribute('data-description');
            document.querySelector('meta[name="description"]').setAttribute('content', description);
            document.title = title;
            const paginationObj = new Pagination();
            paginationObj.init();
          }

          postsSkeletonCards.style = '';
          postsCards.style = '';  
          label.style = 'border-bottom: 2px solid #333; font-weight: bold;';
        };

        const errorHandler = (error) => {
          console.error(error);
          postsSkeletonCards.style = '';
          postsCards.style = '';  
        };

        const fetch = bring(htmlHandler, errorHandler);
        fetch(url);
      });
    });
  }

  init() {
    this.toggle();
    this.priorityPlus();
    this.activeLink();
    this.changeTags();
  }
}

export default Menu;