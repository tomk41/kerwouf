---
# ============================================================================
#  TEXTE UNIQUE DU SITE KER WOUF : lu par les 5 versions (v1 à v5).
#  Pour modifier un texte : changez ce qui est entre guillemets, sans toucher
#  aux mots situés avant les deux-points (ce sont des repères pour le code).
#  Les espaces insécables (avant : ; ! ? €, dans « 7 h »…) sont ajoutées
#  automatiquement à la construction du site : tapez des espaces normales.
#  Texte d'origine (référence, ne pas modifier) : content/kerwouf.md
# ============================================================================

site:
  nom: "Ker Wouf"
  baseline: "Garde de chiens et pension familiale à Nivillac"
  titre_seo: "Ker Wouf – Pension canine familiale et garde de chiens à Nivillac"
  description_seo: "Pension canine familiale à Nivillac (Morbihan) : 8 chiens maximum, grand jardin, balades. Visites à domicile et navette depuis Nantes."
  telephone: "06 75 81 70 92"
  telephone_lien: "+33675817092"
  email: "kerwouf@gmail.com"
  adresse:
    rue: "19 Le Couédelo"
    code_postal: "56130"
    ville: "Nivillac"
  disponibilite: "7 j/7, de 7 h à 20 h"
  youtube_id: "HJP2rxexIew"

navigation:
  - { ancre: "services", libelle: "Services" }
  - { ancre: "nivillac", libelle: "À Nivillac" }
  - { ancre: "qui-suis-je", libelle: "Qui suis-je ?" }
  - { ancre: "temoignages", libelle: "Avis" }
  - { ancre: "contact", libelle: "Contact" }

accroche:
  surtitre: "Pension familiale & garde de chiens"
  titre: "Une deuxième maison pour vos animaux"
  sous_titre: "Pleine d’amour, de câlins et de grandes balades."
  texte: "Vous partez l’esprit léger, votre compagnon profite du grand air. Visites à domicile ou séjours à la campagne à Nivillac : Théotine veille sur lui avec passion."
  bouton_principal: "Appeler Théotine"
  bouton_secondaire: "Voir les services et tarifs"
  atouts:
    - "8 chiens au maximum"
    - "Plus de 1 000 m² de jardin"
    - "Diplômée BAC Pro Canin Félin"
    - "Joignable 7 j/7, de 7 h à 20 h"

services:
  titre: "Une formule pour chaque situation"
  intro: "Une longue journée de travail, un week-end loin de la maison ou des vacances bien méritées ? Choisissez la garde qui vous ressemble."

  journee:
    titre: "À la journée"
    sous_titre: "Visites à domicile"
    intro: "Votre animal garde ses habitudes, chez lui. Je passe le voir, je m’occupe de lui, et vous rentrez l’esprit tranquille."
    horaires: "Du lundi au jeudi de 7 h à 20 h, le vendredi de 7 h à 12 h"
    offres:
      - id: "chien"
        titre: "Visite chien"
        accroche: "Il se dépense, vous respirez"
        texte: "Je promène votre chien dans de grands espaces verts. Il se dépense, il joue et il peut même se faire des copains."
        acces: "Chez vous : confiez-moi vos clés, déposez-les dans une boîte à clés ou laissez votre chien dans le jardin."
        inclus:
          - "2 h de balade par jour"
          - "Nourrissage"
          - "Petits soins"
          - "Prise de médicaments si besoin"
        tarifs:
          - { libelle: "1 visite par jour", prix: "20 €" }
          - { libelle: "2 visites par jour", prix: "30 €" }
      - id: "chat"
        titre: "Visite chat"
        accroche: "Présence et attention, sans stress"
        texte: "Je rends visite à votre chat pour veiller à son bien-être : je le nourris, je nettoie sa litière et je lui offre présence et attention."
        acces: "Chez vous : confiez-moi vos clés ou déposez-les dans une boîte à clés."
        inclus:
          - "Caresses et jeux"
          - "Nourrissage"
          - "Petits soins"
          - "Prise de médicaments si besoin"
        tarifs:
          - { libelle: "1 visite par jour", prix: "12 €" }
          - { libelle: "2 visites par jour", prix: "20 €" }

  sejours:
    titre: "2 jours et plus"
    sous_titre: "La pension à la campagne, à Nivillac"
    intro: "Votre chien part en séjour actif et collectif, en pleine campagne morbihannaise. Au programme : grand air, jeux et copains."
    offres:
      - id: "week-end"
        titre: "Pension week-end"
        periode: "Hors vacances scolaires"
        texte: "J’emmène votre chien passer le week-end à la campagne : un séjour actif et collectif."
        arrivee_depart: "Arrivée le vendredi à partir de 19 h, départ le dimanche avant 18 h 30."
        navette: "Navette possible depuis Nantes : départ le vendredi soir entre 16 h 30 et 18 h, retour vers 20 h le dimanche."
        prix: "22 €"
        unite: "la nuit"
      - id: "vacances"
        titre: "Pension vacances"
        periode: "Pendant les vacances scolaires"
        texte: "Je garde votre chien pendant vos vacances, pour qu’il passe lui aussi une belle semaine, active et collective."
        arrivee_depart: "Arrivée et départ de 7 h à 20 h, 7 j/7. Séjour à partir de 2 jours."
        navette: "Navette possible depuis Nantes : départ le premier vendredi soir des vacances entre 16 h 30 et 18 h, retour vers 20 h le dernier dimanche des vacances."
        prix: "22 €"
        unite: "la nuit"
    inclus:
      - "Dehors de 8 h à 18 h : balades, jeux dans le verger et moments entre chiens, toujours encadrés"
      - "En groupe, ou seul si votre chien en a besoin"
      - "À Nivillac, au cœur de la campagne morbihannaise"
    video:
      titre: "Une journée à la pension, en vidéo"
      texte: "Envie de voir à quoi ressemble une journée chez Ker Wouf ? Suivez les pensionnaires en balade."
      bouton: "Regarder la vidéo"

  woufmobil:
    titre: "Option Wouf’Mobil"
    slogan: "Zéro stress, 100 % caresses"
    texte: "La navette Ker Wouf vous simplifie la vie. Plus besoin de faire la route jusqu’à Nivillac : partez sereinement en week-end ou en vacances, je m’occupe du trajet de votre chien, en toute sécurité."
    trajets:
      - { sens: "Nantes → Nivillac", quand: "le vendredi soir" }
      - { sens: "Nivillac → Nantes", quand: "le dimanche soir" }
    prix: "15 €"
    unite: "par trajet"
    mention_prix: "Tarif unique"
    securite:
      - "Cages de transport adaptées et solidement arrimées"
      - "Conductrice diplômée et habilitée à conduire un utilitaire transportant des animaux"
      - "Véhicule conforme : assurance, sécurité, documents"
    bouton: "Réserver la navette"

reservation:
  regle: "Une réservation n’est confirmée qu’après un échange par téléphone ou SMS. Un simple e-mail ne suffit pas."

nivillac:
  titre: "À Nivillac, la campagne pour terrain de jeu"
  sous_titre: "Pension pendant les vacances scolaires et le week-end"
  paragraphes:
    - "Vos chiens sont accueillis dans un cadre champêtre et familial, au cœur d’une ancienne ferme en rénovation."
    - "L’ancienne étable est devenue un petit chenil confortable. Il accueille 8 chiens au maximum : un nombre volontairement limité pour garder une ambiance calme et chaleureuse."
    - "J’habite juste à côté, dans la maison attenante : je suis présente en permanence."
    - "Le chenil compte quatre box de 10 à 12 m², chauffés en hiver. Les chiens y sont répartis selon leurs affinités (ou leurs mésententes !). Chacun a son propre tapis moelleux pour se reposer en toute tranquillité."
    - "Dehors, un grand jardin de plus de 1 000 m² les attend pour jouer librement. Et pour les balades : la campagne morbihannaise et les sentiers paisibles qui bordent la Vilaine."
  chiffres:
    - { valeur: "8", libelle: "chiens au maximum" }
    - { valeur: "4", libelle: "box chauffés de 10 à 12 m²" }
    - { valeur: "+ de 1 000 m²", libelle: "de jardin pour jouer" }
    - { valeur: "1", libelle: "tapis moelleux par chien" }

journee_type:
  titre: "Une journée type à la pension"
  intro: "Du grand air, des copains et du repos : voici comment se passe une journée à Nivillac."
  etapes:
    - moment: "Au réveil"
      titre: "Bonjour la campagne !"
      texte: "Après une nuit au calme dans son box, sur son tapis moelleux, votre chien est prêt pour une belle journée."
    - moment: "De 8 h à 18 h"
      titre: "Cap sur le grand air"
      texte: "La journée se passe dehors : balades dans la campagne morbihannaise et sur les sentiers qui bordent la Vilaine, jeux dans le verger."
    - moment: "Tout au long de la journée"
      titre: "Entre copains"
      texte: "Des moments entre chiens, toujours encadrés. Les groupes se font selon les affinités, et votre chien peut rester seul s’il en a besoin."
    - moment: "Le soir"
      titre: "Repos bien mérité"
      texte: "Retour au box, chauffé en hiver, pour une bonne nuit. J’habite juste à côté : je veille sur la petite troupe."

qui:
  prenom: "Théotine"
  titre: "Qui suis-je ?"
  accroche: "Théotine, passionnée de chiens depuis toujours"
  paragraphes:
    - "Je m’appelle Théotine et les chiens sont ma passion depuis toujours."
    - "Depuis 2 ans, je vis enfin mon rêve : je les garde au quotidien, entre promenades, jeux et moments câlins."
    - "En 2025, j’ai franchi une nouvelle étape : j’ai lancé ma propre pension et je suis devenue auto-entrepreneuse, pour vivre pleinement de ce métier qui me tient à cœur."
  formation:
    titre: "Formation"
    texte: "BAC Pro Canin Félin, diplômée en 2024 : je suis qualifiée et habilitée à ouvrir une pension canine."
  experiences:
    titre: "Expériences"
    groupes:
      - titre: "Canin et félin"
        items:
          - { texte: "Élevage de chiens de différentes races", duree: "10 mois" }
          - { texte: "Pension canine", duree: "6 mois" }
          - { texte: "Éducation canine", duree: "1 mois ½" }
      - titre: "Agricole"
        items:
          - { texte: "Élevage de chèvres laitières", duree: "4 mois" }
          - { texte: "Élevage de poules pondeuses", duree: "5 mois" }
      - titre: "Zoologique"
        items:
          - { texte: "Parc zoologique Le Pal", duree: "1 mois ½" }
          - { texte: "Zoo des Sables", duree: "2 mois" }

temoignages:
  titre: "Ils ont adoré !"
  intro: "Les maîtres de mes pensionnaires racontent."
  items:
    - chien: "Django"
      prestation: "Visite à domicile"
      citation: "Théotine est une super dog-sitter, très professionnelle, ponctuelle et passionnée. Elle promène Django chaque semaine depuis septembre et il l’adore ! Je lui fais confiance à 300 %."
    - chien: "Tosca"
      prestation: "Pension vacances"
      citation: "Tout s’est très bien passé. Tosca a vite trouvé ses marques avec Théotine, la maîtresse des lieux. On sent la passion pour son travail. Si vous avez besoin d’une solution de pet-sitting ou de pension canine en Loire-Atlantique, vous pouvez y aller les yeux fermés. Votre chien sera en sécurité et gardé avec beaucoup d’attention."
    - chien: "Tiago"
      prestation: "Pension vacances"
      citation: "Théotine garde régulièrement notre chien, un berger des Shetland qui a un tempérament craintif et s’est pourtant tout de suite senti à l’aise. Théotine est une personne de grande confiance, très consciencieuse et très sympathique. Le calme et la gentillesse qu’elle rayonne apportent beaucoup de sécurité et de joie à ses pensionnaires."

contact:
  titre: "Parlons de votre compagnon"
  texte: "Pour réserver, le plus simple est de m’appeler ou de m’envoyer un SMS. Vous pouvez aussi m’écrire par e-mail ou avec le formulaire ci-dessous."
  disponibilite: "Je suis joignable 7 j/7, de 7 h à 20 h."
  bouton_appel: "Appeler"
  bouton_sms: "Envoyer un SMS"
  bouton_email: "Écrire un e-mail"
  signature: "À très vite !"
  formulaire:
    titre: "Ou laissez-moi un message"
    intro: "Indiquez les dates, votre chien (ou votre chat) et la formule qui vous intéresse : je reviens vers vous par téléphone pour en parler."
    nom: "Votre nom"
    email: "Votre e-mail"
    telephone: "Votre téléphone"
    telephone_aide: "Pour que je puisse vous rappeler et confirmer la réservation."
    message: "Votre message"
    consentement: "J’accepte que mes données soient utilisées pour répondre à ma demande."
    lien_confidentialite: "En savoir plus sur la confidentialité"
    bouton: "Envoyer ma demande"
    erreur_champs: "Certains champs sont manquants ou incorrects. Vérifiez le formulaire puis renvoyez-le."
    erreur_envoi: "Le message n’a pas pu partir. Appelez-moi ou envoyez-moi un SMS, je vous réponds vite."

merci:
  titre: "Merci, votre message est bien parti !"
  texte: "Je vous recontacte dès que possible. Pour rappel, votre réservation sera confirmée après un échange par téléphone ou SMS."
  bouton: "Revenir à l’accueil"

libelles:
  services: "Services & tarifs"
  tableau_tarifs: "Tarifs et horaires, en un coup d’œil"
  important: "Important"
  navette: "Navette Nantes ↔ Nivillac"
  journee: "Au programme"
  contact: "Contact & réservation"
  contact_accroche: "On en parle ?"
  en_bref: "En bref"
  horaires: "Horaires"
  navette_court: "Navette"

pied_de_page:
  mentions: "Mentions légales"
  confidentialite: "Confidentialité"
---

Ce fichier ne contient que des données (en haut, entre les deux lignes `---`).
Le texte d'origine du site WordPress est conservé dans `content/kerwouf.md`.
Les changements par rapport à l'original sont listés dans `CORRECTIONS.md`.
