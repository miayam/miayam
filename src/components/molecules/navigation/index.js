class Navigation {
  constructor(className='m-navigation') {
    this.className = className;
  }

  buildLinks() {
    const navigationLinkWrappers = Array.from(document.getElementsByClassName(`${this.className}__linkWrapper`));
    const navigationBackWrappers = Array.from(document.getElementsByClassName(`${this.className}__backWrapper`));

    navigationLinkWrappers.forEach((linkWrapper) => {
      linkWrapper.style = 'display: inline-block';
    });

    navigationBackWrappers.forEach((backWrapper) => {
      backWrapper.style = 'display: none';
    });
  }

  buildBackButton() {
    const navigationLinkWrappers = Array.from(document.getElementsByClassName(`${this.className}__linkWrapper`));
    const navigationBackWrappers = Array.from(document.getElementsByClassName(`${this.className}__backWrapper`));

    navigationLinkWrappers.forEach((linkWrapper) => {
      linkWrapper.style = 'display: none';
    });

    navigationBackWrappers.forEach((backWrapper) => {
      backWrapper.style = 'display: inline-block';
      backWrapper.querySelector('a').setAttribute('href', '/');
    });
  }

  buildActiveLink() {
    const currentLocation = window.location.pathname || '/';
    const navigationLinks = Array.from(document.getElementsByClassName(`${this.className}__link`));

    if (currentLocation.indexOf("/articles/") >= 0) {
      this.buildBackButton();
      return;
    }

    this.buildLinks();

    navigationLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (currentLocation === href) {
        link.style = 'border-bottom: 3px solid #333; font-weight: bold;';
      } else {
        link.style = '';
      }
    });
  }

  onChangeState({ url }) {
    if (url.indexOf("/articles/") >= 0) {
      this.buildBackButton();
    } else {
      this.buildLinks();
    }
  }

  init() {
    this.buildActiveLink();
    const self = this;

    // Set onChangeState() listener:
    ['pushState', 'replaceState'].forEach((changeState) => {
        // Store original values under underscored keys (`window.history._pushState()` and `window.history._replaceState()`):
        window.history['_' + changeState] = window.history[changeState]
        window.history[changeState] = new Proxy(window.history[changeState], {
          apply (target, thisArg, argList) {
            const [state, title, url] = argList
            self.onChangeState({ state, title, url, changeState: changeState === 'replaceState' })
            
            return target.apply(thisArg, argList)
          },
        })
    });
  }
}

export default Navigation;