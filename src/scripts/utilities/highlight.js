const { JSDOM } = require('jsdom');
const Prism = require('prismjs');

/**
 * Use Prism.js to highlight embedded code
 */
const highlight = (content) => {
    // Since Prism.js works on the DOM,
    // we need an instance of JSDOM in the build
    const dom = new JSDOM(content);

    let preElements = dom.window.document.querySelectorAll("pre");

    // WordPress delivers a `code`-tag that is wrapped in a `pre`
    // the used language is specified by a CSS class
    if (preElements.length) {
        preElements.forEach((pre) => {
            let code = pre.querySelector("code");

            if (code) {
                // get specified language from css-classname
                let codeLanguage = "html";
                const preClass = pre.className;

                var matches = preClass.match(/language-(.*)/);
                if (matches != null) {
                    codeLanguage = matches[1];
                }

                // save the language for later use in CSS
                pre.dataset.language = codeLanguage;

                // set grammar that prism should use for highlighting
                let prismGrammar = Prism.languages.html;

                if (
                    codeLanguage === "javascript" ||
                    codeLanguage === "js" ||
                    codeLanguage === "json"
                ) {
                    prismGrammar = Prism.languages.javascript;
                }

                if (codeLanguage === "css") {
                    prismGrammar = Prism.languages.css;
                }

				// https://github.com/PrismJS/prism/blob/master/plugins/line-numbers/prism-line-numbers.js#L109
				const NEW_LINE_EXP = /\n(?!$)/g;
				let lineNumbersWrapper;

				Prism.hooks.add('after-tokenize', function (env) {
					var match = env.code.match(NEW_LINE_EXP);
					var linesNum = match ? match.length + 1 : 1;
					var lines = new Array(linesNum + 1).join('<span></span>');

					lineNumbersWrapper = `<span aria-hidden="true" class="line-numbers-rows">${lines}</span>`;
				});

                // highlight code
                code.innerHTML = Prism.highlight(
                    code.textContent,
                    prismGrammar,
                    codeLanguage
                ) + lineNumbersWrapper;

                code.classList.add(`language-${codeLanguage}`);
            }
        });

        content = dom.window.document.body.innerHTML;
    }

    return content;
}

module.exports = highlight;