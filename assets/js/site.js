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

  // page unique : le lien de la section affichée est mis en évidence dans le menu
  if (location.pathname !== '/' || !('IntersectionObserver' in window)) return;
  var liens = {}, tous = [];
  Array.prototype.forEach.call(m.querySelectorAll('a[href^="/#"]'), function (a) {
    liens[a.getAttribute('href').slice(2)] = a; tous.push(a);
  });
  var obs = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (e) {
      if (!e.isIntersecting) return;
      tous.forEach(function (a) { a.classList.remove('actif'); });
      if (liens[e.target.id]) liens[e.target.id].classList.add('actif');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  Array.prototype.forEach.call(document.querySelectorAll('main section[id]'), function (s) { obs.observe(s); });
})();
