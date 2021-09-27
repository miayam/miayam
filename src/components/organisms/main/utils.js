export const manageScripts = (to) => {
  const newScripts = Array.from(to.page.querySelectorAll('.main-script'));
  const currentScripts = Array.from(document.querySelectorAll('.main-script'));

  newScripts.forEach((script, index) => {
    if (script.outerHTML === currentScripts[index].outerHTML) {
      return;
    }

    document.body.appendChild(script);
  });
}

export const manageStyles = (to) => {
  const newStyles = Array.from(to.page.querySelectorAll('.main-style'));
  const currentStyles = Array.from(document.querySelectorAll('.main-style'));

  newStyles.forEach((style, index) => {
    if (style.outerHTML === currentStyles[index].outerHTML) {
      return;
    }

    document.head.appendChild(style);
  });
}
 