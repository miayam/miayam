// File: nope.js
// Import Highway
import Highway from '@dogstudio/highway';

// No fancy transition.
class Nope extends Highway.Transition {
  in({ from, to,  done }) {
    window.scrollTo(0, 0);
    from.remove();

    window.setTimeout(() => {
      to.style = 'display: none';
      done();
      to.style = '';
    }, 300);
  }

  out({ done }) {
    done();
  }
}

export default Nope;
