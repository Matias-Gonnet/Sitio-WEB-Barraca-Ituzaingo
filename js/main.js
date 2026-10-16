document.getElementById('yr').textContent = new Date().getFullYear();

// Menú hamburguesa móvil básico
const burger = document.querySelector('.burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('open');
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
  });
});

const HORARIOS = {
  // día (0 = domingo) : [[inicio, fin], ...] en minutos desde las 00:00
  0: [],
  1: [[480, 750], [840, 1110]],
  2: [[480, 750], [840, 1110]],
  3: [[480, 750], [840, 1110]],
  4: [[480, 750], [840, 1110]],
  5: [[480, 750], [840, 1110]],
  6: [[480, 780]]
};

function actualizarEstado() {
  const ahora = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Montevideo' }));
  const minutos = ahora.getHours() * 60 + ahora.getMinutes();
  const abierto = HORARIOS[ahora.getDay()].some(([ini, fin]) => minutos >= ini && minutos < fin);

  const status = document.querySelector('.status');
  const punto = status.querySelector('i');
  status.querySelector('span').textContent = abierto ? 'Abierto ahora' : 'Cerrado ahora';
  punto.style.background = abierto ? 'var(--g)' : 'var(--r)';
  punto.style.animation = abierto ? '' : 'none';
}

actualizarEstado();
setInterval(actualizarEstado, 60000);
