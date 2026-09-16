// ==========================================================================
//  CONFIGURACIÓN — todo lo editable está en este bloque
// ==========================================================================

// EDITAR: el PIN de 4 dígitos.
const PIN = '1609';

// EDITAR: los emojis de flores que explotan y que caen en el juego.
const FLOWERS = ['💐', '🌷', '🌸', '🌺', '🌹', '🌼', '🌻', '✨', '🎂'];

// EDITAR: cuántas flores hay que atrapar para armar el ramo.
const CATCH_TARGET = 12;

// --------------------------------------------------------------------------
// EDITAR: LAS 8 TARJETAS DEL MEMORAMA
// Cada una se usa dos veces (es un par). Pon tus imágenes en una carpeta
// "img/" junto a este archivo y escribe la ruta en "image".
// "label" es el texto que se ve si la imagen todavía no existe.
// --------------------------------------------------------------------------
const MEMO_ITEMS = [
  { id: 'foto1', image: 'img/foto1.jpeg', label: '[Foto 1]' },
  { id: 'foto2', image: 'img/foto2.jpeg', label: '[Foto 2]' },
  { id: 'foto3', image: 'img/foto3.jpeg', label: '[Foto 3]' },
  { id: 'foto4', image: 'img/foto4.jpeg', label: '[Foto 4]' },
  { id: 'foto5', image: 'img/foto5.jpeg', label: '[Foto 5]' },
  { id: 'foto6', image: 'img/foto6.jpeg', label: '[Foto 6]' },
  { id: 'foto7', image: 'img/foto7.jpeg', label: '[Foto 7]' },
  { id: 'foto8', image: 'img/foto8.jpeg', label: '[Foto 8]' },
];

// --------------------------------------------------------------------------
// EDITAR: LAS PREGUNTAS DE LA TRIVIA
// "difficulty" es la etiqueta que aparece arriba de la pregunta.
// "color" es el color de esa etiqueta (cualquier color CSS: #hex, rgb, nombre).
// "correct" es el índice de la respuesta correcta: 0, 1 o 2.
// --------------------------------------------------------------------------
const TRIVIA_QUESTIONS = [
  {
    difficulty: 'Fácil',
    color: '#8fb89c',
    question: '¿Cuál es el único baile en que bailamos los 4 juntos?',
    options: ['Olimpiadas', 'Inglés', 'Guayaquil'],
    correct: 0,
  },
  {
    difficulty: 'Media',
    color: '#FFD700',
    question: '¿Cuál pelicula fuiste a ver con Ale?',
    options: ['Avatar', 'GOAT', 'Super Mario Galaxy'],
    correct: 2,
  },
  {
    difficulty: 'Eso que we',
    color: '#FFD700',
    question: '¿Qué día fuimos a ver la peli de Super Mario Galaxy?',
    options: ['4 de abril', '30 de marzo', '10 de abril'],
    correct: 2,
  },
  {
    difficulty: 'Media',
    color: '#e3c565',
    question: '¿Cuál es tu banda favorita?',
    options: ['Chase Atlantic', 'Cortis', 'Stray Kids', 'Twice', 'Todas las anteriores'],
    correct: 4,
  },
  {
    difficulty: 'Eso que we',
    color: '#FFD700',
    question: '¿Cuántos años cumples?',
    options: ['18', '17.999999999999', '15', '67'],
    correct: 1,
  },
];

// --------------------------------------------------------------------------
// EDITAR: LAS CANCIONES
// Pon tus archivos .mp3 en una carpeta "music/" junto a este archivo.
// --------------------------------------------------------------------------
const SONGS = [
  { title: 'bad - ateez', src: 'music/bad.mp3' },
  { title: 'church - chase atlantic', src: 'music/church.mp3' },
  { title: 'exist for love - aurora', src: 'music/efl.mp3' },
  { title: 'swim - chase atlantic', src: 'music/swim.mp3' },
];

// EDITAR: volumen de reproducción (0 = silencio, 1 = máximo).
const MUSIC_VOLUME = 0.3;

const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ==========================================================================
//  CARTA COMPARTIDA (se escribe una vez, aparece en dos lugares)
// ==========================================================================
(function initSharedLetter() {
  const template = document.getElementById('letter-template');
  document.querySelectorAll('[data-letter-slot]').forEach((slot) => {
    slot.appendChild(template.content.cloneNode(true));
  });
})();

// ==========================================================================
//  PARTÍCULAS DE FONDO
// ==========================================================================
(function initAmbient() {
  if (REDUCE_MOTION) return;
  const container = document.getElementById('ambient');
  const count = window.innerWidth < 600 ? 16 : 26;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'ambient__particle';
    p.style.setProperty('--size', `${(Math.random() * 2 + 1.5).toFixed(1)}px`);
    p.style.setProperty('--duration', `${(Math.random() * 10 + 10).toFixed(1)}s`);
    p.style.setProperty('--delay', `${(Math.random() * 14).toFixed(1)}s`);
    p.style.setProperty('--drift-x', `${(Math.random() * 60 - 30).toFixed(0)}px`);
    p.style.left = `${(Math.random() * 100).toFixed(1)}%`;
    container.appendChild(p);
  }
})();

// ==========================================================================
//  EXPLOSIÓN DE FLORES
// ==========================================================================
function burstFlowers(amount) {
  if (REDUCE_MOTION) return;
  const layer = document.getElementById('burst-layer');

  for (let i = 0; i < amount; i++) {
    const petal = document.createElement('span');
    petal.className = 'burst-petal';
    petal.textContent = FLOWERS[Math.floor(Math.random() * FLOWERS.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * Math.max(window.innerWidth, window.innerHeight) * 0.55;

    petal.style.setProperty('--petal-x', `${Math.cos(angle) * distance}px`);
    petal.style.setProperty('--petal-y', `${Math.sin(angle) * distance}px`);
    petal.style.setProperty('--petal-size', `${18 + Math.random() * 22}px`);
    petal.style.setProperty('--petal-scale', (0.6 + Math.random() * 0.8).toFixed(2));
    petal.style.setProperty('--petal-rotate', `${Math.random() * 720 - 360}deg`);
    petal.style.setProperty('--petal-duration', `${(1.3 + Math.random() * 1.2).toFixed(2)}s`);
    petal.style.setProperty('--petal-delay', `${(Math.random() * 0.5).toFixed(2)}s`);

    layer.appendChild(petal);
    setTimeout(() => petal.remove(), 3200);
  }
}

// ==========================================================================
//  FLUJO: locker -> bloom -> juego -> carta -> dashboard
// ==========================================================================
(function initFlow() {
  const lockScreen = document.getElementById('lock');
  const lockBox = document.querySelector('.lock');
  const dots = document.querySelectorAll('#pin-dots .dot');
  const errorEl = document.getElementById('pin-error');
  const keypad = document.getElementById('keypad');

  const bloomScreen = document.getElementById('bloom');
  const bloomText = document.getElementById('bloom-text');
  const gameScreen = document.getElementById('game');
  const letterScreen = document.getElementById('letter-screen');
  const envelope = document.getElementById('envelope');
  const letterCard = document.getElementById('letter-card');
  const continueBtn = document.getElementById('continue-btn');
  const dashboard = document.getElementById('dashboard');

  let entered = '';
  let locked = false;

  const renderDots = () =>
    dots.forEach((dot, i) => dot.classList.toggle('is-filled', i < entered.length));

  function wrongPin() {
    locked = true;
    errorEl.textContent = 'PIN incorrecto, inténtalo de nuevo.';
    lockBox.classList.add('is-wrong');
    setTimeout(() => {
      lockBox.classList.remove('is-wrong');
      entered = '';
      renderDots();
      locked = false;
    }, 600);
  }

  keypad.addEventListener('click', (e) => {
    const btn = e.target.closest('.key');
    if (!btn || locked || btn.classList.contains('key--empty')) return;
    const value = btn.dataset.key;

    if (value === 'del') {
      entered = entered.slice(0, -1);
      errorEl.textContent = '';
      renderDots();
      return;
    }
    if (entered.length >= 4) return;

    entered += value;
    renderDots();

    if (entered.length === 4) {
      if (entered === PIN) {
        locked = true;
        errorEl.textContent = '';
        setTimeout(startBloom, 280);
      } else {
        wrongPin();
      }
    }
  });

  function startBloom() {
    lockScreen.classList.add('is-hidden');
    bloomScreen.classList.remove('is-hidden');

    burstFlowers(46);
    setTimeout(() => burstFlowers(34), 420);
    setTimeout(() => burstFlowers(26), 880);

    requestAnimationFrame(() => bloomText.classList.add('is-visible'));
    setTimeout(startGame, REDUCE_MOTION ? 1200 : 3400);
  }

  function startGame() {
    bloomScreen.classList.add('is-hidden');
    gameScreen.classList.remove('is-hidden');
    initCatchGame(showLetter);
  }

  function showLetter() {
    gameScreen.classList.add('is-hidden');
    letterScreen.classList.remove('is-hidden');

    requestAnimationFrame(() => {
      envelope.classList.add('is-open');
      setTimeout(() => {
        letterCard.classList.remove('is-hidden');
        requestAnimationFrame(() => letterCard.classList.add('is-visible'));
      }, 550);
    });
  }

  continueBtn.addEventListener('click', () => {
    letterScreen.classList.add('is-hidden');
    dashboard.classList.remove('is-hidden');
    window.scrollTo(0, 0);
  });
})();

// ==========================================================================
//  JUEGO: ATRAPAR FLORES
// ==========================================================================
function initCatchGame(onWin) {
  const intro = document.getElementById('catch-intro');
  const area = document.getElementById('catch-area');
  const field = document.getElementById('catch-field');
  const basket = document.getElementById('catch-basket');
  const winScreen = document.getElementById('catch-win');
  const scoreEl = document.getElementById('catch-score');
  const barEl = document.getElementById('catch-bar');
  const startBtn = document.getElementById('catch-start');
  const continueBtn = document.getElementById('catch-continue');

  document.getElementById('catch-target').textContent = CATCH_TARGET;
  document.getElementById('catch-goal-text').textContent = CATCH_TARGET;

  let flowers = [];
  let score = 0;
  let basketX = 0;
  let running = false;
  let lastTime = 0;
  let spawnTimer = 0;
  let rafId = null;

  // --- Movimiento de la canasta ---
  function moveBasket(clientX) {
    const rect = field.getBoundingClientRect();
    const half = basket.offsetWidth / 2;
    basketX = Math.min(
      rect.width - half,
      Math.max(half, clientX - rect.left)
    );
    basket.style.transform = `translateX(${basketX - half}px)`;
  }

  function onPointer(e) {
    if (!running) return;
    e.preventDefault();
    moveBasket(e.clientX);
  }

  field.addEventListener('pointerdown', onPointer);
  field.addEventListener('pointermove', onPointer);

  // --- Crear una flor ---
  function spawnFlower() {
    const el = document.createElement('span');
    el.className = 'catch__flower';
    el.textContent = FLOWERS[Math.floor(Math.random() * FLOWERS.length)];

    const size = 24 + Math.random() * 14;
    el.style.fontSize = `${size}px`;

    const rect = field.getBoundingClientRect();
    const x = Math.random() * (rect.width - size);
    const rotate = Math.random() * 360;
    const spin = (Math.random() - 0.5) * 90;

    field.appendChild(el);

    flowers.push({
      el,
      x,
      y: -size,
      size,
      rotate,
      spin,
      speed: 110 + Math.random() * 90,
      drift: (Math.random() - 0.5) * 40,
      caught: false,
    });
  }

  // --- Bucle principal ---
  function loop(time) {
    if (!running) return;
    const delta = Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;

    const rect = field.getBoundingClientRect();
    const basketTop = rect.height - basket.offsetHeight - 24;
    const basketHalf = basket.offsetWidth / 2;

    spawnTimer += delta;
    const interval = Math.max(0.42, 0.85 - score * 0.03);
    if (spawnTimer >= interval) {
      spawnTimer = 0;
      spawnFlower();
    }

    for (let i = flowers.length - 1; i >= 0; i--) {
      const f = flowers[i];
      if (f.caught) continue;

      f.y += f.speed * delta;
      f.x += f.drift * delta;
      f.rotate += f.spin * delta;
      f.el.style.transform = `translate(${f.x}px, ${f.y}px) rotate(${f.rotate}deg)`;

      const centerX = f.x + f.size / 2;
      const hitX = Math.abs(centerX - basketX) < basketHalf + f.size * 0.3;
      const hitY = f.y + f.size > basketTop && f.y < basketTop + basket.offsetHeight;

      if (hitX && hitY) {
        catchFlower(f, i, basketTop);
      } else if (f.y > rect.height + 60) {
        f.el.remove();
        flowers.splice(i, 1);
      }
    }

    rafId = requestAnimationFrame(loop);
  }

  function catchFlower(f, index, basketTop) {
    f.caught = true;
    f.el.classList.add('is-caught');
    f.el.style.setProperty('--cx', `${basketX - f.size / 2}px`);
    f.el.style.setProperty('--cy', `${basketTop}px`);
    setTimeout(() => f.el.remove(), 400);
    flowers.splice(index, 1);

    score += 1;
    scoreEl.textContent = score;
    barEl.style.width = `${(score / CATCH_TARGET) * 100}%`;

    basket.animate(
      [{ transform: `translateX(${basketX - basket.offsetWidth / 2}px) scale(1)` },
       { transform: `translateX(${basketX - basket.offsetWidth / 2}px) scale(1.18)` },
       { transform: `translateX(${basketX - basket.offsetWidth / 2}px) scale(1)` }],
      { duration: 260, easing: 'ease-out' }
    );

    if (score >= CATCH_TARGET) win();
  }

  function win() {
    running = false;
    cancelAnimationFrame(rafId);
    flowers.forEach((f) => f.el.remove());
    flowers = [];

    burstFlowers(60);
    setTimeout(() => {
      area.classList.add('is-hidden');
      winScreen.classList.remove('is-hidden');
    }, 700);
  }

  // --- Arranque ---
  startBtn.addEventListener('click', () => {
    intro.classList.add('is-hidden');
    area.classList.remove('is-hidden');

    requestAnimationFrame(() => {
      const rect = field.getBoundingClientRect();
      moveBasket(rect.left + rect.width / 2);
      running = true;
      lastTime = performance.now();
      rafId = requestAnimationFrame(loop);
    });
  }, { once: true });

  continueBtn.addEventListener('click', onWin, { once: true });
}

// ==========================================================================
//  PESTAÑAS DEL DASHBOARD
// ==========================================================================
(function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('is-active'));
      panels.forEach((p) => p.classList.remove('is-active'));
      tab.classList.add('is-active');
      document.getElementById(tab.dataset.panel).classList.add('is-active');
    });
  });
})();

// ==========================================================================
//  MEMORAMA (con imágenes)
// ==========================================================================
(function initMemory() {
  const board = document.getElementById('memo-board');
  const statusEl = document.getElementById('memo-status');
  const resetBtn = document.getElementById('memo-reset');

  let moves = 0;
  let matched = 0;
  let firstCard = null;
  let locked = false;

  function shuffledDeck() {
    const deck = [...MEMO_ITEMS, ...MEMO_ITEMS];
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  function buildBoard() {
    board.innerHTML = '';
    moves = 0;
    matched = 0;
    firstCard = null;
    locked = false;
    statusEl.textContent = 'Movimientos: 0';

    shuffledDeck().forEach((item) => {
      const card = document.createElement('button');
      card.className = 'memo-card';
      card.type = 'button';
      card.dataset.id = item.id;
      card.setAttribute('aria-label', 'Carta boca abajo');

      const inner = document.createElement('span');
      inner.className = 'memo-card__inner';

      const back = document.createElement('span');
      back.className = 'memo-card__face memo-card__face--back';
      back.textContent = '?';

      const front = document.createElement('span');
      front.className = 'memo-card__face memo-card__face--front';

      const img = document.createElement('img');
      img.className = 'memo-card__img';
      img.src = item.image;
      img.alt = '';
      img.loading = 'lazy';

      // Si la imagen todavía no existe, se muestra el texto de reemplazo
      img.addEventListener('error', () => {
        img.remove();
        const fallback = document.createElement('span');
        fallback.className = 'memo-card__fallback';
        fallback.textContent = item.label;
        front.appendChild(fallback);
      });

      front.appendChild(img);
      inner.append(back, front);
      card.appendChild(inner);
      card.addEventListener('click', () => handleFlip(card));
      board.appendChild(card);
    });
  }

  function handleFlip(card) {
    if (locked) return;
    if (card.classList.contains('is-flipped') || card.classList.contains('is-matched')) return;

    card.classList.add('is-flipped');

    if (!firstCard) {
      firstCard = card;
      return;
    }

    moves += 1;
    statusEl.textContent = `Movimientos: ${moves}`;

    const first = firstCard;
    const second = card;
    firstCard = null;

    if (first.dataset.id === second.dataset.id) {
      first.classList.add('is-matched');
      second.classList.add('is-matched');
      matched += 1;

      if (matched === MEMO_ITEMS.length) {
        setTimeout(() => {
          statusEl.textContent = `¡Completado en ${moves} movimientos!`;
          burstFlowers(30);
        }, 400);
      }
    } else {
      locked = true;
      first.classList.add('is-wrong');
      second.classList.add('is-wrong');
      setTimeout(() => {
        first.classList.remove('is-flipped', 'is-wrong');
        second.classList.remove('is-flipped', 'is-wrong');
        locked = false;
      }, 900);
    }
  }

  resetBtn.addEventListener('click', buildBoard);
  buildBoard();
})();

// ==========================================================================
//  TRIVIA (con dificultad y color)
// ==========================================================================
(function initTrivia() {
  const progressEl = document.getElementById('trivia-progress');
  const chipEl = document.getElementById('trivia-chip');
  const questionEl = document.getElementById('trivia-question');
  const optionsEl = document.getElementById('trivia-options');
  const activeWrap = document.getElementById('trivia-active');
  const resultWrap = document.getElementById('trivia-result');
  const scoreEl = document.getElementById('trivia-score');
  const resetBtn = document.getElementById('trivia-reset');

  let index = 0;
  let score = 0;

  function renderQuestion() {
    const q = TRIVIA_QUESTIONS[index];
    progressEl.textContent = `Pregunta ${index + 1} de ${TRIVIA_QUESTIONS.length}`;

    chipEl.textContent = q.difficulty || '';
    chipEl.style.setProperty('--chip-color', q.color || 'var(--gold)');
    chipEl.style.display = q.difficulty ? '' : 'none';

    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';

    q.options.forEach((option, i) => {
      const btn = document.createElement('button');
      btn.className = 'trivia-option';
      btn.type = 'button';
      btn.textContent = option;
      btn.addEventListener('click', () => handleAnswer(i, btn));
      optionsEl.appendChild(btn);
    });
  }

  function handleAnswer(selectedIndex, btn) {
    const q = TRIVIA_QUESTIONS[index];
    const allOptions = optionsEl.querySelectorAll('.trivia-option');
    allOptions.forEach((opt) => (opt.disabled = true));

    if (selectedIndex === q.correct) {
      btn.classList.add('is-correct');
      score += 1;
    } else {
      btn.classList.add('is-incorrect');
      allOptions[q.correct].classList.add('is-correct');
    }

    setTimeout(() => {
      index += 1;
      if (index < TRIVIA_QUESTIONS.length) renderQuestion();
      else showResult();
    }, 950);
  }

  function showResult() {
    activeWrap.classList.add('is-hidden');
    resultWrap.classList.remove('is-hidden');
    scoreEl.textContent = `Acertaste ${score} de ${TRIVIA_QUESTIONS.length}`;
    if (score === TRIVIA_QUESTIONS.length) burstFlowers(30);
  }

  function reset() {
    index = 0;
    score = 0;
    activeWrap.classList.remove('is-hidden');
    resultWrap.classList.add('is-hidden');
    renderQuestion();
  }

  resetBtn.addEventListener('click', reset);
  reset();
})();

// ==========================================================================
//  REPRODUCTOR DE MÚSICA
// ==========================================================================
(function initMusic() {
  const toggle = document.getElementById('music-toggle');
  const menu = document.getElementById('music-menu');
  const list = document.getElementById('music-list');
  const stopBtn = document.getElementById('music-stop');
  const audio = document.getElementById('audio-player');

  audio.volume = MUSIC_VOLUME;

  let currentIndex = -1;

  // Construir la lista de canciones
  SONGS.forEach((song, i) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'music__item';
    btn.type = 'button';
    btn.textContent = song.title;
    btn.addEventListener('click', () => playSong(i));
    li.appendChild(btn);
    list.appendChild(li);
  });

  const items = list.querySelectorAll('.music__item');

  function markCurrent() {
    items.forEach((item, i) => item.classList.toggle('is-current', i === currentIndex));
    toggle.classList.toggle('is-playing', currentIndex >= 0 && !audio.paused);
  }

  function playSong(i) {
    // Tocar la canción que ya suena la pausa
    if (i === currentIndex && !audio.paused) {
      audio.pause();
      markCurrent();
      return;
    }

    if (i !== currentIndex) {
      audio.src = SONGS[i].src;
      currentIndex = i;
    }

    audio.volume = MUSIC_VOLUME;
    audio.play().catch(() => {
      // Si el archivo no existe todavía, no rompe nada
      currentIndex = -1;
      markCurrent();
    });
    markCurrent();
  }

  function stop() {
    audio.pause();
    audio.currentTime = 0;
    currentIndex = -1;
    markCurrent();
  }

  // Pasar automáticamente a la siguiente canción
  audio.addEventListener('ended', () => {
    const next = (currentIndex + 1) % SONGS.length;
    playSong(next);
  });

  audio.addEventListener('play', markCurrent);
  audio.addEventListener('pause', markCurrent);

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = menu.classList.toggle('is-hidden');
    toggle.setAttribute('aria-expanded', String(!open));
  });

  stopBtn.addEventListener('click', stop);

  // Cerrar el menú al tocar fuera
  document.addEventListener('click', (e) => {
    if (!document.getElementById('music').contains(e.target)) {
      menu.classList.add('is-hidden');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// ==========================================================================
//  PANTALLA COMPLETA DE LA PRESENTACIÓN
// ==========================================================================
(function initFullscreen() {
  const btn = document.getElementById('fullscreen-btn');
  const wrapper = document.getElementById('slides-wrapper');

  btn.addEventListener('click', () => {
    if (wrapper.requestFullscreen) wrapper.requestFullscreen();
    else if (wrapper.webkitRequestFullscreen) wrapper.webkitRequestFullscreen();
    else if (wrapper.webkitEnterFullscreen) wrapper.webkitEnterFullscreen();
  });
})();
