import lozad from 'lozad';
import Menu from '@molecules/menu';
import Pagination from '@molecules/pagination';

class Posts {
  constructor(className='o-posts') {
    this.className = className;
  }

  init() {
    const menu = new Menu();
    const pagination = new Pagination();
    const observer = lozad(document.querySelectorAll('img, iframe'));

    menu.init();
    pagination.init();
    observer.observe();
  }
}

export default Posts;