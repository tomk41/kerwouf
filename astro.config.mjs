// @ts-check
import { defineConfig } from 'astro/config';

// Site statique : `npm run build` produit ./dist/, déployé tel quel dans www/beta/ chez OVH.
// La bêta est servie sous https://kerwouf.fr/beta/ : tous les liens internes passent par
// `lien()` (src/lib/chemins.ts), qui ajoute ce préfixe.
export default defineConfig({
  site: 'https://kerwouf.fr',
  base: '/beta',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory', // /v1/merci/ -> dist/v1/merci/index.html
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
});
