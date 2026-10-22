// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { fileURLToPath } from 'node:url';

/** @returns {ReturnType<typeof fontProviders.npm>} */
function localFontsource() {
  const provider = fontProviders.npm({ remote: false });
  return {
    ...provider,
    async resolveFont(options) {
      const result = await provider.resolveFont(options);
      if (!result) throw new Error(`Missing installed font: ${options.familyName}`);
      // The npm provider omits subset metadata needed by Astro's Latin-only preload.
      const fonts = result.fonts.filter((font) => {
        const source = font.src.find((source) => 'url' in source);
        const subset = source?.url.match(
          /-(latin-ext|latin)-(?:standard|wght)-normal\.woff2$/,
        )?.[1];
        if (!subset || !options.subsets.includes(subset)) return false;
        font.meta = { ...font.meta, subset };
        // Astro's font fetcher reads absolute paths; it does not support file: URLs.
        font.src = font.src.map((source) =>
          'url' in source ? { ...source, url: fileURLToPath(source.url) } : source,
        );
        return true;
      });
      if (fonts.length !== options.subsets.length) {
        throw new Error(`Missing installed font subsets: ${options.familyName}`);
      }
      return { ...result, fonts };
    },
  };
}

// The deploy workflow passes --site and --base from the GitHub Pages settings (/init/);
// CI builds at the root so Lighthouse can serve dist directly.
export default defineConfig({
  site: 'https://majkey25.github.io',
  compressHTML: true,
  build: { inlineStylesheets: 'always' },
  fonts: [
    {
      // One family for everything readable; the width axis gives the name its expanded cut.
      provider: localFontsource(),
      name: 'Mona Sans',
      options: { package: '@fontsource-variable/mona-sans', file: 'standard.css' },
      cssVariable: '--font-sans',
      weights: ['200 900'],
      styles: ['normal'],
      stretch: '75% 125%',
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'Arial', 'sans-serif'],
    },
    {
      // Labels, dates and the status lines.
      provider: localFontsource(),
      name: 'Geist Mono',
      options: { package: '@fontsource-variable/geist-mono', file: 'index.css' },
      cssVariable: '--font-mono',
      weights: ['400 500'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-monospace', 'Consolas', 'monospace'],
    },
  ],
});
