# Migration kerwouf.fr : rapport d'import

Extraction réalisée le 21/11/2026 depuis https://kerwouf.fr/ (WordPress 7.1.5, thème OnePage Express 1.3.45, plugin OnePage Express Companion 1.6.42).

| Fichier | Contenu |
|---|---|
| `import/original.html` | HTML brut de la page d'accueil, tel que servi à un visiteur non connecté |
| `import/correspondance-images.tsv` | Table ancien nom → nouveau nom → section → URL source |
| `content/kerwouf.md` | Texte mot pour mot, section par section, avec les images et les liens |
| `public/images/` | 32 images, 15,5 Mo au total |

## Images

Pour chaque fichier suffixé `-e…` (recadrage WordPress) ou `-scaled`, l'original sans suffixe existait sur le serveur et a été récupéré (`*-original.*`). Les vignettes `cropped-*` des témoignages et du logo ont aussi leur original. Les 9 emojis `s.w.org` ont été ignorés : le texte garde les caractères emoji.

| Fichier | Section | Poids |
|---|---|---|
| `hero-fond-balade-etang.jpg` | Accroche (fond CSS) | 80 Ko |
| `titre-ker-wouf.png` | Accroche | 34 Ko |
| `titre-ker-wouf-original.png` | Accroche (original) | 124 Ko |
| `logo.webp` | En-tête | 42 Ko |
| `logo-original.webp` | En-tête (original) | 43 Ko |
| `favicon-512.webp` | Icône du site (original) | 183 Ko |
| `favicon-32.webp` | Icône du site | 2 Ko |
| `favicon-192.webp` | Icône du site | 42 Ko |
| `apple-touch-icon-180.webp` | Icône du site | 37 Ko |
| `mstile-270.webp` | Icône du site | 70 Ko |
| `services-meute-chemin.jpeg` | Services | 600 Ko |
| `services-meute-chemin-original.jpeg` | Services (original) | 581 Ko |
| `wouf-mobil.png` | Services | 504 Ko |
| `nivillac-maison-fond.png` | Nivillac (fond CSS) | 1 165 Ko |
| `nivillac-montage-carre.png` | Nivillac | 2 170 Ko |
| `nivillac-chenil-box.png` | Nivillac | 1 451 Ko |
| `nivillac-montage-photos-fond.png` | Nivillac (fond CSS) | 6 054 Ko |
| `theotine-pelouse-yorkshire.jpg` | Qui suis-je | 138 Ko |
| `theotine.jpg` | Qui suis-je | 109 Ko |
| `temoignage-django.jpg` | Témoignages | 67 Ko |
| `temoignage-django-original.jpg` | Témoignages (original) | 78 Ko |
| `temoignage-tosca.jpg` | Témoignages | 73 Ko |
| `temoignage-tosca-original.jpg` | Témoignages (original) | 97 Ko |
| `temoignage-tiago.jpg` | Témoignages | 77 Ko |
| `temoignage-tiago-original.jpg` | Témoignages (original) | 131 Ko |
| `contact-theotine-chiens-pre.jpg` | Contact | 93 Ko |
| `contact-theotine-chiens-pre-original.jpg` | Contact (original) | 173 Ko |
| `contact-chien-neige.jpeg` | Contact | 262 Ko |
| `contact-chien-neige-original.jpeg` | Contact (original) | 251 Ko |
| `contact-labrador-riviere.jpg` | Contact | 275 Ko |
| `contact-labrador-riviere-original.jpg` | Contact (original) | 645 Ko |
| `theme-fond-body-new-york.jpg` | Fond `body` du thème, masqué par un calque blanc | 189 Ko |

Points d'attention :
- **Poids** : les 4 PNG de Nivillac pèsent 10,8 Mo à eux seuls (dont 6 Mo pour `nivillac-montage-photos-fond.png`). À convertir en WebP/AVIF et redimensionner.
- **Image d'accroche en basse définition** : `hero-fond-balade-etang.jpg` ne fait que 800×600 et aucun original plus grand n'existe. Elle sera floue en plein écran. Il faudra la demander à la propriétaire.
- **`theme-fond-body-new-york.jpg`** est une image de démo du thème, invisible sur le site. On peut probablement l'abandonner.
- Les vignettes des témoignages (500×500) sont agrandies à partir d'originaux de 358 px de large pour Django et Tosca.
- **Textes alternatifs** : presque tous les `alt` sont vides. Seuls le logo (« Ker Wouf »), `theotine.jpg` (« Théotine ») et `wouf-mobil.png` (« kerwouf mobile ») en ont un.
- `https://kerwouf.fr/favicon.ico` renvoie le favicon 32×32 en WebP. Il n'y a pas de vrai `.ico`.
- Images de la CSS du thème non récupérées : il s'agit d'icônes de menu (`hamburger.png`, `close_icon.png`, flèches) et d'images de démo de sections non utilisées.

## Ce qui pourrait manquer

### Contenu hors page d'accueil (via l'API WordPress)
- **Article de blog publié** : « Comment préparer votre chien à votre départ en vacances ? » (20/02/2026), page `/blog/`. Il n'est pas importé. À récupérer si le blog doit être conservé, ou à rediriger en 301.
- Contenus par défaut de WordPress, sans intérêt : article « Bonjour tout le monde ! » et « Page d'exemple ».
- **Médiathèque** : une vingtaine d'images ne sont pas utilisées sur la page, par exemple `2026/03/1.png`, `3.png` et `5.png` (probablement d'autres photos annotées du chenil, comme `2.png`), des captures d'écran, `1903x536_chien_dans_hamac_1.webp`, d'autres photos WhatsApp de janvier 2026, `Titre-et-sous-titre-scaled.png` et `width_800.webp`. Liste complète : `https://kerwouf.fr/wp-json/wp/v2/media?per_page=100`. Elles ne sont pas téléchargées.

### Formulaire
- **Aucun formulaire de contact** : la réservation se fait par téléphone, SMS ou mail.
- **Le téléphone et l'email ne sont pas cliquables** : ce sont du texte brut, sans `tel:` ni `mailto:`. À corriger dans la refonte.
- La vidéo YouTube n'est pas intégrée. Elle est seulement accessible par un lien externe (`https://youtu.be/HJP2rxexIew`).

### Analytics et SEO
- **Site Kit by Google 1.172.0** est installé, avec un `dns-prefetch` vers `googletagmanager.com`, mais **aucun tag GA4/GTM n'est présent** dans le HTML servi. Il faut vérifier dans l'admin si Analytics est configuré ou désactivé.
- **Google Search Console** : la balise `google-site-verification` (`MDpUUi5wdgcoa7W-jFQRB5oDSIC-bBZ69cg5Xft2yAQ`) doit être conservée, ou la propriété vérifiée autrement (DNS).
- **Pas de meta description, ni de balises Open Graph ou Twitter, ni de données structurées** (`LocalBusiness`). Tout est à créer.
- La structure des titres n'est pas cohérente : un seul `h1` (« SERVICES »), des `h4` et `h5` utilisés pour du texte courant.

### Légal
- **Pas de mentions légales** (`/mentions-legales/` renvoie une 404, et aucun lien n'y mène). Elles sont obligatoires pour une activité professionnelle : identité, SIRET, hébergeur.
- **Pas de politique de confidentialité** ni de bandeau cookies. Un bandeau sera nécessaire si un outil d'analytics est activé.
- Pas de CGV ni de conditions de garde (vaccins, assurance, annulation), alors que des tarifs sont affichés.

### Technique et design (pour mémoire)
- Polices : Source Sans Pro et Playfair Display (Google Fonts), plus Font Awesome.
- Le pied de page affiche « Built using WordPress and OnePage Express Theme ».

### Texte : coquilles conservées volontairement
L'extraction est mot pour mot. Les coquilles du site sont donc présentes dans `content/kerwouf.md`. Il reste à décider si on les corrige : « viste », « nourissage », « De 7h à 20 » (pour 20h), « ballades », « jeux dans le vergers », « exterieur », « J'emmene », « l'emmene/ramene », « 1 jour à le pension », « Tous s'est très bien passé », « Diplomée », « reserver », « Depuis 2ans », « zoo des sable ». À noter aussi : les deux cartes « Visites à domicile » (chien et chat) portent le même titre.
