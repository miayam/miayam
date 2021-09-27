import Highway from '@dogstudio/highway';
import Navigation from '@molecules/navigation';
import Nope from './nope';
import { manageScripts, manageStyles } from './utils';

import './_index.scss';

class Main {
  constructor(className="o-main") {
    this.className = className;
  }

  init() {
    const navigation = new Navigation();

    navigation.buildActiveLink();
    navigation.onChangeState({ url: window.location.pathname });
  }
}

export default Main;