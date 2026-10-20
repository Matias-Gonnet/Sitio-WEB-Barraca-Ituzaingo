/* Catálogo de Productos: búsqueda y filtro por rubro (sin dependencias).
   Sin JavaScript el catálogo completo queda visible. */
(function () {
  var buscar = document.getElementById('buscar');
  var vacio = document.getElementById('vacio');
  var cards = document.querySelectorAll('.cat');
  var chips = document.querySelectorAll('.chip');
  if (!buscar || !cards.length) return;

  var rubro = 'todos';

  function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function aplicar() {
    var t = norm(buscar.value.trim());
    var visibles = 0;
    cards.forEach(function (c) {
      var enRubro = rubro === 'todos' || c.dataset.cat === rubro;
      var tituloOk = t && norm(c.querySelector('h3').textContent).indexOf(t) > -1;
      var alguno = false;
      c.querySelectorAll('li').forEach(function (li) {
        var ok = !t || tituloOk || norm(li.textContent).indexOf(t) > -1;
        li.hidden = !ok;
        if (ok) alguno = true;
      });
      var mostrar = enRubro && alguno;
      c.hidden = !mostrar;
      if (mostrar) visibles++;
    });
    vacio.hidden = visibles > 0;
  }

  function elegir(cat) {
    rubro = cat;
    chips.forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.cat === cat ? 'true' : 'false');
    });
    aplicar();
  }

  chips.forEach(function (b) {
    b.addEventListener('click', function () { elegir(b.dataset.cat); });
  });
  buscar.addEventListener('input', aplicar);

  // Enlaces directos: productos.html#ferreteria abre ese rubro
  var h = location.hash.replace('#', '');
  if (h && document.querySelector('.chip[data-cat="' + h + '"]')) elegir(h);
})();
