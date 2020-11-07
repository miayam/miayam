# Miayam
### The Brutalist Blog Site Built & Designed By Muhammad D. R.

A blog site to store thoughts and ideas. Built and designed solely by yours
truly. It stays being true to itself. An entity that is an inhabitant of the
web. HTML, CSS, JavaScript and everything in between bundled together. It's
ugly, brutal, a dead simple site, a sore to the eyes, but having no more than
is really needed.

This project also includes a starter pack to up and run with `11ty`. Look into
`init` branch.

## Table of Contents
- [Introduction](#introduction)
- [Why Migrating From Jekyll to Eleventy?](#why-migrating-from-jekyll-to-eleventy)

## Introduction

A starter project to rebuild miayam.io from the ground up using Eleventy and
friends. It is a foundation on which miayam.io is built. Removing Jekyll entirely
from the code base :shit:.

What I need for a brutalist blog site:
- A simple design, component based design that's easy to change and work with.
It doesn't have to be React, Angular, Vue or Svelt.
- Performance. A super fast jellyfish. 100% lighthouse score.
- SEO.
- PWA. Well, I just want to display pictures of cute girls when offline.

Therefore, this starter project must be:

### Boring
I believe in boring technology. Shiny new technology will be obselete in no
time, but boring tech will not. It's already been an artifact. I choose `Pug`
for templating engine/presentational component, `SCSS` for CSS preprocessor,
and `Vanilla JS` for manipulating the DOM, scripting repetitive tasks and
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

`_includes` is an entry point in which Eleventy find the layouts.

### As Little Assets As Possible
**Webpack** is the default bundle manager + task runner for this project.
Template

## Why Migrating From Jekyll to Eleventy?

At first, miayam.io was a personal blog site built with Jekyll using a theme I picked carelessly
which I didn't quite understand how to work with. The more I tinker with it, the more befuddled I am.
So, I decided to burn it down and rebuild it from the ground up. I was looking for an alternative to
Jekyll written in JavaScript because I am a boring web developer you could find anywhere else. I have
tried Gatsby and wound up getting bored. All those shiny new technologies Gatsby has to offer are
not really what I need. I have tried Hexo, it had similar ambience with Jekyll but it didn't spark joy.
And then, there was Eleventy... It really is like a magical glove that just fit my brain perfectly. It
does one thing and does it well. A simple SSG that is having no more than is really needed.

