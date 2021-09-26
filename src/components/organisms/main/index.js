import Highway from '@dogstudio/highway';
import Fade from './fade';

class Main {
  constructor(className="o-main") {
    this.className = className;
  }

  init() {
    const H = new Highway.Core({
      transitions: {
        default: Fade
      }
    });

    console.log(H);
  }
}

export default Main;