// @ts-check
import { defineConfig } from 'astro/config';

// Site statique : `npm run build` produit ./dist/, déployé tel quel dans ./beta/ chez OVH.
export default defineConfig({
  site: 'https://beta.kerwouf.fr',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory', // /v1/merci/ -> dist/v1/merci/index.html
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
});
