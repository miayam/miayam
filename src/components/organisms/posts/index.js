import Menu from '@molecules/menu';

class Posts {
  constructor(className='o-posts') {
    this.className = className;
  }

  init() {
    const menu = new Menu();
    menu.init();
  }
}

export default Posts;