/* D&B Informatique — formulaire de contact.
   Rien n'est envoyé par le site : le message est préparé puis ouvert dans WhatsApp ou le logiciel de courriel. */
(function () {
  'use strict';
  var TEL = '237674496342', MAIL = 'contact@dbinformatique.cm';
  var f = document.getElementById('fc'), err = document.getElementById('err');
  if (!f) return;
  function g(id) { var e = document.getElementById(id); return e ? e.value.trim().slice(0, 1500) : ''; }
  function texte() {
    if (!g('nom') || !g('tel')) {
      err.textContent = 'Merci d’indiquer au moins votre nom et votre numéro de téléphone.';
      (g('nom') ? document.getElementById('tel') : document.getElementById('nom')).focus();
      return null;
    }
    err.textContent = '';
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
    var t = texte();
    if (t) window.open('https://wa.me/' + TEL + '?text=' + encodeURIComponent(t), '_blank', 'noopener,noreferrer');
  });
  document.getElementById('bml').addEventListener('click', function () {
    var t = texte();
    if (t) window.location.href = 'mailto:' + MAIL + '?subject=' +
      encodeURIComponent('Demande depuis le site — ' + g('besoin')) + '&body=' + encodeURIComponent(t);
  });
  f.addEventListener('submit', function (e) { e.preventDefault(); document.getElementById('bwa').click(); });
})();
