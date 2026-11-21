// Typographie française : espaces insécables.
// Utilisé au chargement du contenu (src/lib/contenu.ts) et par `npm run typo`.
// La fonction est idempotente : l'appliquer deux fois ne change rien.

const NBSP = ' '; // espace insécable
const NNBSP = ' '; // espace fine insécable

const UNITES = '€|%|h|j/7|m²|mois|ans|jours|chiens|nuits?|visites?';

/** @param {string} texte */
export function typographie(texte) {
  if (typeof texte !== 'string') return texte;
  return (
    texte
      // espace fine avant ; ! ?
      .replace(/ ([;!?])/g, `${NNBSP}$1`)
      // espace insécable avant les deux-points (suivis d'une espace ou en fin de texte)
      .replace(/ :(?=\s|$)/gm, `${NBSP}:`)
      // guillemets français
      .replace(/« /g, `«${NBSP}`)
      .replace(/ »/g, `${NBSP}»`)
      // nombres et unités : 20 €, 7 h, 18 h 30, 7 j/7, 12 m², 300 %
      .replace(new RegExp(`(\\d) (${UNITES})(?![\\p{L}])`, 'gu'), `$1${NBSP}$2`)
      .replace(/(\d) h (\d)/g, `$1${NBSP}h${NBSP}$2`)
      // séparateur de milliers : 1 000
      .replace(/(?<=\d) (?=\d{3}(?!\d))/g, NNBSP)
      // tiret de plage horaire : 7 h – 20 h
      .replace(/ – (?=\d)/g, `${NBSP}– `)
  );
}

/** Applique la typographie à toutes les chaînes d'un objet (récursif). */
export function typographieProfonde(valeur) {
  if (typeof valeur === 'string') return typographie(valeur);
  if (Array.isArray(valeur)) return valeur.map(typographieProfonde);
  if (valeur && typeof valeur === 'object') {
    return Object.fromEntries(Object.entries(valeur).map(([k, v]) => [k, typographieProfonde(v)]));
  }
  return valeur;
}
