import Highway from '@dogstudio/highway';
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
  }
}

export default Main;