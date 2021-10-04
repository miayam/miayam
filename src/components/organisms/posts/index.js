import Menu from '@molecules/menu';
import lozad from 'lozad';

class Posts {
  constructor(className='o-posts') {
    this.className = className;
  }

  init() {
    const menu = new Menu();
    const observer = lozad(document.querySelectorAll('img, iframe'));

    menu.init();
    observer.observe();
  }
}

export default Posts;