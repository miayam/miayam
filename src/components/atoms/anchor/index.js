class Anchor {
  constructor(className='js-a-anchor') {
    this.className = className;
    this.activeStyle = 'border-bottom: 4px solid #333; font-weight: bold;';
  }

  activeLink() {
    const currentLocation = window.location.pathname || '/';
    const activeLink = document.querySelector(`a[href*="${currentLocation}"]`);

    if (activeLink) activeLink.style = this.activeStyle;
  }

  reset() {
    const anchors = document.getElementsByClassName(this.className);
    Array.from(anchors).map((anchor) => {
      anchor.style = '';
    });
  }

  init() {
    this.activeLink();

    const anchors = document.getElementsByClassName(this.className);

    Array.from(anchors).map((anchor) => {
      anchor.addEventListener('click', () => {
        this.reset();
        anchor.style = this.activeStyle;
      });
    });
  }
}

export default Anchor;