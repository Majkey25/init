import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { isAbsolute } from 'node:path';
import test from 'node:test';
import config from '../astro.config.mjs';

for (const family of config.fonts) {
  test(`${family.name} resolves locked local fonts with Latin preload metadata`, async () => {
    await family.provider.init({
      root: new URL('../', import.meta.url),
      storage: { getItem: (_key, initialize) => initialize() },
      fetch: () => {
        throw new Error('Remote font access is forbidden');
      },
    });
    const request = {
      familyName: family.name,
      weights: family.weights,
      styles: family.styles,
      subsets: family.subsets,
      formats: ['woff2'],
      options: family.options,
    };
    const { fonts } = await family.provider.resolveFont(request);
    assert.deepEqual(
      fonts.map((font) => font.meta.subset),
      ['latin', 'latin-ext'],
    );
    for (const font of fonts) {
      for (const source of font.src) {
        assert.ok(isAbsolute(source.url));
        assert.ok(source.url.replaceAll('\\', '/').includes(family.options.package));
        assert.equal((await readFile(source.url)).subarray(0, 4).toString(), 'wOF2');
      }
      if (family.name === 'Mona Sans') {
        assert.equal(String(font.stretch).replace(',', ' '), '75% 125%');
      }
    }
    await assert.rejects(
      family.provider.resolveFont({
        ...request,
        options: { package: '@fontsource-variable/missing-font', file: 'index.css' },
      }),
      /Missing installed font/,
    );
  });
}
