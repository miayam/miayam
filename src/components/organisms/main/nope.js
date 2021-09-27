// File: nope.js
// Import Highway
import Highway from '@dogstudio/highway';

// No fancy transition.
class Nope extends Highway.Transition {
  in({ from, done }) {
    window.scrollTo(0, 0);
    from.remove();

    done();
  }

  out({ done }) {
    done();
  }
}

export default Nope;
