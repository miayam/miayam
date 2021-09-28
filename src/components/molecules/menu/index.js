class Menu {
  constructor(className="m-menu") {
    this.className = className;
  }

  calcWidth() {

  }

  priorityPlus() {

  }

  init() {
    window.addEventListener('resize', this.priorityPlus);
    window.addEventListener('load', this.priorityPlus);
  }
}

export default Menu;