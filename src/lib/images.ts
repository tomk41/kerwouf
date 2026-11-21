// Catalogue des photos du site, avec leur texte alternatif.
// Pour ajouter une image : la déposer dans src/assets/images/, l'importer ici
// et lui donner un alt qui décrit ce qu'on voit (voir README).
import type { ImageMetadata } from 'astro';

import accroche from '../assets/images/accroche.jpg';
import logo from '../assets/images/logo.webp';
import meute from '../assets/images/services-meute-chemin.jpeg';
import woufmobil from '../assets/images/wouf-mobil.png';
import maison from '../assets/images/nivillac-maison-fond.png';
import etable from '../assets/images/nivillac-montage-carre.png';
import box from '../assets/images/nivillac-chenil-box.png';
import verger from '../assets/images/nivillac-montage-photos-fond.png';
import theotine from '../assets/images/theotine.jpg';
import theotineYorkshire from '../assets/images/theotine-pelouse-yorkshire.jpg';
import django from '../assets/images/temoignage-django.jpg';
import tosca from '../assets/images/temoignage-tosca.jpg';
import tiago from '../assets/images/temoignage-tiago.jpg';
import pre from '../assets/images/contact-theotine-chiens-pre.jpg';
import neige from '../assets/images/contact-chien-neige.jpeg';
import riviere from '../assets/images/contact-labrador-riviere.jpg';

export interface Photo {
  src: ImageMetadata;
  alt: string;
  /** Qualité WebP (les visuels lourds de Nivillac sont plus compressés). */
  qualite?: number;
  /** Largeur maximale générée, pour tenir un poids raisonnable. */
  maxLargeur?: number;
}

export const photos = {
  accroche: {
    src: accroche,
    alt: 'Théotine marche dans une prairie avec un braque et un yorkshire en laisse, au bord d’un étang, dans la lumière du soir',
  },
  logo: { src: logo, alt: 'Ker Wouf' },
  meute: {
    src: meute,
    alt: 'Cinq chiens en balade sur un chemin de campagne bordé de fougères, vus depuis les laisses',
  },
  woufmobil: {
    src: woufmobil,
    alt: 'Illustration de la Wouf’Mobil : un utilitaire Ker Wouf conduit par Théotine, avec quatre chiens souriants à bord',
  },
  maison: {
    src: maison, qualite: 72,
    alt: 'Façade en pierre de l’ancienne ferme de Nivillac, aux volets et à la porte bleus',
  },
  etable: {
    src: etable, qualite: 70,
    alt: 'L’ancienne étable, dont le toit a été retiré pour créer un grand espace en plein air complètement clos, avec grillage et vue sur le parc. Théotine et deux chiens y courent.',
  },
  box: {
    src: box, qualite: 70,
    alt: 'Intérieur d’un box du chenil : un tapis par chien nettoyé régulièrement, une à deux gamelles par chien, des jouets et un sol en béton nettoyé tous les jours',
  },
  verger: {
    src: verger, qualite: 52, maxLargeur: 1200,
    alt: 'Le verger clôturé de 1 000 m², avec ses pommiers en fleurs et sa grande pelouse',
  },
  theotine: {
    src: theotine,
    alt: 'Théotine accroupie au bord de l’eau, souriante, avec un braque et un yorkshire',
  },
  theotineYorkshire: {
    src: theotineYorkshire,
    alt: 'Théotine assise dans l’herbe au soleil, un petit yorkshire à ses côtés',
  },
  django: { src: django, alt: 'Django, chien beige et blanc au harnais rouge, en balade' },
  tosca: { src: tosca, alt: 'Tosca, chienne noir et feu au harnais rose, assise dans les sous-bois' },
  tiago: { src: tiago, alt: 'Tiago, berger des Shetland, dans une prairie fleurie de boutons d’or' },
  pre: {
    src: pre,
    alt: 'Théotine debout dans un pré ensoleillé, entourée de quatre chiens attentifs',
  },
  neige: { src: neige, alt: 'Un épagneul noir et blanc assis sur un chemin enneigé, la langue tirée' },
  riviere: { src: riviere, alt: 'Un labrador chocolat qui se rafraîchit dans une rivière' },
} satisfies Record<string, Photo>;

export type NomPhoto = keyof typeof photos;

/** Photo associée à chaque témoignage (par prénom du chien). */
export const photoTemoignage: Record<string, NomPhoto> = {
  Django: 'django',
  Tosca: 'tosca',
  Tiago: 'tiago',
};
