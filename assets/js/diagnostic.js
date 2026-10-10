/* D&B Informatique — évaluation en 12 questions.
   Tout est calculé dans le navigateur ; rien n'est transmis sans action de l'utilisateur.
   Construction du DOM sans innerHTML : aucune saisie n'est interprétée comme du HTML. */
(function () {
'use strict';
const TEL = '237674496342';
const Q = [
  { q: "Si vos ordinateurs étaient inaccessibles pendant trois jours, que se passerait-il ?",
    why: "C'est la question qui révèle votre dépendance réelle au système d'information.",
    r: [["L'activité s'arrêterait complètement", 0], ["On travaillerait très difficilement", 1],
        ["On se débrouillerait sur papier", 2], ["Aucun impact notable", 3]] },
  { q: "À quand remonte la dernière fois où vous avez vérifié qu'une sauvegarde se restaure ?",
    why: "Presque toutes les entreprises ont une sauvegarde. Très peu savent si elle fonctionne.",
    r: [["Jamais, ou je ne sais pas", 0], ["Il y a plus d'un an", 1],
        ["Dans les six derniers mois", 2], ["Nous la testons régulièrement", 3]] },
  { q: "Où sont stockées vos données les plus importantes ?",
    why: "Une copie unique, au même endroit que l'original, n'est pas une sauvegarde.",
    r: [["Sur les ordinateurs des collaborateurs", 0], ["Sur un serveur, sans copie hors site", 1],
        ["Sur un serveur avec copie externe", 2], ["Serveur, copie hors site et cloud chiffré", 3]] },
  { q: "Qui s'occupe de votre informatique aujourd'hui ?",
    why: "Un dépanneur règle les pannes. Un responsable construit un système.",
    r: [["Personne en particulier", 0], ["Un proche ou un technicien appelé au besoin", 1],
        ["Un prestataire, sans contrat écrit", 2], ["Un prestataire sous contrat, ou un salarié dédié", 3]] },
  { q: "Combien de temps s'écoule entre une panne et sa résolution ?",
    why: "Sans engagement écrit, le délai dépend de la disponibilité de quelqu'un d'autre.",
    r: [["Plusieurs jours, c'est imprévisible", 0], ["Un à deux jours", 1],
        ["Quelques heures", 2], ["Un délai garanti par contrat", 3]] },
  { q: "Vos postes disposent-ils d'un antivirus à jour et administré de façon centralisée ?",
    why: "Un antivirus expiré sur un seul poste suffit à contaminer tout le réseau.",
    r: [["Non, ou je ne sais pas", 0], ["Chacun gère le sien", 1],
        ["Oui, mais sans supervision", 2], ["Oui, centralisé et supervisé", 3]] },
  { q: "Comment vos collaborateurs choisissent-ils leurs mots de passe ?",
    why: "Le mot de passe partagé est la première porte d'entrée des intrusions.",
    r: [["Un mot de passe commun à tous", 0], ["Chacun fait comme il veut", 1],
        ["Il existe une règle, peu appliquée", 2], ["Politique appliquée et vérifiée", 3]] },
  { q: "Votre réseau est-il protégé par un pare-feu professionnel ?",
    why: "La box de l'opérateur n'est pas un pare-feu d'entreprise.",
    r: [["Non, juste la box internet", 0], ["Je ne sais pas", 1],
        ["Oui, mais sans suivi des règles", 2], ["Oui, configuré et mis à jour", 3]] },
  { q: "Que se passe-t-il quand un collaborateur quitte l'entreprise ?",
    why: "Les accès oubliés d'anciens salariés sont une faille classique et sous-estimée.",
    r: [["Rien de particulier", 0], ["On coupe sa messagerie", 1],
        ["On coupe la plupart de ses accès", 2], ["Procédure écrite, tous accès révoqués", 3]] },
  { q: "Savez-vous ce que votre informatique vous a coûté l'an dernier, tout compris ?",
    why: "Dépannages, remplacements, licences, temps perdu : c'est la base de toute décision budgétaire.",
    r: [["Aucune idée", 0], ["Une vague estimation", 1],
        ["Approximativement", 2], ["Précisément, c'est budgété", 3]] },
  { q: "Vos collaborateurs ont-ils été formés à reconnaître une tentative d'arnaque par courriel ?",
    why: "La faille la plus exploitée n'est pas technique : c'est l'humain.",
    r: [["Jamais", 0], ["On en a parlé une fois", 1],
        ["Une sensibilisation a eu lieu", 2], ["Sensibilisation régulière et testée", 3]] },
  { q: "Existe-t-il un plan écrit décrivant quoi faire en cas de sinistre majeur ?",
    why: "Face à un sinistre, une procédure écrite et testée fait gagner un temps décisif.",
    r: [["Non", 0], ["C'est dans nos têtes", 1],
        ["Quelques notes existent", 2], ["Un plan écrit, testé au moins une fois", 3]] }
];

const AXES = [
  { nom: 'Continuité et sauvegarde', q: [0, 1, 2, 11] },
  { nom: 'Accompagnement et réactivité', q: [3, 4] },
  { nom: 'Sécurité technique', q: [5, 6, 7, 8] },
  { nom: 'Pilotage et culture', q: [9, 10] }
];
const CONSEILS = {
  0: ["Testez une restauration de sauvegarde", "Choisissez un fichier, restaurez-le depuis la sauvegarde et notez le temps nécessaire. Ce test simple indique si vos données sont réellement récupérables."],
  1: ["Conservez une copie hors de vos locaux", "Un incendie, un dégât des eaux ou un vol touchent l'original et la copie s'ils sont au même endroit. Une copie chiffrée, conservée ailleurs, couvre ce risque."],
  2: ["Attribuez un compte personnel à chaque collaborateur", "Un compte et un mot de passe par personne permettent de savoir qui accède à quoi, et de retirer un accès sans perturber les autres."],
  3: ["Formalisez la procédure de départ d'un collaborateur", "Une liste courte suffit : messagerie, poste, serveur, application métier, téléphone, badge. Elle garantit qu'aucun accès ne reste ouvert."],
  4: ["Faites le point sur vos dépenses informatiques", "Dépannages, remplacements, licences, temps perdu : un relevé sur douze mois donne une base objective pour fixer les priorités."],
  5: ["Sensibilisez vos équipes aux courriels frauduleux", "Une demi-journée de sensibilisation, avec des exemples concrets, réduit sensiblement le risque d'intrusion."]
};

const zone = document.getElementById('zone');
if (!zone) return;
let i = 0;
const rep = new Array(Q.length).fill(null);

/* h('div', {class:'x'}, 'texte', autreNoeud…) — les chaînes deviennent des nœuds texte */
function h(tag, attrs) {
  const el = document.createElement(tag);
  if (attrs) for (const k in attrs) {
    const v = attrs[k];
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'width') el.style.width = v;
    else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (let n = 2; n < arguments.length; n++) {
    const c = arguments[n];
    if (c === null || c === undefined || c === false) continue;
    (Array.isArray(c) ? c : [c]).forEach(x => el.append(typeof x === 'string' ? document.createTextNode(x) : x));
  }
  return el;
}
let premierAffichage = true;
function afficher(...noeuds) {
  zone.replaceChildren(...noeuds.flat().filter(n => n !== null && n !== undefined));
  if (premierAffichage) { premierAffichage = false; return; }
  const t = document.getElementById('diag-titre');
  if (t) t.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}
function prog(pc) { return h('div', { class: 'prog', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(Math.round(pc)) }, h('i', { width: pc + '%' })); }

function question() {
  const q = Q[i];
  const opts = q.r.map((r, k) => h('button', {
      type: 'button', class: 'opt' + (rep[i] === k ? ' on' : ''), 'aria-pressed': rep[i] === k ? 'true' : 'false',
      onclick: () => { rep[i] = k; question(); setTimeout(suivant, 260); }
    }, h('span', { class: 'k', 'aria-hidden': 'true' }), h('span', null, r[0])));
  const nav = h('div', { class: 'nav' },
    i > 0 ? h('button', { type: 'button', class: 'btn fant', onclick: precedent }, 'Retour') : null,
    h('button', { type: 'button', class: 'btn sombre', disabled: rep[i] === null, onclick: suivant },
      i === Q.length - 1 ? 'Voir mon résultat' : 'Suivant'));
  afficher(prog(i / Q.length * 100),
    h('div', { class: 'num-q' }, 'Question ' + (i + 1) + ' sur ' + Q.length),
    h('h2', { class: 'q', id: 'q-titre' }, q.q),
    h('p', { class: 'why' }, q.why),
    h('div', { class: 'opts', role: 'group', 'aria-labelledby': 'q-titre' }, opts),
    nav);
}
function precedent() { if (i > 0) { i--; question(); } }
function suivant() { if (rep[i] === null) return; if (i < Q.length - 1) { i++; question(); } else coordonnees(); }

function champ(id, label, attrs) {
  return h('div', { class: 'champ-q' }, h('label', { for: id }, label),
    h('input', Object.assign({ id: id, maxlength: '80' }, attrs || {})));
}
function coordonnees() {
  afficher(prog(100),
    h('div', { class: 'num-q' }, 'Dernière étape'),
    h('h2', { class: 'q' }, 'Votre résultat est prêt'),
    h('p', { class: 'why' }, "Indiquez votre nom et celui de votre entreprise pour personnaliser le résultat. Rien n'est envoyé automatiquement : vous décidez de nous le transmettre, ou non."),
    champ('n', 'Votre nom', { autocomplete: 'name', placeholder: 'Prénom et nom' }),
    champ('e', 'Votre entreprise', { autocomplete: 'organization', placeholder: 'Raison sociale' }),
    h('div', { class: 'nav' }, h('button', { type: 'button', class: 'btn primaire', onclick: resultat }, 'Afficher le résultat')),
    h('p', { class: 'mini' }, 'Aucune donnée ne quitte votre appareil sans votre action.'));
}

function resultat() {
  const val = id => ((document.getElementById(id) || {}).value || '').trim().slice(0, 80);
  const nom = val('n'), ent = val('e');
  const pts = rep.reduce((s, k, j) => s + Q[j].r[k][1], 0);
  const pc = Math.round(pts / (Q.length * 3) * 100);
  let niv, cl, txt;
  if (pc < 35) { niv = 'Exposition critique'; cl = 'rg';
    txt = "Plusieurs points essentiels ne sont pas couverts aujourd'hui. Un incident courant — un disque défaillant, un courriel piégé — pourrait interrompre votre activité plusieurs jours. Les premières mesures ci-dessous sont simples à mettre en place et réduisent nettement l'exposition."; }
  else if (pc < 60) { niv = 'Exposition élevée'; cl = 'am';
    txt = "Les bases sont partiellement en place, mais certains domaines restent découverts. C'est la situation la plus courante. Commencez par les points signalés ci-dessous."; }
  else if (pc < 80) { niv = 'Exposition modérée'; cl = 'in';
    txt = "Votre informatique est correctement tenue. Il reste quelques angles morts, souvent sur la continuité et la sensibilisation des équipes. L'enjeu est désormais de structurer et de documenter."; }
  else { niv = 'Bonne maîtrise'; cl = 'vt';
    txt = "Votre système d'information est bien tenu. Les sujets suivants relèvent de l'optimisation : gouvernance, documentation et exploitation des données."; }

  const axes = AXES.map(a => {
    const p = a.q.reduce((s, j) => s + Q[j].r[rep[j]][1], 0);
    return { nom: a.nom, pc: Math.round(p / (a.q.length * 3) * 100) };
  });
  const faibles = rep.map((k, j) => ({ j, v: Q[j].r[k][1] })).filter(x => x.v <= 1).map(x => x.j);
  const prio = [];
  [[1, 0], [2, 1], [6, 2], [8, 3], [9, 4], [10, 5]].forEach(([q, c]) => { if (faibles.includes(q)) prio.push(CONSEILS[c]); });
  if (!prio.length) prio.push(['Passez du curatif au préventif',
    'Les fondamentaux sont en place. L’étape suivante consiste à formaliser : plan de continuité écrit, suivi des coûts et revue trimestrielle de votre système d’information.']);

  const msg = 'Bonjour, je viens de faire l’évaluation en 12 questions sur votre site.\n' +
    'Entreprise : ' + (ent || '(à préciser)') + '\nNom : ' + (nom || '(à préciser)') + '\n' +
    'Score obtenu : ' + pc + ' % — ' + niv + '\nJ’aimerais en discuter.';
  const coul = p => p < 40 ? 'rg' : p < 70 ? 'am' : 'vt';

  afficher(
    h('div', { class: 'score' },
      h('div', { class: 'big niv-' + cl }, String(pc), h('span', { class: 'sur' }, ' %')),
      h('div', { class: 'lab niv-' + cl }, niv),
      ent ? h('p', { class: 'mini' }, 'Évaluation réalisée pour ' + ent) : null),
    h('div', { class: 'jauge' }, h('i', { class: 'fd-' + cl, width: pc + '%' })),
    h('div', { class: 'echelle', 'aria-hidden': 'true' }, h('span', null, 'Critique'), h('span', null, 'Élevée'), h('span', null, 'Modérée'), h('span', null, 'Maîtrisée')),
    h('p', null, txt),
    h('h3', { class: 'sous' }, 'Le détail par domaine'),
    axes.map(a => h('div', { class: 'axe' },
      h('div', { class: 'l' }, h('b', null, a.nom), h('span', { class: 'niv-' + coul(a.pc) }, a.pc + ' %')),
      h('div', { class: 'jauge fine' }, h('i', { class: 'fd-' + coul(a.pc), width: a.pc + '%' })))),
    h('h3', { class: 'sous' }, 'Les premières mesures recommandées'),
    prio.slice(0, 3).map((c, k) => h('div', { class: 'bloc ' + (k === 0 ? 'red' : k === 1 ? 'warn' : 'ok') },
      h('b', null, (k + 1) + '. ' + c[0]), c[1])),
    h('p', { class: 'mini g' }, 'Ces mesures peuvent être appliquées par vos propres moyens. Nous préférons vous les indiquer franchement.'),
    h('div', { class: 'cta-q' },
      h('h2', null, 'Aller plus loin : ', h('em', null, 'un diagnostic sur site')),
      h('p', null, 'Quarante-cinq minutes dans vos locaux, offertes et sans engagement. Nous examinons votre installation réelle et vous remettons une feuille de route priorisée.'),
      h('span', { class: 'tel' }, '+237 674 496 342'),
      h('div', { class: 'actions' },
        h('a', { class: 'btn wa-btn', href: 'https://wa.me/' + TEL + '?text=' + encodeURIComponent(msg), target: '_blank', rel: 'noopener noreferrer' }, 'Envoyer mon résultat sur WhatsApp'),
        h('a', { class: 'btn clair', href: 'tel:+' + TEL }, 'Appeler maintenant'))),
    h('div', { class: 'nav' },
      h('button', { type: 'button', class: 'btn fant', onclick: () => window.print() }, 'Imprimer le résultat'),
      h('button', { type: 'button', class: 'btn fant', onclick: () => { i = 0; rep.fill(null); question(); } }, 'Recommencer')));
}

question();
})();
