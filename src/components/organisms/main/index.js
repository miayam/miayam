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
    H.on('NAVIGATE_END', ({ to, from }) => {
      manageScripts(to, from);
      manageStyles(to, from);
    });

    H.on('NAVIGATE_OUT', () => {
      const navigation = new Navigation();

      navigation.buildActiveLink();
      navigation.onChangeState({ url: window.location.pathname });
    });
  }
}

export default Main;