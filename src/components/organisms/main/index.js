import lozad from 'lozad';

class Main {
  init() {
    const observer = lozad(document.querySelectorAll('img, iframe'));

    observer.observe();
  }
}

export default Main;