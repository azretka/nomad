'use strict';

/* === NAV: активная ссылка при клике === */
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('nav__link--active'));
    link.classList.add('nav__link--active');
  });
});

/* ============================================================
   FAQ ACCORDION — можно открывать несколько
   ============================================================ */
document.querySelectorAll('.faq__trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.faq__item');
    const isOpen = item.classList.contains('faq__item--open');
    item.classList.toggle('faq__item--open', !isOpen);
    trigger.setAttribute('aria-expanded', !isOpen);
  });
});
(function () {
  const slider = document.getElementById('tours-slider');
  const dotsWrap = document.getElementById('tours-dots');
  if (!slider || !dotsWrap) return;

  const cards = Array.from(slider.querySelectorAll('.tour-card'));
  const CARDS_PER_VIEW = 4;
  const totalPages = Math.ceil(cards.length / CARDS_PER_VIEW);

  // Создаём dots
  const dots = [];
  for (let i = 0; i < totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = 'tours__dot' + (i === 0 ? ' tours__dot--active' : '');
    btn.setAttribute('aria-label', `Страница ${i + 1}`);
    btn.addEventListener('click', () => goToPage(i));
    dotsWrap.appendChild(btn);
    dots.push(btn);
  }

  function setActiveDot(page) {
    dots.forEach((d, i) => d.classList.toggle('tours__dot--active', i === page));
  }

  function goToPage(page) {
    const cardIndex = page * CARDS_PER_VIEW;
    // Последняя страница — скроллим до конца
    if (page === totalPages - 1) {
      slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
    } else {
      const card = cards[cardIndex];
      slider.scrollTo({ left: card.offsetLeft - 30, behavior: 'smooth' });
    }
    setActiveDot(page);
  }

  // Обновляем dot при ручном скролле
  slider.addEventListener('scroll', () => {
    const scrollEnd = slider.scrollWidth - slider.clientWidth;
    // Если долистали до конца
    if (slider.scrollLeft >= scrollEnd - 5) {
      setActiveDot(totalPages - 1);
      return;
    }
    const cardWidth = cards[0].offsetWidth + 20;
    const page = Math.round(slider.scrollLeft / (CARDS_PER_VIEW * cardWidth));
    setActiveDot(Math.min(page, totalPages - 1));
  });
})();

/* ============================================================
   REVIEWS SLIDER + DOTS
   ============================================================ */
(function () {
  const slider = document.getElementById('reviews-slider');
  const dotsWrap = document.getElementById('reviews-dots');
  if (!slider || !dotsWrap) return;

  const cards = Array.from(slider.querySelectorAll('.review-card'));
  const CARDS_PER_VIEW = 2;
  const totalPages = Math.ceil(cards.length / CARDS_PER_VIEW);

  const dots = [];
  for (let i = 0; i < totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = 'reviews__dot' + (i === 0 ? ' reviews__dot--active' : '');
    btn.setAttribute('aria-label', `Страница ${i + 1}`);
    btn.addEventListener('click', () => goToPage(i));
    dotsWrap.appendChild(btn);
    dots.push(btn);
  }

  function setActiveDot(page) {
    dots.forEach((d, i) => d.classList.toggle('reviews__dot--active', i === page));
  }

  function goToPage(page) {
    if (page === totalPages - 1) {
      slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
    } else {
      const card = cards[page * CARDS_PER_VIEW];
      slider.scrollTo({ left: card.offsetLeft - 30, behavior: 'smooth' });
    }
    setActiveDot(page);
  }

  slider.addEventListener('scroll', () => {
    const scrollEnd = slider.scrollWidth - slider.clientWidth;
    if (slider.scrollLeft >= scrollEnd - 5) {
      setActiveDot(totalPages - 1);
      return;
    }
    const cardWidth = cards[0].offsetWidth + 40;
    const page = Math.round(slider.scrollLeft / (CARDS_PER_VIEW * cardWidth));
    setActiveDot(Math.min(page, totalPages - 1));
  });
})();