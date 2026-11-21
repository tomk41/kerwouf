# Ker Wouf : refonte du site (bêta)

Nouveau site de **Ker Wouf**, garde de chiens et pension familiale à Nivillac.
Cinq propositions de design sont publiées sur **https://beta.kerwouf.fr** pour que Théotine choisisse la sienne.
Le site actuel, **kerwouf.fr** (WordPress), n'est pas touché tant qu'une version n'a pas été choisie.

| Adresse | Contenu |
|---|---|
| `/` | Page de choix : les 5 versions avec captures d'écran |
| `/v1/` … `/v5/` | Les 5 versions (avec mentions légales, confidentialité, page « merci ») |
| `/corrections/` | Relecture des textes : avant / après |

---

## Sommaire

1. [Comment c'est organisé](#1-comment-cest-organisé)
2. [Modifier un texte](#2-modifier-un-texte)
3. [Ajouter ou changer une photo](#3-ajouter-ou-changer-une-photo)
4. [Installation locale (développement)](#4-installation-locale-développement)
5. [Workflow git : de la modification à la mise en ligne](#5-workflow-git--de-la-modification-à-la-mise-en-ligne)
6. [Mise en place (à faire une seule fois)](#6-mise-en-place-à-faire-une-seule-fois)
7. [Une fois la version choisie : passage en production](#7-une-fois-la-version-choisie--passage-en-production)
8. [Pour les développeurs](#8-pour-les-développeurs)

---

## 1. Comment c'est organisé

- **Un seul texte pour les 5 versions** : `content/kerwouf-refonte.md`. Modifier ce fichier modifie les 5 versions en même temps.
- Le texte d'origine du site WordPress est archivé dans `content/kerwouf.md` (référence, à ne pas modifier).
- `CORRECTIONS.md` liste les changements de texte (avant / après) et les points à confirmer.
- Les pages légales sont dans `content/mentions-legales.md` et `content/confidentialite.md`.
- Les photos sont dans `src/assets/images/`. Le site les convertit automatiquement en WebP, en plusieurs tailles.

```
content/                 textes (refonte, original, pages légales)
src/assets/images/       photos d'origine
src/lib/                 code commun : lecture du texte, catalogue photos, liste des versions
src/components/          composants communs : en-tête SEO, formulaire, vidéo, navigation…
src/versions/vN/         design propre à chaque version (Layout, Accueil, styles.css)
src/pages/               pages du site (une URL = un fichier)
public/                  fichiers copiés tels quels : .htaccess, contact.php, robots.txt, favicons, captures
scripts/                 outils : captures d'écran, contrôle qualité, Lighthouse, typographie
.github/workflows/       déploiement automatique sur OVH
```

## 2. Modifier un texte

Pas besoin d'installer quoi que ce soit : tout peut se faire depuis le site de GitHub.

1. Sur GitHub, ouvrir `content/kerwouf-refonte.md`, puis cliquer sur le crayon (« Edit this file »).
2. Modifier **uniquement ce qui est entre guillemets**. Les mots avant les deux-points (`titre:`, `texte:`…) sont des repères pour le code : il ne faut pas y toucher.
3. Garder les guillemets droits `"` autour du texte. Pour mettre des guillemets à l'intérieur d'un texte, utiliser les guillemets français « … ».
4. Taper des espaces normales : les espaces insécables (avant `:` `;` `!` `?` `€`, dans « 7 h »…) sont ajoutées automatiquement.
5. En bas de la page : choisir **« Create a new branch »**, donner un nom (par exemple `texte-tarifs`), puis **« Propose changes »**. La suite est décrite au point 5.

Exemple :

```yaml
  accroche:
    titre: "Une deuxième maison pour vos animaux"   # ← on modifie ce qui est entre guillemets
```

> Si le site ne se construit plus après une modification, c'est presque toujours un guillemet oublié ou une indentation (espaces en début de ligne) modifiée. Le rapport d'erreur de GitHub Actions indique la ligne en cause.

## 3. Ajouter ou changer une photo

**Remplacer une photo existante** : déposer la nouvelle image dans `src/assets/images/` **avec exactement le même nom de fichier**. C'est tout.

**Ajouter une nouvelle photo** :

1. Déposer le fichier dans `src/assets/images/` (JPEG ou PNG, idéalement 1600 px de large ou plus, nom en minuscules sans espaces : `chiens-verger.jpg`).
2. Dans `src/lib/images.ts`, ajouter une ligne `import` et une entrée dans `photos`, avec un **texte alternatif** qui décrit ce qu'on voit (il est lu aux personnes aveugles et utilisé par Google) :

   ```ts
   import chiensVerger from '../assets/images/chiens-verger.jpg';
   // …
   chiensVerger: { src: chiensVerger, alt: 'Trois chiens qui jouent dans le verger en fleurs' },
   ```
3. L'afficher dans une version : `<Photo nom="chiensVerger" sizes="(min-width: 64rem) 50vw, 100vw" />`.

Le composant `Photo` produit automatiquement des variantes WebP de 400, 800, 1200 et 1600 px, sans jamais agrandir l'original, avec un chargement différé. Pour une photo très détaillée (PNG lourd), régler `qualite` ou `maxLargeur` dans `images.ts` afin de rester sous 300 Ko.

## 4. Installation locale (développement)

Prérequis : **Node.js 22.23 ou plus récent** et Git.

```bash
git clone <url-du-depot> kerwouf
cd kerwouf
npm ci                 # installe les dépendances
npm run dev            # site local sur http://localhost:4321 (rechargement automatique)
```

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Construit le site dans `dist/` (c'est ce qui est envoyé sur OVH) |
| `npm run preview` | Sert `dist/` en local, pour vérifier le résultat construit |
| `npm run typo` | Ajoute les espaces insécables dans les fichiers de contenu |
| `npm run screenshots` | Regénère les captures de la page de choix (`public/captures/`) |
| `npm run controle` | Contrôle qualité : débordements à 375/768/1440 px, accessibilité (axe, WCAG AA), liens, champs manquants |
| `npm run lighthouse` | Scores Lighthouse (`-- --desktop`, ou `-- --cpu=2` sur une machine lente) |

Pour `screenshots`, `controle` et `lighthouse`, il faut une fois : `npx playwright install chromium`.
Le formulaire (`contact.php`) ne fonctionne pas en local : il n'est actif que sur le serveur OVH.

## 5. Workflow git : de la modification à la mise en ligne

On ne travaille **jamais directement sur `main`** : tout ce qui arrive sur `main` est mis en ligne automatiquement sur la bêta.

1. **Créer une branche** : `git switch -c texte-tarifs` (ou « Create a new branch » sur GitHub).
2. **Modifier, puis enregistrer** : `git add -A && git commit -m "Tarifs : …"` puis `git push -u origin texte-tarifs`.
3. **Ouvrir une pull request** vers `main` sur GitHub. L'autre personne relit les changements (onglet « Files changed »).
4. **Fusionner (merge)** la pull request. Le workflow « Déploiement bêta » démarre tout seul : construction du site, puis envoi en FTPS dans le dossier `beta/` d'OVH. Compter 2 à 3 minutes.
5. Vérifier sur https://beta.kerwouf.fr. Le suivi est dans l'onglet **Actions** de GitHub (pastille verte = en ligne).

On peut aussi relancer un déploiement à la main : **Actions → Déploiement bêta → Run workflow**.

## 6. Mise en place (à faire une seule fois)

### 6.1 Sous-domaine beta.kerwouf.fr chez OVH

Dans l'espace client OVHcloud :

1. **Web Cloud → Hébergements → (l'hébergement de kerwouf.fr) → onglet « Multisite » → « Ajouter un domaine ou sous-domaine »**.
2. Choisir `kerwouf.fr`, saisir le sous-domaine **`beta`**.
3. **Dossier racine : `beta`** (un nouveau dossier à côté de `www`, surtout **pas** `www`).
4. Cocher **SSL** (certificat Let's Encrypt gratuit). Laisser le CDN décoché. Valider.
5. Si le domaine est géré chez OVH, l'entrée DNS est créée automatiquement. Sinon, ajouter un enregistrement DNS pour `beta` pointant vers l'hébergement (même cible que `www`).
6. Attendre la propagation (quelques minutes à quelques heures). Si le certificat SSL n'apparaît pas, aller dans **Multisite → « … » → Modifier → SSL**, puis **Informations générales → Certificat SSL → Régénérer**.

Le formulaire de contact envoie ses messages depuis `no-reply@kerwouf.fr` via la fonction `mail()` d'OVH. Aucun compte e-mail n'est nécessaire, mais il faut vérifier dans **Hébergement → E-mails (onglet « Scripts e-mails »)** que l'envoi est actif. Penser aussi à regarder les spams de kerwouf@gmail.com au premier test.

### 6.2 Secrets GitHub (identifiants FTP)

Sur GitHub : **Settings → Secrets and variables → Actions → New repository secret**. Créer :

| Secret | Valeur | Où la trouver chez OVH |
|---|---|---|
| `FTP_SERVER` | ex. `ftp.cluster0XX.hosting.ovh.net` | Hébergement → Informations générales → « Serveur FTP » |
| `FTP_USER` | l'identifiant FTP principal | Hébergement → onglet « FTP - SSH » |
| `FTP_PASSWORD` | son mot de passe | même onglet (« Changer le mot de passe » si besoin) |

Aucun identifiant n'est écrit dans le code. Le workflow envoie dans `./beta/`, à la racine du FTP, à côté de `./www/` : le site actuel n'est jamais touché.

> Le premier déploiement envoie tout le site, puis seuls les fichiers modifiés partent. L'outil garde la liste des fichiers envoyés dans `beta/.ftp-deploy-sync-state.json` : ne pas le supprimer (il est protégé par le `.htaccess`).

## 7. Une fois la version choisie : passage en production

Exemple avec la version 3 choisie. À faire sur une branche, puis en pull request.

1. **Sauvegarder le WordPress actuel** avant toute chose :
   - fichiers : télécharger tout le dossier `www/` par FTP ;
   - base de données : Hébergement → Bases de données → « … » → Créer une sauvegarde, puis la télécharger ;
   - garder cette archive (le site actuel pourra être restauré si besoin).
2. **Ne garder que la version choisie, à la racine** :
   - déplacer le contenu de `src/pages/v3/` dans `src/pages/` (`index.astro`, `mentions-legales.astro`, `confidentialite.astro`, `merci.astro`) ;
   - supprimer `src/pages/v1…v5/`, `src/pages/corrections.astro`, les autres `src/versions/vN/`, `public/captures/` et `src/components/BandeauVersion.astro` (et son appel dans `Squelette.astro`) ;
   - remplacer les liens `/v3/` par `/` (dans `src/versions/v3/`, `Formulaire.astro` et `content/mentions-legales.md`) ;
   - dans `public/contact.php` : supprimer le préfixe `[BETA …]` de l'objet et rediriger vers `/merci/`.
3. **Retirer le noindex** :
   - `src/components/Tete.astro` : supprimer `<meta name="robots" content="noindex, nofollow">` ;
   - `public/robots.txt` : remplacer par `User-agent: *` / `Allow: /` / `Sitemap: https://www.kerwouf.fr/sitemap-index.xml` ;
   - `public/.htaccess` : supprimer la ligne `X-Robots-Tag`.
4. **Sitemap** : `npx astro add sitemap`, puis dans `astro.config.mjs`, `site: 'https://www.kerwouf.fr'`.
5. **Redirection www** dans `public/.htaccess` (choisir une forme, par exemple avec www) :

   ```apache
   RewriteCond %{HTTP_HOST} ^kerwouf\.fr$ [NC]
   RewriteRule ^(.*)$ https://www.kerwouf.fr/$1 [R=301,L]
   ```
   Ajouter aussi des redirections 301 depuis les anciennes adresses WordPress utiles (ex. `/blog/…` vers `/`).
6. **Déployer vers `./www/`** : dans `.github/workflows/deploy.yml`, remplacer `server-dir: ./beta/` par `server-dir: ./www/`. Au premier envoi, l'outil ajoute ses fichiers sans effacer ceux de WordPress. Une fois le nouveau site vérifié, supprimer par FTP les fichiers WordPress restants (`wp-*`, `index.php`, etc.). La sauvegarde de l'étape 1 est là en cas de problème.
7. Vérifier le formulaire, le certificat SSL de `www.kerwouf.fr`, puis déclarer le sitemap dans Google Search Console. Supprimer ensuite le multisite `beta` chez OVH.

## 8. Pour les développeurs

- **Astro 7** (site statique, sans framework UI), **Node 22.23+**. Le cahier des charges prévoyait Node 20, mais Node 20 est en fin de vie (avril 2026) et les versions d'Astro qui le supportent encore présentent des failles de sécurité connues.
- Le contenu est du YAML (frontmatter de `content/kerwouf-refonte.md`) lu par `src/lib/contenu.ts`, typé par l'interface `Contenu`. Un nouveau champ se déclare à la fois dans l'interface et dans le fichier.
- Typographie française : `src/lib/typographie.mjs`, appliquée au chargement et par `npm run typo`.
- Chaque version importe ses propres polices (`@fontsource-variable/*`, auto-hébergées) et sa feuille `styles.css`. Seuls les composants de `src/components/` sont partagés. Classes communes à styler dans chaque version : `kw-nav*`, `kw-menu*`, `kw-form`, `kw-input`, `kw-video*`, `page-texte`, `bouton`.
- L'accessibilité est vérifiée par `npm run controle` (axe-core, WCAG 2.1 AA) : à relancer après toute modification de couleurs.
- `contact.php` est compatible PHP 7.4 et 8.x. Il n'a pas pu être exécuté en local : le tester sur la bêta (envoi réel, champ manquant, piège anti-spam).
