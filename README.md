# Site web de D&B Informatique — https://dbinformatique.cm

Dépôt **public** du site vitrine, publié par **Netlify** (réglages dans `netlify.toml` : publication telle quelle, en-têtes de sécurité).
GitHub Pages est désactivé depuis octobre 2026 : ne pas le réactiver, le domaine pointe vers Netlify.
Tout ce qui est ici est visible par tous : **aucun document interne, aucun montant (décision du 10 octobre 2026 : prestations sur devis), aucun mot de passe** ne doit y être ajouté.
Les documents internes sont dans le dépôt privé `dbinformatique/dbinfo-documents`.

## Pages
| Adresse | Fichier |
|---|---|
| `/` | `index.html` — **page unique** : domaines d'intervention (sans prix), Socle Souverain, méthode, garanties, questions, contact |
| `/diagnostic/` | `diagnostic/index.html` — évaluation en ligne en 12 questions |
| `/astuces/` | `astuces/index.html` — « L'astuce D&B » : une fiche par astuce vidéo (étapes, raccourcis, lien vers la vidéo Facebook) |
| `/mentions-legales/` | `mentions-legales/index.html` — mentions, confidentialité, signalement de failles |
| (toute adresse inconnue) | `404.html` |

Sections de la page unique : `#offres`, `#socle`, `#methode`, `#garanties`, `#questions`, `#contact`.
**La section « Le fondateur » est masquée depuis le 9 octobre 2026** (à réafficher plus tard) : son code et le portrait sont conservés dans le dépôt privé (`dbinfo-documents/03_Supports_Commerciaux/Site_Web/fondateur_masque/`), pas ici. Elle est remplacée par la section `#garanties` (expérience et certifications, sans nom ni photo) ; les anciennes adresses `/fondateur/` et `/parcours.html` y renvoient.
Les anciennes adresses (`/offres/`, `/socle-souverain/`, `/methode/`, `/fondateur/`, `/contact/` et les `.html`) sont redirigées (301) par `netlify.toml` vers la section correspondante. **Ne jamais recréer de fichier `diagnostic.html` ou `mentions-legales.html`** à la racine : Netlify le servirait à la place du dossier du même nom et créerait une boucle de redirection (incident du 10 octobre 2026).
Tous les liens et ressources sont absolus depuis la racine (`/assets/…`, `/#offres`) : pour un aperçu local, lancer un petit
serveur web dans le dossier plutôt qu'ouvrir les fichiers par double-clic.

- `assets/style.css` : toute la mise en forme (couleurs dans le bloc `:root`).
- `assets/motif-circuit.svg`, `assets/motif-circuit-clair.svg` : motif de fond « circuit imprimé » (tuile raccordable).
- `assets/img/qr-whatsapp.svg` : code QR de la section contact (ouvre WhatsApp avec « j'ai vu votre site »), affiché sur ordinateur seulement.
- `assets/js/` : `site.js` (menu), `contact.js` (formulaire), `diagnostic.js` (questionnaire).
- **Formulaire de contact** : envoyé par **Netlify Forms** (formulaire `contact`, champ piège `bot-field`). Réglages côté Netlify : Forms ▸ détection des formulaires activée ; notification par courriel vers contact@dbinformatique.cm. Les demandes reçues sont aussi visibles dans Netlify ▸ Forms.
- `.well-known/security.txt` : contact pour signaler une faille (à renouveler avant le 1er octobre 2027).
- `netlify.toml`, `.nojekyll`, `robots.txt`, `sitemap.xml` : fichiers techniques — ne pas supprimer. (`CNAME` a été retiré le 9 octobre 2026 : il ne servait qu'à GitHub Pages.)
- **Pied de page** : le « © » est un lien discret (classe `discret`, aucun style visible) vers l'espace de gestion de l'entreprise, hébergé sur un autre site. Ne pas le retirer, ne pas le mettre en évidence, ne pas écrire son adresse dans ce dépôt public (ajout d'octobre 2026).
- `assets/apercu.png` : image affichée quand le lien du site est partagé (WhatsApp, Facebook, LinkedIn). Après l'avoir changée, incrémenter `?v=` dans les balises `og:image`.

## Page « Astuces » : mise à jour mensuelle
Une astuce vidéo paraît chaque mercredi à 8 h sur Facebook et WhatsApp (catalogue et vidéos : dépôt privé, `03_Supports_Commerciaux/Astuces_Video/`).
La page `/astuces/` est mise à jour **une fois par mois, à la fin du mois**, avec les astuces du mois : une seule publication (15 crédits).
Pour chaque astuce : une fiche `<article class="carte astuce">` (image `assets/img/astuces/astuce-NN.jpg`, 800 × 450, environ 20 Ko), les étapes en texte, les touches en `<kbd>`, et le lien vers la publication Facebook.

## Règles de sécurité du site
1. **Aucun script ni style écrit directement dans les pages** (pas de `<script>…</script>`, pas de `style="…"`, pas de `onclick=`). Chaque page déclare une politique de sécurité du contenu (CSP) qui les bloque : tout passe par `assets/`.
2. **Aucune ressource externe** (polices Google, CDN, statistiques, pixels publicitaires). Le site ne dépose aucun cookie ; les mentions légales l'affirment.
3. Toute donnée saisie par un visiteur est affichée comme du **texte**, jamais comme du HTML.
4. Liens externes ouverts avec `rel="noopener noreferrer"`.

## Coordonnées utilisées partout
- Téléphone et WhatsApp : **+237 674 496 342** (`tel:+237674496342`, `https://wa.me/237674496342`)
- Courriel : `contact@dbinformatique.cm`
- Mentions : D&B Informatique SARL — capital 1 000 000 FCFA — RCCM et NIU en cours d'attribution (à compléter dès réception, dans le pied de page et dans `mentions-legales/index.html`).

## Modifier le site
Claude travaille sur une branche ; vous relisez et fusionnez la demande de fusion (pull request). Le site se met à jour tout seul une à deux minutes après la fusion.
**Offre gratuite Netlify : 300 crédits par mois, et chaque publication de `main` en coûte 15.** Regrouper les modifications
sur une branche (aperçu Netlify gratuit) et ne fusionner qu'une fois validé. Si les crédits sont épuisés, le site est suspendu
jusqu'au mois suivant : surveiller la jauge « Usage » dans Netlify.
La branche `main` est protégée contre la suppression et la réécriture d'historique.
