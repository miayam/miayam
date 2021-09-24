// It's copy-pasted from internet, but I can explain this
// interesting function in my own words.
// It's well-explained by John Dugan http://bit.ly/2troSTT
export default function debounce(func, wait = 20, immediate = true) {
  // It will store unique ID (number) that `window.setTimeout` return.
  // For more about 'window.setTimeout', visit https://mzl.la/2uuQs7Z
  var timeout;

  return function() {
    // In this case, `this` has reference to `window` object and
    // `arguments` is an array-like object that includes event
    // the `window` object listen to ('scroll').
    var context = this, args = arguments;

    // This condition make function being passed to `debounce`
    // function (`func`) run without having to wait as long as
    // `timeout` is cleared away. So, the first time `debounce`
    // returns this anonymous function and have it listen to 'scroll'
    // event, `func` will run immediately.
    var callNow = immediate && !timeout;

    // This function will fire after we have waited for certain amount
    // of time. `wait` parameter contains that duration.
    function later() {
      // Nullify the variable that stores unique ID (number) after the
      // timeout passed.
      timeout = null;

      // If we set `func` not to run immediately after `debounce` being
      // called, run it anyway after the timeout passed.
      if (!immediate) {
        func.apply(context, args);
      }
    };

    // Cancel the previous timeout if there's any.
    clearTimeout(timeout);

    // Wait for a given time and run `later` function after it expires.
    // Store the unique ID (number) it returns.
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}