# Site web de D&B Informatique — https://dbinformatique.cm

Dépôt **public** du site vitrine, publié par GitHub Pages.
Tout ce qui est ici est visible par tous : **aucun document interne, aucun prix confidentiel, aucun mot de passe** ne doit y être ajouté.
Les documents internes sont dans le dépôt privé `dbinformatique/dbinfo-documents`.

## Pages
| Fichier | Page |
|---|---|
| `index.html` | Accueil |
| `offres.html` | Offres et prix (HT) |
| `souverain.html` | Socle Souverain |
| `methode.html` | Méthode, engagements, questions fréquentes |
| `parcours.html` | Le fondateur |
| `diagnostic.html` | Diagnostic en ligne en 12 questions |
| `contact.html` | Formulaire qui prépare un message WhatsApp ou un courriel |
| `mentions-legales.html` | Mentions légales, confidentialité, signalement de failles |
| `404.html` | Page d'erreur (chemins absolus) |

- `assets/style.css` : toute la mise en forme (couleurs dans le bloc `:root`).
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
