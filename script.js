/* =====================================================
   Logika web ulang tahun (tidak perlu diedit)
   Pengaturan isi ada di config.js
   ===================================================== */

const $ = (id) => document.getElementById(id);
const fill = (text) => text.replace(/{nama}/g, CONFIG.nama).replace(/{dari}/g, CONFIG.dari);

/* ---------- Kontrol alur (sleep & skip) ---------- */
let skipCurrent = null;
let skipping = false;
let runId = 0;

function sleep(ms) {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, ms);
    skipCurrent = () => { clearTimeout(timer); resolve(); };
  });
}

function showScene(id) {
  document.querySelectorAll('.scene').forEach((el) => {
    el.classList.toggle('on', el.id === id);
  });
}

/* ---------- Hiasan emoji melayang ---------- */
function createFloaters() {
  const emojis = ['💖', '🎈', '✨', '🌸', '🧸', '💗'];
  for (let i = 0; i < 14; i++) {
    const el = document.createElement('div');
    el.className = 'float';
    el.textContent = emojis[i % emojis.length];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = 8 + Math.random() * 10 + 's';
    el.style.animationDelay = -Math.random() * 12 + 's';
    document.body.appendChild(el);
  }
}

/* ---------- Confetti ---------- */
const canvas = $('confetti');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

function boom(count = 120) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x: innerWidth / 2,
      y: innerHeight / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -14 - 2,
      color: `hsl(${Math.random() * 360}, 90%, 65%)`,
      size: 5 + Math.random() * 6,
      life: 130
    });
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter((p) => p.life-- > 0);
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.35;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size * 0.6);
  });
  requestAnimationFrame(animateConfetti);
}

/* ---------- Membangun elemen ---------- */
function buildCake() {
  const candles = [70, 96, 122]
    .map((x) => `<div class="candle" style="left:${x}px"><div class="flame"></div></div>`)
    .join('');

  $('cake').innerHTML =
    '<div class="layer layer-1"><div class="drip"></div></div>' +
    '<div class="layer layer-2"><div class="drip"></div></div>' +
    '<div class="layer layer-3"></div>' +
    candles +
    '<div class="face">😊</div>';
}

function buildTimeline() {
  (CONFIG.timeline || []).forEach((t) => {
    const item = document.createElement('div');
    item.className = 'item';

    const photo = t.img
      ? `<img class="photo" src="${t.img}" alt="">`
      : '<div class="photo">📷 Taruh fotomu di sini<br>(isi "img" di config.js)</div>';

    item.innerHTML = `<b>📅 ${t.tgl}</b><p>${t.txt}</p>${photo}`;
    $('timelineList').appendChild(item);
  });
}

function buildGallery() {
  const total = CONFIG.galeri.length;
  CONFIG.galeri.forEach((src, i) => {
    const card = document.createElement('div');
    card.className = 'card3d';
    card.style.transform = `rotateY(${(i * 360) / total}deg) translateZ(min(150px, 40vw))`;
    card.innerHTML = src
      ? `<img src="${src}" alt="">`
      : `<span>📷 Taruh foto ${i + 1} di sini</span>`;
    $('ring').appendChild(card);
  });
}

/* ---------- Musik ---------- */
function setupMusic() {
  const audio = new Audio();
  const btn = $('musicBtn');
  audio.loop = true;

  if (!CONFIG.lagu) {
    btn.textContent = '🎵 Taruh lagu di sini';
    btn.classList.add('placeholder');
    btn.title = 'Isi "lagu" di config.js';
    return;
  }

  audio.src = CONFIG.lagu;
  btn.textContent = '🎵 Putar lagu';

  const markPlaying = () => { btn.textContent = '🎶 Jeda lagu'; };

  btn.onclick = () => {
    if (audio.paused) {
      audio.play().then(markPlaying).catch(() => {});
    } else {
      audio.pause();
      btn.textContent = '🎵 Putar lagu';
    }
  };

  // Coba putar otomatis; kalau diblokir browser, putar saat layar pertama disentuh
  audio.play().then(markPlaying).catch(() => {});
  const startOnTouch = (e) => {
    if (e.target === btn || !audio.paused) return;
    audio.play().then(() => {
      markPlaying();
      removeEventListener('pointerdown', startOnTouch);
    }).catch(() => {});
  };
  addEventListener('pointerdown', startOnTouch);
}

/* ---------- Scene-scene ---------- */
async function sceneCountdown() {
  showScene('countdown');
  const num = $('countNum');
  for (const n of [3, 2, 1]) {
    num.textContent = n;
    num.style.animation = 'none';
    void num.offsetWidth; // restart animasi
    num.style.animation = '';
    await sleep(1100);
  }
  num.textContent = '🎉';
  boom(60);
  await sleep(900);
}

async function sceneCake() {
  showScene('cakeScene');
  const cake = $('cake');
  $('cakeTitle').textContent = fill('Happy Birthday, {nama}! 🎂');
  $('cakeText').textContent = 'Tiup lilinnya… 🌬️';
  cake.classList.remove('out');
  cake.querySelector('.face').textContent = '😊';

  await sleep(2600);
  cake.classList.add('out');
  cake.querySelector('.face').textContent = '🥳';
  $('cakeText').textContent = 'Yeay! Semoga semua harapanmu terkabul ✨';
  boom(160);
  await sleep(3800);
}

async function sceneTimeline() {
  showScene('timeline');
  const items = document.querySelectorAll('.item');
  items.forEach((el) => el.classList.remove('on'));
  $('timelineList').scrollTop = 0;

  for (const el of items) {
    el.classList.add('on');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    await sleep(CONFIG.waktu.perKartuTimeline);
  }
  await sleep(600);
}

async function sceneLetter() {
  showScene('letter');
  const paper = $('paper');
  const text = fill(CONFIG.surat);
  const { ketikPerHuruf, ketikBarisBaru, bacaSurat } = CONFIG.waktu;
  paper.textContent = '';

  for (let i = 0; i < text.length; i++) {
    paper.textContent = text.slice(0, i + 1);
    if (!skipping) {
      const delay = text[i] === '\n' ? ketikBarisBaru : ketikPerHuruf;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  boom(80);
  await sleep(bacaSurat);
}

function sceneGallery() {
  showScene('gallery');
  $('finalText').textContent = fill(CONFIG.penutup);
  boom(200);
}

/* ---------- Alur utama ---------- */
async function main() {
  const skipBtn = $('skipBtn');
  const myRun = ++runId;
  skipping = false;
  skipBtn.textContent = 'Lewati ⏭️';
  skipBtn.dataset.end = '';

  await sceneCountdown();
  await sceneCake();
  await sceneTimeline();
  await sceneLetter();
  sceneGallery();

  if (myRun === runId) {
    skipBtn.textContent = 'Ulangi 🔁';
    skipBtn.dataset.end = '1';
  }
}

$('skipBtn').onclick = () => {
  if ($('skipBtn').dataset.end) {
    main();
    return;
  }
  skipping = true;
  if (skipCurrent) skipCurrent();
  setTimeout(() => { skipping = false; }, 300);
};

/* ---------- Mulai ---------- */
resizeCanvas();
addEventListener('resize', resizeCanvas);
animateConfetti();
createFloaters();
buildCake();
buildTimeline();
buildGallery();
setupMusic();
main();
