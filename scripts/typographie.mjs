// Ajoute les espaces insécables françaises dans les fichiers de contenu.
// Usage : npm run typo   (ou : node scripts/typographie.mjs fichier.md …)
import { readFileSync, writeFileSync } from 'node:fs';
import { typographie } from '../src/lib/typographie.mjs';

const fichiers = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['content/kerwouf-refonte.md', 'content/mentions-legales.md', 'content/confidentialite.md', 'CORRECTIONS.md'];

for (const f of fichiers) {
  const avant = readFileSync(f, 'utf8');
  // On ne touche pas aux lignes de commentaire YAML ni aux URL.
  const apres = avant
    .split('\n')
    .map((ligne) => (ligne.trimStart().startsWith('#') && !ligne.trimStart().startsWith('##') ? ligne : typographie(ligne)))
    .join('\n');
  if (apres !== avant) writeFileSync(f, apres);
  console.log(`${apres !== avant ? 'modifié ' : 'inchangé'}  ${f}`);
}
