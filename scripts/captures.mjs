// Captures d'écran du haut de chaque version (desktop + mobile) pour la page de choix.
// Usage : npm run screenshots   (construit le site, capture, puis il faut reconstruire
// pour que les nouvelles captures soient incluses : npm run build)
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { demarrerPreview } from './preview.mjs';
import { versions } from '../src/lib/versions.ts';

const dossier = 'public/captures';
mkdirSync(dossier, { recursive: true });

const formats = [
  { nom: 'desktop', viewport: { width: 1440, height: 900 }, deviceScaleFactor: 0.6 },
  { nom: 'mobile', viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 },
];

const { url, arreter } = await demarrerPreview();
const navigateur = await chromium.launch();
try {
  for (const v of versions) {
    for (const f of formats) {
      const contexte = await navigateur.newContext({ viewport: f.viewport, deviceScaleFactor: f.deviceScaleFactor, reducedMotion: 'reduce' });
      const page = await contexte.newPage();
      await page.goto(`${url}/${v.slug}/`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);
      const fichier = `${dossier}/${v.slug}-${f.nom}.jpg`;
      await page.screenshot({ path: fichier, type: 'jpeg', quality: 72 });
      console.log(`✓ ${fichier}`);
      await contexte.close();
    }
  }
} finally {
  await navigateur.close();
  arreter();
}
