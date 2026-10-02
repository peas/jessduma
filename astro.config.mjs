// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The proposal pages (/a, /b, /c, /propostas) stay online but noindex, so the sitemap lists only the home.
const proposta = /\/(a|b|c|propostas)\//;

export default defineConfig({
  site: 'https://jessduma.com.br',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !proposta.test(new URL(page).pathname) })],
});
