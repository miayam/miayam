# Miayam
### The Brutalist Blog Site Built & Designed By Muhammad D. R.

A blog site to store thoughts and ideas. Built and designed solely by yours
truly. It stays being true to itself. An entity that is an inhabitant of the
web. HTML, CSS, JavaScript and everything in between bundled together. It's
ugly, brutal, a dead simple site, a sore to the eyes, but having no more than
is really needed.

This project also includes a starter pack to up and run with
[`Eleventy`](https://www.11ty.dev/). Look into
[`init`](https://github.com/miayam/miayam/tree/init) branch.

## Table of Contents
- [Introduction](#introduction)
- [Why Migrating From `Jekyll` to `Eleventy`?](#why-migrating-from-jekyll-to-eleventy)

## Introduction

A starter project to rebuild [miayam.io](https://miayam.io) from the ground up using `Eleventy` and
friends. It is a foundation on which new [miayam.io](https://miayam.io) is built. Removing Jekyll
entirely from the code base :shit:.

What I need for a brutalist blog site:
- A simple design, component based design that's easy to change and work with.
It doesn't have to be React, Angular, Vue or Svelt.
- Performance. A super fast jellyfish. 100% lighthouse score.
- SEO.
- PWA. Well, I just want to display pictures of cute girls when offline.

Therefore, this starter project must be:

### Boring
I believe in boring technology. Shiny new technology will be obselete in no
time, but boring tech will not. It's already been an artifact. `Pug`
for templating engine/presentational component. `SCSS` for styling.
`Vanilla JS` for manipulating the DOM, scripting repetitive tasks and
configuration.

### Atomic
**Atomic Design** is a way to go. It makes the design **modular** that can be
easily **managed and updated**. Thanks to Daniel Tonon for
[this great article](https://css-tricks.com/abem-useful-adaptation-bem/).
He encourages us to combine modified BEM naming convention with atomic design
methodology. He also wrote pros and cons for his approach and let us decide
and manage the trade off.

Here is the file structure:

```
src
└── _includes
    ├── atoms
    |    └── button
    |       ├── index.pug
    |       ├── _index.scss
    |       └── index.js
    |── molecules
    |── organisms
    └── templates
```

`_includes` is an entry point in which `Eleventy` find the layouts.

### As Little Assets As Possible
**Webpack** is a bundle manager + task runner for this project.
`Eleventy` looks for layouts in `_includes/templates`. `Webpack` bundle `JavaScript`
and `SCSS` code in multiple entry points reside in `_includes/templates` which will be
injected on every template using `HtmlWebpackPlugin`.

Here is the file structure:
```
src
└── _includes
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

Here is the snippet from `webpack.common.js`.
```js
const ENTRY_POINTS = [
    'home',
    '404'
];

module.exports = {
    entry: ENTRY_POINTS.reduce((prev, curr) => {
        return {
            ...prev,
            [curr]: `./src/_includes/templates/${curr}/index.js`
        }
    }, {}),
    ...
};
```

Therefore, every template will have unique minified, production ready assets that's only
needed by pages that include it. *About* page will not load assets required by *Home* page.
As little assets as possible.

Here is the base template:

```pug
doctype html
html(lang="en")
  head
    include /atoms/head/index

    //- See src/config/webpack.common.js. We inject parameters there.

    <% if (analytics) { %>
    //- Shamelessly track users. Uncomment it if you are ready to abuse your readers :(
    script(src='https://www.google-analytics.com/analytics.js', type='text/javascript', async)
    <% } %>
  body
      include ./layout

      //- Inject assets. 6 spaces is necessary, so that `HtmlWebpackPugPlugin` can translate this snippet to proper pug syntax.
      <%= htmlWebpackPlugin.files.css.map((css) => `link(href=\'${css}\', rel='stylesheet')`).join('\n      ') %>
      <%= htmlWebpackPlugin.files.js.map((js) => `script(src=\'${js}\', type='text/javascript', async)`).join('\n      ') %>

```

## Why Migrating From `Jekyll` to `Eleventy`?

At first, [miayam.io](https://miayam.io) was a personal blog site built with `Jekyll` using a theme I picked carelessly
which I didn't quite understand how to work with. The more I tinker with it, the more befuddled I am.
So, I decided to burn it down and rebuild it from the ground up.

I was looking for an alternative to `Jekyll` written in `JavaScript` because I am a boring web developer
you could find anywhere else. I have tried Gatsby and wound up getting bored. All those shiny new
technologies Gatsby has to offer are not really what I need. I have tried Hexo, it had similar ambience
with `Jekyll` but it didn't spark joy.

And then, there was `Eleventy`... It really is like a magical glove that just fit my brain perfectly. It
does one thing and does it well. A simple SSG that is having no more than is really needed.

