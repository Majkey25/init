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
      // One family for everything readable; the width axis gives the name its expanded cut.
      provider: fontProviders.fontsource(),
      name: 'Mona Sans',
      cssVariable: '--font-sans',
      weights: ['200 900'],
      styles: ['normal'],
      stretch: '75% 125%',
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'Arial', 'sans-serif'],
    },
    {
      // Labels, dates and the status lines.
      provider: fontProviders.fontsource(),
      name: 'Geist Mono',
      cssVariable: '--font-mono',
      weights: ['400 500'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-monospace', 'Consolas', 'monospace'],
    },
  ],
});
