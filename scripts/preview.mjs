// Démarre `astro preview` (serveur d'arrière-plan d'Astro) sur ./dist et attend qu'il réponde.
// Si un serveur de prévisualisation tourne déjà (ex. lancé à la main), on le réutilise.
import { execSync } from 'node:child_process';

const astro = (args) => execSync(`npx astro preview ${args}`, { stdio: 'pipe' }).toString();

export async function demarrerPreview(port = 4329) {
  let url = `http://localhost:${port}`;
  let lanceIci = false;
  const etat = (() => { try { return astro('status'); } catch { return ''; } })();
  const existant = etat.match(/http:\/\/localhost:(\d+)/);
  if (existant) {
    url = `http://localhost:${existant[1]}`;
  } else {
    astro(`--background --port ${Number(port)}`);
    lanceIci = true;
  }
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(url + '/');
      if (r.ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  const arreter = () => { if (lanceIci) { try { astro('stop'); } catch {} } };
  return { url, arreter };
}
