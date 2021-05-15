---
tags: [js, scss, math]
title: pug
permalink: "articles/{{ title | slug }}/index.json"
---
{
   "date": "{{ page.date }}",
   "url": "{{ page.url }}",
   "prevUrl": "{{ prev.scss.url }}",
   "nextUrl": "{{ next.scss.url }}",
   "prevUrlJS": "{{ prev.js.url }}",
   "nextUrlJS": "{{ next.js.url }}",
   "prevUrlMath": "{{ prev.math.url }}",
   "nextUrlMath": "{{ next.math.url }}"
}