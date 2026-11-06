# Kano State Ministry of Youth and Sports Development — Website

The public website for the Kano State Ministry of Youth and Sports Development. It is a static, mobile-first site built with Tailwind CSS and a small page assembly script.

## Pages

- `index.html` — homepage
- `about.html` — mandate, policy direction and leadership
- `register.html` — registration pathways and guidance
- `programs.html` — programmes and opportunities
- `sports.html` — sports development, Kano Pillars, clubs and 5-asides
- `news.html` — newsroom and latest stories
- `contact.html` — contact details and message form

## Project structure

```
src/pages/       Page sources (these are the files to edit)
src/partials/    Shared head, header and footer partials
src/input.css    Tailwind source and custom component styles
scripts/         Page build script
assets/          Compiled CSS, JavaScript and images
```

The HTML files in the project root are **generated**. Edit the sources in `src/pages/` and the partials in `src/partials/`, then rebuild.

## Getting started

```bash
npm install
npm run build
```

`npm run build` assembles the pages and compiles the minified Tailwind stylesheet.

| Command | Description |
| --- | --- |
| `npm run build` | Build pages and CSS once |
| `npm run build:pages` | Assemble the HTML pages only |
| `npm run build:css` | Compile `assets/css/site.css` |
| `npm run watch:css` | Recompile CSS while developing |

## Page variables

Each page can use these placeholders:

- `{{> head}}`, `{{> header}}`, `{{> footer}}` — insert partials
- `{{PAGE}}` — active navigation key (`home`, `about`, `register`, `programs`, `sports`, `news`, `contact`)
- `{{TITLE}}`, `{{DESCRIPTION}}`, `{{CANONICAL}}` — page metadata

Page metadata is defined in `scripts/build-pages.mjs`.
