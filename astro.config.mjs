// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages project site until Jess picks a domain; then set `site` to it and drop `base`.
export default defineConfig({
  site: 'https://peas.github.io',
  base: '/jessduma',
  trailingSlash: 'always',
});
