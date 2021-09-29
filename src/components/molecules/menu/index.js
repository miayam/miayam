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
    const calcWidth = () => {
      let tabsWidth = 0; // Total tabs width.
      const menuWidth = this.menu.offsetWidth;
      const moreTabWidth = this.moreTab.offsetWidth;
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

    const clickInside = (e) => {
      e.preventDefault();

      if (this.hiddenTabs.style.display === 'none') {
        this.hiddenTabs.style.display = 'block';
      } else {
        this.hiddenTabs.style.display = 'none';
      }
    };

    this.moreTab.addEventListener('click', clickInside);
    document.addEventListener('click', clickOutside);
  }

  init() {
    this.toggle();
    this.priorityPlus();
  }
}

export default Menu;