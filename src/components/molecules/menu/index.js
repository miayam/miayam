class Menu {
  constructor(className="m-menu") {
    this.className = className;
  }

  calcWidth() {
  }

  priorityPlus() {
  }

  toggle() {
    const hiddenTabs = document.getElementsByClassName(`${this.className}__hiddenTabs`)[0];
    hiddenTabs.style.display = 'none';
    const moreTab = document.getElementsByClassName(`${this.className}__moreTab`)[0];

    const clickOutside = (e) => {
      if (e.target === hiddenTabs || hiddenTabs.contains(e.target)) {
        hiddenTabs.style.display = 'block';
      } else if (e.target === moreTab) {
        return;
      } else {
        hiddenTabs.style.display = 'none';
      }
    };

    moreTab.addEventListener('click', (e) => {
      e.preventDefault();

      if (hiddenTabs.style.display === 'none') {
        hiddenTabs.style.display = 'block';
      } else {
        hiddenTabs.style.display = 'none';
      }
    });

    document.addEventListener('click', clickOutside);
  }

  init() {
    this.toggle();
    window.addEventListener('resize', this.priorityPlus);
    window.addEventListener('load', this.priorityPlus);
  }
}

export default Menu;