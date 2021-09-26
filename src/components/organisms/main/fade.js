// File: fade.js
// Import Highway
import Highway from '@dogstudio/highway';

// Fade
class Fade extends Highway.Transition {
  in({ from, to, done }) {
    console.log(from, to, done, 'in!')
    done();
  }

  out({ from, to, done }) {
    console.log(from, to, done, 'out!')
    done();
  }
}

export default Fade;
