class Iterator {
  constructor(className="m-iterator") {
    this.className = className;
    this.iterator = document.getElementsByClassName(this.className)[0];
  }

  init() {
    const searchParams = new URLSearchParams(location.search);
    const tag = searchParams.get('tag') || 'all';

    if (!this.iterator) {
      return;
    }

    Array.from(this.iterator.children).forEach(item => {
      if (item.getAttribute('data-tag') === tag) {
        item.style = 'display: inline-block;';
      } else {
        item.style = 'display: none;';
      }
    });
  }
}

export default Iterator;