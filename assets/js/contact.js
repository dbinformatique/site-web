/* D&B Informatique — formulaire de contact.
   « Envoyer le message » : envoi direct par le service de formulaires de Netlify ; le message arrive dans
   contact@dbinformatique.cm, sans ouvrir de logiciel de courriel.
   « Envoyer sur WhatsApp » : ouvre WhatsApp avec le message préparé.
   Les saisies ne sont jamais insérées comme du HTML. */
(function () {
  'use strict';
  var TEL = '237674496342';
  var f = document.getElementById('fc'), err = document.getElementById('err'), ok = document.getElementById('ok');
  if (!f) return;
  function g(id) { var e = document.getElementById(id); return e ? e.value.trim().slice(0, 3000) : ''; }
  function valide() {
    ok.hidden = true;
    if (!g('nom') || !g('tel')) {
      err.textContent = 'Merci d’indiquer au moins votre nom et votre numéro de téléphone.';
      document.getElementById(g('nom') ? 'tel' : 'nom').focus();
      return false;
    }
    if (g('mail') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(g('mail'))) {
      err.textContent = 'L’adresse électronique semble incomplète : vérifiez-la ou laissez le champ vide.';
      document.getElementById('mail').focus();
      return false;
    }
    err.textContent = '';
    return true;
  }
  function texte() {
    var l = ['Bonjour D&B Informatique,', '', 'Nom : ' + g('nom')];
    if (g('ese')) l.push('Entreprise : ' + g('ese'));
    l.push('Téléphone : ' + g('tel'));
    if (g('mail')) l.push('Courriel : ' + g('mail'));
    l.push('Besoin : ' + g('besoin'));
    if (g('msg')) l.push('', g('msg'));
    l.push('', 'Envoyé depuis le site dbinformatique.cm');
    return l.join('\n');
  }
  document.getElementById('bwa').addEventListener('click', function () {
    if (valide()) window.open('https://wa.me/' + TEL + '?text=' + encodeURIComponent(texte()), '_blank', 'noopener,noreferrer');
  });
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!valide()) return;
    var b = document.getElementById('bml'), libelle = b.textContent;
    b.disabled = true; b.textContent = 'Envoi en cours…';
    document.getElementById('sujet').value = ('Demande depuis le site — ' + g('besoin') + ' — ' + g('nom')).slice(0, 200);
    var corps = new URLSearchParams(new FormData(f)).toString();
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: corps })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        f.reset(); ok.hidden = false; ok.focus();
      })
      .catch(function () {
        err.textContent = 'Le message n’a pas pu être envoyé. Réessayez dans un instant, ou écrivez directement à contact@dbinformatique.cm.';
      })
      .then(function () { b.disabled = false; b.textContent = libelle; });
  });
})();
