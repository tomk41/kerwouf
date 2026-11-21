// Les 5 propositions de design. L'ordre définit la navigation « précédente / suivante ».
export interface Version {
  n: number;
  slug: string; // v1…v5, utilisé dans l'URL
  nom: string;
  description: string; // 2 lignes pour la page de choix
  couleur: string; // couleur de thème (meta theme-color)
}

export const versions: Version[] = [
  {
    n: 1, slug: 'v1', nom: 'Campagne chaleureuse', couleur: '#5f7a5a',
    description: 'Vert sauge, crème et terracotta, titres en serif douce. Grande photo plein écran et coins arrondis : l’esprit maison de famille.',
  },
  {
    n: 2, slug: 'v2', nom: 'Moderne épurée', couleur: '#0b6e6e',
    description: 'Fond blanc, grande typographie et beaucoup d’espace, un seul accent bleu-vert « Vilaine ». Tarifs en tableau comparatif.',
  },
  {
    n: 3, slug: 'v3', nom: 'Ludique et joyeuse', couleur: '#ff7a59',
    description: 'Couleurs vives, formes arrondies et empreintes de pattes, petites animations. Un site qui remue la queue.',
  },
  {
    n: 4, slug: 'v4', nom: 'Carnet de balade breton', couleur: '#3e5468',
    description: 'Bleu ardoise, vert lande et papier beige, titres manuscrits, photos polaroïd. La journée type du chien racontée comme un carnet.',
  },
  {
    n: 5, slug: 'v5', nom: 'Boutique premium', couleur: '#211d1a',
    description: 'Mise en page éditoriale, serif élégante, noir chaud et beige. Grandes photos pleine largeur et beaucoup de respiration.',
  },
];

export const versionParNumero = (n: number) => versions[n - 1];
export const precedente = (n: number) => versions[(n + 3) % 5];
export const suivante = (n: number) => versions[n % 5];
