# Site web de D&B Informatique — https://dbinformatique.cm

Dépôt **public** du site vitrine, publié par GitHub Pages.
Tout ce qui est ici est visible par tous : **aucun document interne, aucun prix confidentiel, aucun mot de passe** ne doit y être ajouté.
Les documents internes sont dans le dépôt privé `dbinformatique/dbinfo-documents`.

## Pages (adresses propres)
| Adresse | Fichier |
|---|---|
| `/` | `index.html` — accueil |
| `/offres/` | `offres/index.html` — offres et prix (HT) |
| `/socle-souverain/` | `socle-souverain/index.html` |
| `/methode/` | `methode/index.html` — méthode, engagements, questions fréquentes |
| `/fondateur/` | `fondateur/index.html` |
| `/diagnostic/` | `diagnostic/index.html` — diagnostic en ligne en 12 questions |
| `/contact/` | `contact/index.html` — formulaire WhatsApp ou courriel |
| `/mentions-legales/` | `mentions-legales/index.html` — mentions, confidentialité, signalement de failles |
| (toute adresse inconnue) | `404.html` |

Les anciennes adresses en `.html` (`offres.html`, `souverain.html`, `parcours.html`…) sont de simples pages de redirection vers les nouvelles : ne pas les supprimer tant que des liens anciens peuvent circuler.
Tous les liens et ressources sont absolus depuis la racine (`/assets/…`, `/offres/`) : pour un aperçu local, lancer un petit serveur web dans le dossier plutôt qu'ouvrir les fichiers par double-clic.

- `assets/style.css` : toute la mise en forme (couleurs dans le bloc `:root`).
- `assets/motif-circuit.svg`, `assets/motif-circuit-clair.svg` : motif de fond « circuit imprimé » (tuile raccordable).
- `assets/img/` : portrait du fondateur (WebP 480/960 px, repli PNG), détouré, sans métadonnées.
- `assets/js/` : `site.js` (menu), `contact.js` (formulaire), `diagnostic.js` (questionnaire).
- `.well-known/security.txt` : contact pour signaler une faille (à renouveler avant le 1er octobre 2027).
- `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml` : fichiers techniques — ne pas supprimer.

## Règles de sécurité du site
1. **Aucun script ni style écrit directement dans les pages** (pas de `<script>…</script>`, pas de `style="…"`, pas de `onclick=`). Chaque page déclare une politique de sécurité du contenu (CSP) qui les bloque : tout passe par `assets/`.
2. **Aucune ressource externe** (polices Google, CDN, statistiques, pixels publicitaires). Le site ne dépose aucun cookie ; les mentions légales l'affirment.
3. Toute donnée saisie par un visiteur est affichée comme du **texte**, jamais comme du HTML.
4. Liens externes ouverts avec `rel="noopener noreferrer"`.

## Coordonnées utilisées partout
- Téléphone et WhatsApp : **+237 674 496 342** (`tel:+237674496342`, `https://wa.me/237674496342`)
- Courriel : `contact@dbinformatique.cm`
- Mentions : D&B Informatique SARL — capital 1 000 000 FCFA — RCCM et NIU en cours d'attribution (à compléter dès réception, dans le pied de page de chaque page et dans `mentions-legales.html`).

## Modifier le site
Claude travaille sur une branche ; vous relisez et fusionnez la demande de fusion (pull request). Le site se met à jour tout seul une à deux minutes après la fusion. La branche `main` est protégée contre la suppression et la réécriture d'historique.
