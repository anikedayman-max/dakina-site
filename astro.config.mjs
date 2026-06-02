import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Note: on n'utilise PAS la config `i18n` native d'Astro car elle entre
// en conflit avec @astrojs/sitemap dans cette version. À la place, on gère
// l'i18n manuellement via la structure de dossiers (src/pages/fr/...) et
// notre propre utilitaire src/i18n/utils.ts.
export default defineConfig({
  site: 'https://dakina-consulting.fr',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
});
