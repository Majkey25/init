# Matěj Teplý

Personal site of Matěj Teplý (Majkey), AI/ML engineer and backend developer:
**[majkey25.github.io/init](https://majkey25.github.io/init/)**

[![CI](https://github.com/Majkey25/init/actions/workflows/ci.yml/badge.svg)](https://github.com/Majkey25/init/actions/workflows/ci.yml)
[![Deploy](https://github.com/Majkey25/init/actions/workflows/deploy.yml/badge.svg)](https://github.com/Majkey25/init/actions/workflows/deploy.yml)
[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://astro.build)

## What is here

- **Home**: a statement, eight selected projects written as problem → approach → result (with
  the measured numbers and known limits), how I work, experience and education, music, contact.
- **[/work/](https://majkey25.github.io/init/work/)**: every public project, grouped.
- Light and dark theme (follows the system, remembers a manual choice), cross-document view
  transitions, a print stylesheet that turns the home page into a one-page CV.

## Editing

Projects live in [`src/data/projects.yaml`](src/data/projects.yaml), validated by a Zod schema in
[`src/content.config.ts`](src/content.config.ts): a featured project without problem, approach,
result and `as_of` fails the build.

## Stack

Astro 7 (static), plain CSS, Spectral + Hanken Grotesk + IBM Plex Mono through the Astro Fonts
API. CI runs Prettier, `astro check`, the build and Lighthouse CI; the deploy workflow builds with
the GitHub Pages base path `/init/`.
