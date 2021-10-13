const bring = (done, failed) => (url) => {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      done(html);
    })
    .catch(error => {
      failed(error);
    });
  window.onpopstate = function () {
    location.reload();
  }
};

export default bring;