// Contrôle qualité du site construit (./dist) :
//  - captures pleine page à 375, 768 et 1440 px (dossier controle/, non versionné)
//  - détection du défilement horizontal
//  - audit d'accessibilité axe-core (WCAG 2 A/AA)
//  - liens internes cassés et ressources en erreur (images, polices, CSS, JS…)
// Usage : npm run build && npm run controle [-- v1 v3]   (sans argument : tout le site)
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';
import { demarrerPreview } from './preview.mjs';

const args = process.argv.slice(2);
const versions = args.length ? args : ['v1', 'v2', 'v3', 'v4', 'v5'];
const pages = [
  ...(args.length ? [] : ['/', '/corrections/', '/page-inexistante/']),
  ...versions.flatMap((v) => [`/${v}/`, `/${v}/mentions-legales/`, `/${v}/confidentialite/`, `/${v}/merci/`]),
];
const largeurs = [375, 768, 1440];
const dossier = 'controle';
mkdirSync(dossier, { recursive: true });

const { url, origine, arreter } = await demarrerPreview();
const navigateur = await chromium.launch();
let problemes = 0;
const vus = new Set();
const liens = new Set();

for (const chemin of pages) {
  for (const largeur of largeurs) {
    const contexte = await navigateur.newContext({ viewport: { width: largeur, height: 900 }, reducedMotion: 'reduce' });
    const page = await contexte.newPage();
    const enErreur = [];
    page.on('response', (r) => {
      const estPage = r.request().resourceType() === 'document' && chemin === '/page-inexistante/';
      if (r.status() >= 400 && !estPage) enErreur.push(`${r.status()} ${r.url()}`);
    });
    page.on('requestfailed', (r) => enErreur.push(`échec ${r.url()}`));
    const rep = await page.goto(url + chemin, { waitUntil: 'networkidle' });
    const statut = rep?.status();
    // Force le chargement des images paresseuses avant la capture
    await page.evaluate(async () => {
      for (const img of document.querySelectorAll('img[loading="lazy"]')) img.loading = 'eager';
      await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
    });
    const debord = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const nom = `${chemin.replace(/\//g, '_').replace(/^_|_$/g, '') || 'choix'}-${largeur}`;
    if (chemin.match(/^\/v\d\/$/) || chemin === '/') {
      await page.screenshot({ path: `${dossier}/${nom}.jpg`, fullPage: true, type: 'jpeg', quality: 60 });
    }
    if (largeur === 1440 && /undefined|\[object Object\]/.test(await page.innerText('body'))) { problemes++; console.log(`✗ ${chemin} : texte « undefined » (champ de contenu manquant)`); }
    if (largeur === 1440) {
      const texte = await page.innerText('body');
      if (chemin.endsWith('mentions-legales/') && !texte.includes('Théotine Henique')) { problemes++; console.log(`✗ ${chemin} : nom complet de l'éditrice absent`); }
      if (chemin === '/page-inexistante/' && !texte.includes('cette page n’existe pas')) { problemes++; console.log(`✗ ${chemin} : page 404 personnalisée non servie`); }
    }
    if (debord > 0) { problemes++; console.log(`✗ ${chemin} @${largeur}px : défilement horizontal de ${debord}px`); }
    if (statut !== 200 && chemin !== '/page-inexistante/') { problemes++; console.log(`✗ ${chemin} : HTTP ${statut}`); }

    if (largeur === 375 || largeur === 1440) {
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      for (const v of axe.violations) {
        const cle = `${chemin}|${v.id}|${largeur}`;
        if (vus.has(cle)) continue;
        vus.add(cle);
        problemes++;
        console.log(`✗ ${chemin} @${largeur}px [axe ${v.impact}] ${v.id} : ${v.help}`);
        for (const n of v.nodes.slice(0, 4)) console.log(`     ${n.target.join(' ')}  ${n.failureSummary?.split('\n').slice(1, 2).join(' ') ?? ''}`);
      }
    }
    if (largeur === 1440) {
      for (const href of await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href')))) liens.add(href.split('#')[0]);
    }
    for (const e of new Set(enErreur)) { problemes++; console.log(`✗ ${chemin} @${largeur}px : ressource en erreur ${e}`); }
    await contexte.close();
  }
  console.log(`· ${chemin} contrôlée`);
}

// Liens internes
for (const href of liens) {
  if (!href || href.endsWith('.php')) continue;
  const r = await fetch(origine + href);
  if (r.status !== 200) { problemes++; console.log(`✗ lien cassé : ${href} (HTTP ${r.status})`); }
}

await navigateur.close();
arreter();
console.log(problemes ? `\n${problemes} problème(s) détecté(s).` : '\nAucun problème détecté.');
process.exit(problemes ? 1 : 0);
