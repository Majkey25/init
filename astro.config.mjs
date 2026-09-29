// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// The deploy workflow passes --site and --base from the GitHub Pages settings (/init/);
// CI builds at the root so Lighthouse can serve dist directly.
export default defineConfig({
  site: 'https://majkey25.github.io',
  compressHTML: true,
  build: { inlineStylesheets: 'always' },
  fonts: [
    {
      // Statement and headings: a screen-first serif, light at display size.
      provider: fontProviders.fontsource(),
      name: 'Spectral',
      cssVariable: '--font-serif',
      weights: [300, 400],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Hanken Grotesk',
      cssVariable: '--font-sans',
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'Arial', 'sans-serif'],
    },
    {
      // Only where data has to line up: stacks, dates, metrics.
      provider: fontProviders.fontsource(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-mono',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-monospace', 'Consolas', 'monospace'],
    },
  ],
});
