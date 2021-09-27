// File: nope.js
// Import Highway
import Highway from '@dogstudio/highway';

// No fancy transition.
class Nope extends Highway.Transition {
  in({ from, to,  done }) {
    window.scrollTo(0, 0);
    from.style = "display: none;";

    window.setTimeout(() => {
      to.style = "display: none;";
      from.remove();
      done();
    }, 3000);
  }

  out({ done }) {
    done();
  }
}

export default Nope;
