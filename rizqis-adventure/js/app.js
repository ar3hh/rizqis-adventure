(() => {
  const $ = s => document.querySelector(s);
  const games = {
    magic:  {name: 'Magic Shape',      cls: 'green'},
    animal: {name: 'Animal Discovery', cls: 'orange'},
    number: {name: 'Number Adventure', cls: 'purple'}
  };
  const game = $('#game'), settings = $('#settings');

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointerdown', () => card.classList.add('pressed'));
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(e =>
      card.addEventListener(e, () => card.classList.remove('pressed')));
    card.addEventListener('click', () => openGame(card));
    card.addEventListener('contextmenu', e => e.preventDefault());
  });

  function openGame(card) {
    const g = games[card.dataset.game], r = card.getBoundingClientRect();
    game.style.transformOrigin = `${r.left + r.width / 2}px ${r.top + r.height / 2}px`;
    game.className = 'game ' + g.cls;
    $('#gameTitle').textContent = g.name;
    $('#gameIcon').src = card.querySelector('img').src;
    game.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => game.classList.add('open')));
  }
  function goHome() {
    game.classList.remove('open');
    setTimeout(() => { game.hidden = true; }, 260);
  }

  $('#home').addEventListener('click', goHome);
  $('#gear').addEventListener('click', () => { settings.hidden = false; });
  $('#closeSettings').addEventListener('click', () => { settings.hidden = true; });
  settings.addEventListener('click', e => { if (e.target === settings) settings.hidden = true; });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!settings.hidden) settings.hidden = true; else if (!game.hidden) goHome();
  });
})();
