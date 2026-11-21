// Construit un lien interne en tenant compte du préfixe du site (base: '/beta' dans astro.config.mjs).
// lien('')            -> /beta/
// lien('v1/')         -> /beta/v1/
// lien('contact.php') -> /beta/contact.php
// Le jour où le site passe à la racine du domaine, seul `base` change : tous les liens suivent.
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export const lien = (chemin = ''): string => `${BASE}/${chemin.replace(/^\/+/, '')}`;
