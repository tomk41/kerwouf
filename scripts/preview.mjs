// Démarre `astro preview` (serveur d'arrière-plan d'Astro) sur ./dist et attend qu'il réponde.
// Si un serveur de prévisualisation tourne déjà (ex. lancé à la main), on le réutilise.
// `url` inclut le préfixe du site (/beta) ; `origine` est l'adresse du serveur seule.
import { execSync } from 'node:child_process';

export const BASE = '/beta'; // identique à `base` dans astro.config.mjs

const astro = (args) => execSync(`npx astro preview ${args}`, { stdio: 'pipe' }).toString();

export async function demarrerPreview(port = 4329) {
  let origine = `http://localhost:${port}`;
  let lanceIci = false;
  const etat = (() => { try { return astro('status'); } catch { return ''; } })();
  const existant = etat.match(/http:\/\/localhost:(\d+)/);
  if (existant) {
    origine = `http://localhost:${existant[1]}`;
  } else {
    astro(`--background --port ${Number(port)}`);
    lanceIci = true;
  }
  const url = origine + BASE;
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(url + '/');
      if (r.ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  const arreter = () => { if (lanceIci) { try { astro('stop'); } catch {} } };
  return { url, origine, arreter };
}
