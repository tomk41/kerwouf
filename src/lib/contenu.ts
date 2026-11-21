// Lecture du texte unique du site (content/kerwouf-refonte.md), partagé par les 5 versions.
import brut from '../../content/kerwouf-refonte.md?raw';
import { parse } from 'yaml';
import { typographieProfonde } from './typographie.mjs';

type Tarif = { libelle: string; prix: string };
type OffreJournee = {
  id: string; titre: string; accroche: string; texte: string; acces: string;
  inclus: string[]; tarifs: Tarif[];
};
type OffreSejour = {
  id: string; titre: string; periode: string; texte: string; arrivee_depart: string;
  navette: string; prix: string; unite: string;
};

export interface Contenu {
  site: {
    nom: string; baseline: string; titre_seo: string; description_seo: string;
    telephone: string; telephone_lien: string; email: string;
    adresse: { rue: string; code_postal: string; ville: string };
    disponibilite: string; youtube_id: string;
  };
  navigation: { ancre: string; libelle: string }[];
  accroche: {
    surtitre: string; titre: string; sous_titre: string; texte: string;
    bouton_principal: string; bouton_secondaire: string; atouts: string[];
  };
  services: {
    titre: string; intro: string;
    journee: { titre: string; sous_titre: string; intro: string; horaires: string; offres: OffreJournee[] };
    sejours: {
      titre: string; sous_titre: string; intro: string; offres: OffreSejour[]; inclus: string[];
      video: { titre: string; texte: string; bouton: string };
    };
    woufmobil: {
      titre: string; slogan: string; texte: string; trajets: { sens: string; quand: string }[];
      prix: string; unite: string; mention_prix: string; securite: string[]; bouton: string;
    };
  };
  reservation: { regle: string };
  nivillac: { titre: string; sous_titre: string; paragraphes: string[]; chiffres: { valeur: string; libelle: string }[] };
  journee_type: { titre: string; intro: string; etapes: { moment: string; titre: string; texte: string }[] };
  qui: {
    prenom: string; titre: string; accroche: string; paragraphes: string[];
    formation: { titre: string; texte: string };
    experiences: { titre: string; groupes: { titre: string; items: { texte: string; duree: string }[] }[] };
  };
  temoignages: { titre: string; intro: string; items: { chien: string; prestation: string; citation: string }[] };
  contact: {
    titre: string; texte: string; disponibilite: string; bouton_appel: string; bouton_sms: string;
    bouton_email: string; signature: string;
    formulaire: {
      titre: string; intro: string; nom: string; email: string; telephone: string; telephone_aide: string;
      message: string; consentement: string; lien_confidentialite: string; bouton: string;
      erreur_champs: string; erreur_envoi: string;
    };
  };
  merci: { titre: string; texte: string; bouton: string };
  libelles: {
    services: string; tableau_tarifs: string; important: string; navette: string;
    journee: string; contact: string; contact_accroche: string; en_bref: string;
    horaires: string; navette_court: string;
  };
  pied_de_page: { mentions: string; confidentialite: string };
}

const yamlBrut = brut.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
if (!yamlBrut) throw new Error('content/kerwouf-refonte.md : frontmatter YAML introuvable');

export const c = typographieProfonde(parse(yamlBrut)) as Contenu;

// Liens de contact
export const lienTel = `tel:${c.site.telephone_lien}`;
export const lienSms = `sms:${c.site.telephone_lien}`;
export const lienMail = `mailto:${c.site.email}`;
/** Numéro affiché sans coupure de ligne */
export const telAffiche = c.site.telephone.replace(/ /g, ' ');
export const adresseLigne = `${c.site.adresse.rue}, ${c.site.adresse.code_postal} ${c.site.adresse.ville}`;
