/* D&B Informatique — navigation (menu mobile). Aucune donnée collectée. */
(function () {
  'use strict';
  var b = document.querySelector('.burger'), m = document.getElementById('menu');
  if (!b || !m) return;
  function fermer() {
    m.classList.remove('ouvert');
    b.setAttribute('aria-expanded', 'false');
    b.setAttribute('aria-label', 'Ouvrir le menu');
  }
  b.addEventListener('click', function () {
    var o = m.classList.toggle('ouvert');
    b.setAttribute('aria-expanded', o ? 'true' : 'false');
    b.setAttribute('aria-label', o ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && m.classList.contains('ouvert')) { fermer(); b.focus(); }
  });
  m.addEventListener('click', function (e) { if (e.target.closest('a')) fermer(); });
  window.addEventListener('resize', function () { if (window.innerWidth > 1120) fermer(); });
})();
