import lozad from 'lozad';
import Iterator from '@molecules/iterator';

class Main {
  init() {
    const observer = lozad(document.querySelectorAll('img, iframe'));
    const iterator = new Iterator();
    observer.observe();
    iterator.init();
  }
}

export default Main;