# Ker Wouf : refonte du site (bêta)

Nouveau site de **Ker Wouf**, garde de chiens et pension familiale à Nivillac.
Cinq propositions de design sont publiées sur **https://kerwouf.fr/beta/** pour que Théotine choisisse la sienne.
La bêta vit dans le dossier `www/beta/` de l'hébergement OVH, à côté du site actuel (WordPress), qui n'est pas touché.

| Adresse | Contenu |
|---|---|
| `/beta/` | Page de choix : les 5 versions avec captures d'écran |
| `/beta/v1/` … `/beta/v5/` | Les 5 versions (avec mentions légales, confidentialité, page « merci ») |
| `/beta/corrections/` | Relecture des textes : avant / après |

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
public/                  fichiers copiés tels quels : .htaccess, contact.php, favicons, captures
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
| `npm run dev` | Serveur de développement (le site est sous http://localhost:4321/beta/) |
| `npm run build` | Construit le site dans `dist/` (c'est ce qui est envoyé sur OVH) |
| `npm run preview` | Sert `dist/` en local, pour vérifier le résultat construit |
| `npm run typo` | Ajoute les espaces insécables dans les fichiers de contenu |
| `npm run screenshots` | Regénère les captures de la page de choix (`public/captures/`) |
| `npm run controle` | Contrôle qualité : débordements à 375/768/1440 px, accessibilité (axe, WCAG AA), liens, champs manquants |
| `npm run lighthouse` | Scores Lighthouse (`-- --desktop`, `-- --essais=3` pour une moyenne, `-- --page=/v4/`, `-- --cpu=2` sur une machine lente) |

Pour `screenshots`, `controle` et `lighthouse`, il faut une fois : `npx playwright install chromium`.
Le formulaire (`contact.php`) ne fonctionne pas en local : il n'est actif que sur le serveur OVH.

## 5. Workflow git : de la modification à la mise en ligne

On ne travaille **jamais directement sur `main`** : tout ce qui arrive sur `main` est mis en ligne automatiquement sur la bêta.

1. **Créer une branche** : `git switch -c texte-tarifs` (ou « Create a new branch » sur GitHub).
2. **Modifier, puis enregistrer** : `git add -A && git commit -m "Tarifs : …"` puis `git push -u origin texte-tarifs`.
3. **Ouvrir une pull request** vers `main` sur GitHub. L'autre personne relit les changements (onglet « Files changed »).
4. **Fusionner (merge)** la pull request. Le workflow « Déploiement bêta » démarre tout seul : construction du site, puis envoi en FTPS dans le dossier `www/beta/` d'OVH. Compter 2 à 3 minutes.
5. Vérifier sur https://kerwouf.fr/beta/. Le suivi est dans l'onglet **Actions** de GitHub (pastille verte = en ligne).

On peut aussi relancer un déploiement à la main : **Actions → Déploiement bêta → Run workflow**.

## 6. Mise en place (à faire une seule fois)

La bêta est servie dans un **sous-dossier** du site actuel, `https://kerwouf.fr/beta/`, car l'offre d'hébergement OVH ne permet pas de second site. Il n'y a donc ni sous-domaine ni configuration DNS à faire.

### 6.1 Accès FTP : le login principal de l'hébergement

L'offre OVH ne permet pas de créer un utilisateur FTP secondaire : le déploiement utilise donc le **login FTP principal**. Sa racine est celle de tout l'hébergement : le site en production est dans `www/`, la bêta dans `www/beta/`.

Dans l'espace client OVHcloud : **Web Cloud → Hébergements → (l'hébergement de kerwouf.fr) → onglet « FTP - SSH »**. On y trouve :

- le **serveur FTP** (ex. `ftp.cluster0XX.hosting.ovh.net`) ;
- le **login principal** ;
- le **mot de passe**. S'il est perdu, utiliser « Modifier le mot de passe » : attention, cela change aussi l'accès FTP habituel, à mettre à jour partout où il sert.

Si le dossier `www/beta/` n'existe pas encore, l'outil de déploiement le crée au premier envoi. On peut aussi le créer avec FileZilla (protocole « FTP explicite sur TLS »).

> ⚠️ **Ne jamais modifier `server-dir` (variable `DOSSIER_FTP`) dans `.github/workflows/deploy.yml` sans vérifier.**
> Avec le login principal, l'outil peut écrire partout sur l'hébergement. La valeur doit rester exactement `./www/beta/`, avec la barre finale. Une valeur comme `./` ou `./www/` enverrait la bêta par-dessus le site en production. Le workflow contient un garde-fou qui refuse toute autre valeur : ne pas le retirer.

### 6.2 Envoi d'e-mails par script (formulaire de contact)

Le formulaire envoie ses messages avec la fonction `mail()` de l'hébergement, depuis l'adresse `no-reply@kerwouf.fr` (aucune boîte e-mail à créer).

1. **Hébergement → onglet « Emails »** (« Scripts e-mails »).
2. Vérifier que l'état de l'envoi est **« Actif »**. S'il est « Désactivé » ou « Bloqué », cliquer sur **« Changer l'état »** pour l'activer.
3. Au premier test, regarder aussi les spams de kerwouf@gmail.com et marquer le message « non spam ».

### 6.3 Secrets GitHub (identifiants FTP)

Sur GitHub : **Settings → Secrets and variables → Actions → New repository secret**. Créer :

| Secret | Valeur | Où la trouver chez OVH |
|---|---|---|
| `FTP_SERVER` | ex. `ftp.cluster0XX.hosting.ovh.net` | Hébergement → Informations générales → « Serveur FTP » |
| `FTP_USER` | le **login FTP principal** | onglet « FTP - SSH » |
| `FTP_PASSWORD` | son mot de passe | onglet « FTP - SSH » (point 6.1) |

Aucun identifiant n'est écrit dans le code. Le workflow envoie uniquement le contenu de `dist/` (le site construit, jamais les sources) dans `./www/beta/`. Le mode `dangerous-clean-slate`, qui viderait le dossier avant l'envoi, est désactivé. Les fichiers `.git*`, `node_modules`, `.env*` et les sources (`.astro`, `.ts`, `.md`) sont exclus. L'outil ne supprime que des fichiers qu'il a lui-même envoyés, et seulement dans `www/beta/`.

> Le premier déploiement envoie tout le site, puis seuls les fichiers modifiés partent. L'outil garde la liste des fichiers envoyés dans `www/beta/.ftp-deploy-sync-state.json` : ne pas le supprimer (il est protégé par le `.htaccess`).

### 6.4 Ce que fait le `.htaccess` de la bêta

`public/.htaccess` devient `www/beta/.htaccess`. Il coupe la réécriture d'URL (`RewriteEngine Off`), sinon le WordPress du dossier parent intercepterait les adresses `/beta/…`. Il ajoute l'en-tête `X-Robots-Tag: noindex`, le cache des fichiers et la compression, et sert la page 404 de la bêta. Le HTTPS et le www restent gérés par le WordPress (dossier `www/`).

## 7. Une fois la version choisie : passage en production

Exemple avec la version 3 choisie. Le nouveau site remplacera le WordPress à la racine de `www/`. À faire sur une branche, puis en pull request.

1. **Sauvegarder le WordPress actuel** avant toute chose :
   - fichiers : télécharger tout le dossier `www/` par FTP (login principal) ;
   - base de données : Hébergement → Bases de données → « … » → Créer une sauvegarde, puis la télécharger ;
   - garder cette archive : le site actuel pourra être restauré si besoin.
2. **Ne garder que la version choisie** :
   - déplacer le contenu de `src/pages/v3/` dans `src/pages/` (`index.astro`, `mentions-legales.astro`, `confidentialite.astro`, `merci.astro`) ;
   - supprimer `src/pages/v1…v5/`, `src/pages/corrections.astro`, les autres `src/versions/vN/`, `public/captures/` et `src/components/BandeauVersion.astro` (et son appel dans `Squelette.astro`) ;
   - remplacer les liens `lien('v3/…')` par `lien('…')` (dans `src/versions/v3/`, `Formulaire.astro` et `content/mentions-legales.md`).
3. **Passer à la racine du domaine** :
   - `astro.config.mjs` : supprimer `base: '/beta'` et mettre `site: 'https://www.kerwouf.fr'`. Tous les liens passent par `lien()`, ils suivent automatiquement ;
   - `public/contact.php` : `const BASE = '';`, retirer le préfixe `[BETA …]` de l'objet, et rediriger vers `/merci/` (plus de version dans l'adresse) ;
   - `public/.htaccess` : `ErrorDocument 404 /404.html`, chemin du cache `^/_astro/`, et remplacer `RewriteEngine Off` par la redirection HTTPS + www (le WordPress ne sera plus là pour la faire) :

     ```apache
     RewriteEngine On
     RewriteCond %{SERVER_PORT} 80 [OR]
     RewriteCond %{HTTP_HOST} ^kerwouf\.fr$ [NC]
     RewriteRule ^(.*)$ https://www.kerwouf.fr/$1 [R=301,L]
     ```
     Ajouter aussi des redirections 301 depuis les anciennes adresses WordPress utiles (ex. `/blog/…` vers `/`).
4. **Retirer le noindex** :
   - `src/components/Tete.astro` : supprimer `<meta name="robots" content="noindex, nofollow">` ;
   - `public/.htaccess` : supprimer la ligne `X-Robots-Tag` ;
   - créer `public/robots.txt` : `User-agent: *` / `Allow: /` / `Sitemap: https://www.kerwouf.fr/sitemap-index.xml`.
5. **Sitemap** : `npx astro add sitemap` (il utilise la valeur `site` de `astro.config.mjs`).
6. **Déployer vers `www/`** : c'est le seul moment où l'on modifie `DOSSIER_FTP` dans `.github/workflows/deploy.yml`. Mettre `./www/`, et adapter le garde-fou (étape « Vérifier le dossier de destination ») à cette nouvelle valeur. Relire deux fois avant de fusionner : à partir de là, le déploiement écrit dans le site en production. Au premier envoi, l'outil ajoute ses fichiers sans effacer ceux de WordPress. Une fois le nouveau site vérifié, supprimer par FTP les fichiers WordPress restants (`wp-*`, `index.php`, l'ancien `.htaccess` WordPress, etc.) et le dossier `www/beta/`. La sauvegarde de l'étape 1 est là en cas de problème.
7. Vérifier le formulaire, le HTTPS de `www.kerwouf.fr` et la redirection depuis `kerwouf.fr`, puis déclarer le sitemap dans Google Search Console.

## 8. Pour les développeurs

- **Astro 7** (site statique, sans framework UI), **Node 22.23+**. Le site est construit avec `base: '/beta'` : tout lien interne doit passer par `lien()` (`src/lib/chemins.ts`), jamais par une adresse écrite en dur commençant par `/`. `npm run controle` signale toute ressource en 404. Le cahier des charges prévoyait Node 20, mais Node 20 est en fin de vie (avril 2026) et les versions d'Astro qui le supportent encore présentent des failles de sécurité connues.
- Le contenu est du YAML (frontmatter de `content/kerwouf-refonte.md`) lu par `src/lib/contenu.ts`, typé par l'interface `Contenu`. Un nouveau champ se déclare à la fois dans l'interface et dans le fichier.
- Typographie française : `src/lib/typographie.mjs`, appliquée au chargement et par `npm run typo`.
- Chaque version importe ses propres polices (`@fontsource-variable/*`, auto-hébergées) et sa feuille `styles.css`. Seuls les composants de `src/components/` sont partagés. Classes communes à styler dans chaque version : `kw-nav*`, `kw-menu*`, `kw-form`, `kw-input`, `kw-video*`, `page-texte`, `bouton`.
- L'accessibilité est vérifiée par `npm run controle` (axe-core, WCAG 2.1 AA) : à relancer après toute modification de couleurs.
- `contact.php` est compatible PHP 7.4 et 8.x. Il n'a pas pu être exécuté en local : le tester sur la bêta (envoi réel, champ manquant, piège anti-spam).
