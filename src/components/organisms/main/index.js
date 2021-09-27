import Highway from '@dogstudio/highway';
import Navigation from '@molecules/navigation';
import Nope from './nope';
import { manageScripts, manageStyles } from './utils';

class Main {
  constructor(className="o-main") {
    this.className = className;
  }

  init() {
    const H = new Highway.Core({
      transitions: {
        default: Nope
      }
    });

    // Listen the `NAVIGATE_END` event
    // This event is sent everytime the `done()` method is called in the `in()` method of a transition
    H.on('NAVIGATE_END', ({ to }) => {
      to.style = '';
    });

    H.on('NAVIGATE_IN', ({ to }) => {
      const navigation = new Navigation();
      to.style = 'display: none';
      manageScripts(to);
      manageStyles(to);

      navigation.buildActiveLink();
      navigation.onChangeState({ url: window.location.pathname });
    });
  }
}

export default Main;