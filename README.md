# Matěj Teplý

Personal site of Matěj Teplý (Majkey), AI/ML engineer and backend developer:
**[majkey25.github.io/init](https://majkey25.github.io/init/)**

[![CI](https://github.com/Majkey25/init/actions/workflows/ci.yml/badge.svg)](https://github.com/Majkey25/init/actions/workflows/ci.yml)
[![Deploy](https://github.com/Majkey25/init/actions/workflows/deploy.yml/badge.svg)](https://github.com/Majkey25/init/actions/workflows/deploy.yml)
[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://astro.build)

## What is here

- **Home**: the statement, eight selected projects as a scannable list, how I work, experience
  and education, music, contact.
- **/work/&lt;project&gt;/**: one page per selected project, written as problem → approach →
  result (with measured numbers and known limits where I have them).
- **[/work/](https://majkey25.github.io/init/work/)**: public projects, grouped.
- Motion, all of it off under `prefers-reduced-motion`: the name decodes once per visit, content
  rises in, hovering a project quiets the others and splits its name for a moment, a soft light
  follows the pointer, project titles morph between the list and their page (cross-document view
  transitions), and the theme switch opens as a circle from its button.
- Light and dark theme (follows the system, remembers a manual choice), a print stylesheet.

## Editing

Projects live in [`src/data/projects.yaml`](src/data/projects.yaml), validated by a Zod schema in
[`src/content.config.ts`](src/content.config.ts): a featured project without problem, approach,
result and `as_of` fails the build. A project's page URL comes from its name.

## Stack

Astro 7 (static), plain CSS, Mona Sans (its width axis gives the name its expanded cut) and Geist
Mono through the Astro Fonts API. CI runs Prettier, `astro check`, the build and Lighthouse CI; the
deploy workflow builds with the GitHub Pages base path `/init/`.
