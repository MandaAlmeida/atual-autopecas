// Atual Autopeças Sete Lagoas — comportamento do site

// Contato: altere aqui para atualizar todos os links e telefones da página.
const CONFIG = {
  whatsapp: '553137715755',
  phone: '(31) 3771-5755',
  whatsappMessage: 'Olá, vim pelo site e gostaria de um orçamento de peças.'
};

document.addEventListener('DOMContentLoaded', () => {
  setupContactLinks();
  setupReviewsCarousel();
  setupReveal();
  setupParallax();
  setupHeader();
});

// Cabeçalho transparente no topo; ganha cor assim que a página rola.
function setupHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// Parallax: a camada [data-parallax-layer] rola mais devagar que a seção [data-parallax].
function setupParallax() {
  const sections = Array.from(document.querySelectorAll('[data-parallax]'));
  if (!sections.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    sections.forEach((section) => {
      const layer = section.querySelector('[data-parallax-layer]');
      const rect = section.getBoundingClientRect();
      if (!layer || rect.bottom < 0 || rect.top > vh) return;
      // -1 quando a seção entra por baixo, 1 quando sai por cima
      const progress = (vh - rect.top) / (vh + rect.height) * 2 - 1;
      const range = layer.offsetHeight - rect.height; // sobra da camada além da seção
      layer.style.transform = `translate3d(0, ${(progress * range / 2).toFixed(1)}px, 0)`;
    });
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

// Preenche todos os links [data-whatsapp] e textos [data-phone].
function setupContactLinks() {
  const waLink = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(CONFIG.whatsappMessage);
  document.querySelectorAll('[data-whatsapp]').forEach((el) => { el.href = waLink; });
  document.querySelectorAll('[data-phone]').forEach((el) => { el.textContent = CONFIG.phone; });
}

// Carrossel de depoimentos: botões anterior/próximo e avanço automático a cada 5s.
function setupReviewsCarousel() {
  const track = document.querySelector('[data-reviews-track]');
  if (!track) return;

  const scrollReviews = (dir) => {
    const card = track.firstElementChild;
    const step = card ? card.getBoundingClientRect().width + 18 : 360;
    const max = track.scrollWidth - track.clientWidth;
    let x = track.scrollLeft + dir * step;
    if (x > max + 4) x = 0; else if (x < -4) x = max;
    track.scrollTo({ left: x, behavior: 'smooth' });
  };

  document.querySelector('[data-reviews-prev]')?.addEventListener('click', () => scrollReviews(-1));
  document.querySelector('[data-reviews-next]')?.addEventListener('click', () => scrollReviews(1));
  setInterval(() => { if (!track.matches(':hover')) scrollReviews(1); }, 5000);
}

// Anima os elementos [data-reveal] quando entram na tela.
function setupReveal() {
  if (!('IntersectionObserver' in window)) return;
  const root = document.documentElement;
  const els = Array.from(document.querySelectorAll('[data-reveal]'));
  if (!els.length) return;

  root.classList.add('rv-on');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.01 });

  els.forEach((el, i) => {
    el.style.animationDelay = (Math.min(i, 3) * 70) + 'ms';
    io.observe(el);
  });
}
