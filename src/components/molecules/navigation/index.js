class Navigation {
  constructor(className='m-navigation') {
    this.className = className;
  }

  buildBackButton() {
    const backButtons = Array.from(document.getElementsByClassName(`${this.className}__back`));

    backButtons.forEach((back) => {
      const searchParams = new URLSearchParams(location.search);
      const tag = searchParams.get('tag');
      const backLink = tag ? `/tags/${tag}/` : '/';
      back.setAttribute('href', backLink);
    });
  }

  buildActiveLink() {
    const currentLocation = window.location.pathname;
    const navigationLinks = Array.from(document.getElementsByClassName(`${this.className}__link`));

    navigationLinks.forEach((link) => {
      let href = link.getAttribute('href');

      if (currentLocation === '/about/' && href !== '/about/') {
        href = document.referrer.indexOf('/tags/') > -1 ? document.referrer : '/';
        link.setAttribute('href', href);
      }

      if (currentLocation === '/now/' && href !== '/now/') {
        href = document.referrer.indexOf('/tags/') > -1 ? document.referrer : '/';
        link.setAttribute('href', href);
      }

      if (currentLocation === href) {
        link.style = 'border-bottom: 3px solid #333; font-weight: bold;';
      } else {
        link.style = '';
      }
    });
  }

  init() {
    this.buildActiveLink();
    this.buildBackButton();
  }
}

export default Navigation;