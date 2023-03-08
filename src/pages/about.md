---
layout: about/index.pug
permalink: /about/index.html
title: About
url: /about/
---

# About
-------

## The Brutalist Blog Site Built & Designed By Muhamad D. R.
A blog site to store thoughts and ideas. Built and designed solely by yours
truly. It stays true to itself. An entity that is an inhabitant of the
web. HTML, CSS, JavaScript, and everything in between bundled together. It's
ugly, brutal, a dead simple site, a sore to the eyes, but having no more than
is really needed.

## Table of Contents
- [Introduction](#introduction)
- [Usage](#usage)
- [Special Thanks](#special-thanks)
- [The Reason Why I Migrate From Jekyll To Eleventy](#the-reason-why-i-migrate-from-jekyll)
- [The Author](#the-author)

## Introduction {id="introduction"}
A starter project to rebuild [miayam.github.io](https://miayam.github.io) from the
ground up using `Eleventy` and friends. It is a foundation on which
new [miayam.io](https://miayam.io) will be built. Removing Jekyll
entirely from the code base 💩.

What do I need more of in a brutalist website?
- A simple design, component based design that's easy to change and work with.
It doesn't have to be `React`, `Angular`, `Vue`, or `Svelte`
- Performance. A super fast jellyfish. 100% lighthouse score
- SEO

Therefore, this starter project must be:
- [Boring](#boring)
- [Atomic](#atomic)
- [As Few Assets As Possible](#as-few-assets-as-possible)

## Boring {#boring}
I believe in boring technology. Shiny new technology will be obselete in no
time, but boring tech will not. `Pug` for building presentational component.
`SCSS` for styling. `Vanilla JS` for manipulating the DOM, scripting repetitive tasks,
and configuration.

## Atomic {#atomic}
[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) is a way to go.
It makes the design **modular** that can be easily **managed and updated**. Thanks to
Daniel Tonon for
[this great article](https://css-tricks.com/abem-useful-adaptation-bem/).
He encourages us to combine modified [`BEM`](https://www.smashingmagazine.com/2018/06/bem-for-beginners/) naming convention with atomic design
methodology. He also wrote pros and cons for his approach and let us decide
and manage the trade-off.

Here's the file structure:

```
src
└── components
    ├── atoms
    |    └── button
    |       ├── index.pug
    |       ├── _index.scss
    |       └── index.js
    |── molecules
    |── organisms
    └── templates
```

`components` is an entry point in which `Eleventy` looks for layouts.

## As Few Assets As Possible {#as-few-assets-as-possible}
`Webpack` is a bundle manager  for this project.
Any changes to `components/templates/**/*/index.js` or `components/templates/**/*/_index.scss` is
watched and rebuilt by `Webpack`. `Webpack` bundles `JavaScript` and `SCSS` code in multiple entry points
reside in `components/templates` which will be injected on every template by `HtmlWebpackPlugin`.
`Eleventy` will do the rest.

Here's the file structure:
```
src
└── components 
    ├── atoms
    ├── molecules
    ├── organisms
    └── templates
         ├── base
         |  └── index.pug
         ├── 404
         |  ├── index.pug
         |  ├── _index.scss
         |  └── index.js
         └── home
            ├── index.pug
            ├── _index.scss
            └── index.js
```

Here's the snippet from `webpack.common.js`:
```js
const ENTRY_POINTS = [
    'home',
    '404'
];

const multipleHtmlPlugins = ENTRY_POINTS.map(name => {
    return new HtmlWebpackPlugin({
        template: `${basePath}/components/templates/base/index.pug`,
        filename: `${basePath}/components/templates/${name}/index.pug`,
        chunks: [`${name}`],
        inject: false,
        hash: true,
        templateParameters: {
            // For now, disable analytics for
            // starter project landing page
            analytics: name !== 'home'
        }
    });
});

module.exports = {
    entry: ENTRY_POINTS.reduce((prev, curr) => {
        return {
            ...prev,
            [curr]: `./src/components/templates/${curr}/index.js`
        }
    }, {}),
    plugins: [
        ...multipleHtmlPlugins,
        ... // The rest.
    ]
    ... // The rest.
};
```

Here's how we inject assets on base template (`components/templates/base/index.pug`):
```pug
body
    //- Inject assets. 6 spaces is necessary, so that `HtmlWebpackPugPlugin` can
    //- translate this snippet to proper pug syntax.
    <%= htmlWebpackPlugin.files.css.map((css) => (
       `link(href=\'${css}\', rel='stylesheet')`).join('\n      ')`
    )) %>
    <%= htmlWebpackPlugin.files.js.map((js) => (
        `script(src=\'${js}\', type='text/javascript', async)`).join('\n      ')`
    )) %>
```

As a result, each template will have distinct minified, production-ready assets that are only required by pages that include it. The assets required by the *Home* page will not be loaded by the *About* page. As few assets as possible.

## Usage {#usage}
- [Requirement](#requirement)
- [Development](#development)
- [Production](#production)

## Requirement {#requirement}
You must install [volta](https://volta.sh/). You will be using Node.js version `12.18.4`.

Run this command to make sure [volta](https://volta.sh/) can detect `package.json`:

```
$ source ~/.bashrc
```

## Development {#development}
Install all dependencies:

```
$ npm run install
```

After that, run this command:

```
$ npm run start
```

`Webpack` bundles the assets, `Eleventy` will do the rest.

Open `localhost:1992` to see the result.


## Production {#production}
To build production-ready bundle, run this command:

```
$ npm run build
```

You can host it on `Github Pages`, `Netlify`, or else.

## Special Thanks {#special-thanks}
- Almighty God
- [https://github.com/clenemt/eleventy-webpack](https://github.com/clenemt/eleventy-webpack)
- [https://pustelto.com](https://pustelto.com)


## The Reason Why I Migrate From Jekyll to Eleventy {#the-reason-why-i-migrate-from-jekyll}
At first, [miayam.io](https://miayam.io) was a personal blog site built with [Jekyll](https://jekyllrb.com/)
using a theme I picked carelessly without thinking. Two years later, I almost forgot half of the code.
Ruby seemed foreign to me. The more I tinkered with it, the more befuddled I was. So, I decided to burn
it down and rebuild it from the ground up.

I was looking for an alternative to [Jekyll](https://jekyllrb.com/) written in `JavaScript` because I am a boring
web developer—the kind you can find anywhere else. I tried [Gatsby](https://www.gatsbyjs.com/) and wound up
getting bored. All those shiny new technologies [Gatsby](https://www.gatsbyjs.com/) has to offer were not really
what I need. I tried [Hexo](https://hexo.io/). It had a similar ambiance to
[Jekyll](https://jekyllrb.com/) but it didn't spark joy.

And then, there was [Eleventy](https://www.11ty.dev/).

It really was like a magical glove that just fit my brain perfectly. It did one thing, and did it well. A simple SSG (Static Site Generator) that helped provide the barebones of the next generation of [miayam.io](https://miayam.io). And for good reason, the batteries were not included.

## The Author {#the-author}
You can find me on [GitHub](https://github.com/miayam), [Instagram](https://www.instagram.com/miayamin/), [Twitter](https://twitter.com/___miayam___), and [LinkedIn](https://www.linkedin.com/in/miayam/). 
