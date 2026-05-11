// === NAV ===
const nav = document.querySelector('.nav');
const burger = document.querySelector('.nav__burger');
const menu = document.querySelector('.nav__menu');
const onScroll = () => {
  if (window.scrollY > 80) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
if (burger) burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  menu.classList.toggle('open');
});
document.querySelectorAll('.nav__menu a').forEach(link => {
  link.addEventListener('click', () => {
    burger?.classList.remove('open');
    menu?.classList.remove('open');
  });
});

// === SCROLL PROGRESS ===
const progress = document.querySelector('.frame__progress');
if (progress) {
  const updateProgress = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = (window.scrollY / h) * 100;
    progress.style.width = p + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
}

// === REVEAL ===
const io = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal, .reveal-text').forEach(el => io.observe(el));

// === FILTERS ===
document.querySelectorAll('.filters').forEach(group => {
  const chips = group.querySelectorAll('.chip');
  chips.forEach(c => c.addEventListener('click', () => {
    chips.forEach(x => x.classList.remove('active'));
    c.classList.add('active');
    const f = c.dataset.filter;
    document.querySelectorAll('.listing').forEach(l => {
      const tags = (l.dataset.tags || '').split(' ');
      l.style.display = (f === 'all' || tags.includes(f)) ? '' : 'none';
    });
  }));
});

// === FORMS ===
document.querySelectorAll('form.contact__form').forEach(f => {
  f.addEventListener('submit', e => {
    e.preventDefault();
    const btn = f.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = 'Enviado. Gracias';
    btn.style.background = 'var(--night)';
    btn.style.color = 'var(--white)';
    setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; btn.style.color = ''; f.reset(); }, 2800);
  });
});

// === CUSTOM CURSOR ===
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);
  let cx = 0, cy = 0, tx = 0, ty = 0;
  window.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  const tick = () => {
    cx += (tx - cx) * 0.22;
    cy += (ty - cy) * 0.22;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  };
  tick();
  document.querySelectorAll('a, button, .listing, .dev-card, .chip, .chapter, .toc tr, .unit, .plate').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
  document.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('text'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('text'));
  });
}

// === LIVE CLOCK in frame ===
const clock = document.querySelector('[data-clock]');
if (clock) {
  const update = () => {
    const now = new Date();
    const tz = 'America/Cancun';
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', timeZone: tz, hour12: false
    });
    clock.textContent = fmt.format(now) + ' CST';
  };
  update();
  setInterval(update, 30000);
}
