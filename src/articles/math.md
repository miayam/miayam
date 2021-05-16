---
title: math
date: 2021-05-16T09:17:37.469Z
author: Terserah
summary: Terserah
layout: blog/index.pug
tags:
  - js
  - scss
  - math
permalink: articles/{{ title | slug }}/index.html
---
```json
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
```