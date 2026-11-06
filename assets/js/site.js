/* Kano State Ministry of Youth and Sports Development — site interactions */
(function () {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const body = document.body;
  const setBodyLock = (locked) => body.classList.toggle('overflow-hidden', locked);

  /* -------------------------------------------------------------------------
     Toast
     ---------------------------------------------------------------------- */
  const toast = $('#toast');
  const toastMessage = $('[data-toast-message]');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3600);
  }

  /* -------------------------------------------------------------------------
     Active navigation + current year + header shadow + back to top
     ---------------------------------------------------------------------- */
  const currentPage = body.dataset.page;
  if (currentPage) {
    $$('[data-nav]').forEach((item) => {
      if (item.dataset.nav !== currentPage) return;
      const link = item.matches('a') ? item : $('a', item);
      if (link) link.classList.add('is-active');
    });
  }

  $$('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  const header = $('[data-header]');
  const scrollTop = $('[data-scroll-top]');

  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);

    if (scrollTop) {
      const visible = window.scrollY > 600;
      scrollTop.classList.toggle('pointer-events-none', !visible);
      scrollTop.classList.toggle('opacity-0', !visible);
      scrollTop.classList.toggle('translate-y-4', !visible);
      scrollTop.classList.toggle('pointer-events-auto', visible);
      scrollTop.classList.toggle('opacity-100', visible);
      scrollTop.classList.toggle('translate-y-0', visible);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (scrollTop) {
    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* -------------------------------------------------------------------------
     Dialog helpers
     ---------------------------------------------------------------------- */
  function focusableIn(container) {
    return $$(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
      container
    ).filter((el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
  }

  function trapFocus(event, container) {
    if (event.key !== 'Tab' || !container) return;
    const focusable = focusableIn(container);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /* -------------------------------------------------------------------------
     Mobile menu
     ---------------------------------------------------------------------- */
  const mobileMenu = $('#mobile-menu');
  const menuOpenButton = $('[data-menu-open]');
  let menuLastFocus = null;

  function openMenu() {
    if (!mobileMenu) return;
    menuLastFocus = document.activeElement;
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    if (menuOpenButton) menuOpenButton.setAttribute('aria-expanded', 'true');
    setBodyLock(true);
    const close = $('[data-menu-close]', mobileMenu);
    if (close) close.focus();
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (menuOpenButton) menuOpenButton.setAttribute('aria-expanded', 'false');
    setBodyLock(false);
    if (menuLastFocus && typeof menuLastFocus.focus === 'function') menuLastFocus.focus();
  }

  if (menuOpenButton) {
    menuOpenButton.addEventListener('click', openMenu);
  }

  $$('[data-menu-close]').forEach((button) => {
    button.addEventListener('click', closeMenu);
  });

  $$('a[href]', mobileMenu || document.createElement('div')).forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMenu && mobileMenu.classList.contains('is-open')) closeMenu();
    });
  });

  /* -------------------------------------------------------------------------
     Search overlay
     ---------------------------------------------------------------------- */
  const searchOverlay = $('#search-overlay');
  const searchInput = $('[data-search-input]');
  const searchResults = $('[data-search-results]');
  const searchOpenButton = $('[data-search-open]');
  let searchLastFocus = null;

  const searchIndex = [
    {
      title: 'Home',
      description: 'Ministry highlights, programmes and opportunities',
      url: 'index.html',
      keywords: 'home ministry kano youth sports'
    },
    {
      title: 'About the Ministry',
      description: 'Mandate, vision, mission and policy direction',
      url: 'about.html',
      keywords: 'about mandate vision mission policy department'
    },
    {
      title: 'Our leadership',
      description: 'Meet the Commissioner and management team',
      url: 'about.html#leadership',
      keywords: 'leadership commissioner permanent secretary directors team'
    },
    {
      title: 'Registration',
      description: 'Register as an individual, group, association or club',
      url: 'register.html',
      keywords: 'register registration individual group association club portal'
    },
    {
      title: 'Individual registration',
      description: 'Join the youth and sports register as a young person',
      url: 'register.html',
      keywords: 'individual youth young person register'
    },
    {
      title: 'Programs & opportunities',
      description: 'Sports festivals, exchanges, clinics and talent pathways',
      url: 'programs.html',
      keywords: 'programmes programs opportunities festival league exchange clinic'
    },
    {
      title: 'Kano State Sports Festival',
      description: 'Annual statewide celebration of grassroots talent',
      url: 'programs.html?q=Sports%20Festival',
      keywords: 'sports festival athletics competition'
    },
    {
      title: 'Netherlands Youth Exchange',
      description: 'International learning and cultural exchange',
      url: 'programs.html?q=Netherlands',
      keywords: 'netherlands exchange international youth'
    },
    {
      title: 'Kano 5-asides Championship',
      description: 'Community five-a-side football competition',
      url: 'programs.html?q=5-asides',
      keywords: '5-asides five a side football community'
    },
    {
      title: 'Sports development',
      description: 'Grassroots sport, clubs and elite pathways',
      url: 'sports.html',
      keywords: 'sports development football athletes coaches'
    },
    {
      title: 'Kano Pillars',
      description: 'The pride of Kano football',
      url: 'sports.html#pillars',
      keywords: 'kano pillars football club sai masu gida'
    },
    {
      title: 'Registered Kano football clubs',
      description: 'Community and grassroots clubs across the State',
      url: 'sports.html#clubs',
      keywords: 'clubs registered football community grassroots'
    },
    {
      title: 'Kano 5-asides',
      description: 'Small-sided football with big community energy',
      url: 'sports.html#five-asides',
      keywords: '5-asides five aside competition community'
    },
    {
      title: 'Newsroom',
      description: 'Latest news, announcements and Ministry stories',
      url: 'news.html',
      keywords: 'news newsroom updates announcements press stories'
    },
    {
      title: 'Kano Pillars visit the Governor',
      description: 'The club presents its season achievements',
      url: 'news.html#pillars-visit',
      keywords: 'pillars governor visit sports news'
    },
    {
      title: 'Netherlands delegation visits Kano State',
      description: 'Youth exchange, skills and sports partnerships',
      url: 'news.html#netherlands',
      keywords: 'netherlands delegation partnership news'
    },
    {
      title: 'Contact the Ministry',
      description: 'Send a message, call, email or visit our office',
      url: 'contact.html',
      keywords: 'contact email phone address office message'
    },
    {
      title: 'Newsletter',
      description: 'Subscribe for Ministry news and opportunities',
      url: 'index.html#newsletter',
      keywords: 'newsletter subscribe email updates'
    }
  ];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function searchMatches(query) {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return searchIndex.slice(0, 7);

    return searchIndex
      .filter((item) => {
        const haystack = `${item.title} ${item.description} ${item.keywords}`.toLowerCase();
        return terms.every((term) => haystack.includes(term));
      })
      .slice(0, 8);
  }

  function renderSearchResults(query) {
    if (!searchResults) return;
    const matches = searchMatches(query);

    if (!matches.length) {
      searchResults.innerHTML = `
        <div class="rounded-2xl border border-dashed border-line bg-cloud/60 px-4 py-8 text-center">
          <p class="text-[13px] font-extrabold text-ink">No results found</p>
          <p class="mt-1 text-[11.5px] text-muted">Try a different word, or browse the ${'<a href="programs.html" class="font-extrabold text-brand-700 hover:underline">programmes page</a>'}.</p>
        </div>`;
      return;
    }

    const label = query.trim() ? 'Search results' : 'Popular pages';

    searchResults.innerHTML = `
      <p class="px-2 pb-1 pt-2 text-[9.5px] font-extrabold uppercase tracking-[0.18em] text-muted">${label}</p>
      ${matches
        .map(
          (item) => `
        <a href="${escapeHtml(item.url)}" class="search-result group">
          <span class="min-w-0">
            <span class="block truncate text-[13px] font-extrabold text-ink transition-colors group-hover:text-brand-700">${escapeHtml(item.title)}</span>
            <span class="mt-0.5 block truncate text-[11px] text-muted">${escapeHtml(item.description)}</span>
          </span>
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-brand group-hover:bg-brand">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="h-3.5 w-3.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </a>`
        )
        .join('')}`;
  }

  function openSearch() {
    if (!searchOverlay) return;
    searchLastFocus = document.activeElement;
    searchOverlay.classList.add('is-open');
    searchOverlay.setAttribute('aria-hidden', 'false');
    setBodyLock(true);
    if (searchInput) {
      searchInput.value = '';
      renderSearchResults('');
      window.setTimeout(() => searchInput.focus(), 60);
    }
  }

  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('is-open');
    searchOverlay.setAttribute('aria-hidden', 'true');
    setBodyLock(false);
    if (searchLastFocus && typeof searchLastFocus.focus === 'function') searchLastFocus.focus();
  }

  if (searchOpenButton) searchOpenButton.addEventListener('click', openSearch);

  $$('[data-search-close]').forEach((button) => {
    button.addEventListener('click', closeSearch);
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => renderSearchResults(searchInput.value));
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' && searchResults) {
        const first = $('a, button', searchResults);
        if (first) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  if (searchResults) {
    searchResults.addEventListener('keydown', (event) => {
      const items = $$('a, button', searchResults);
      const index = items.indexOf(document.activeElement);
      if (event.key === 'ArrowDown' && index > -1) {
        event.preventDefault();
        (items[index + 1] || items[0]).focus();
      } else if (event.key === 'ArrowUp' && index > -1) {
        event.preventDefault();
        (items[index - 1] || items[items.length - 1]).focus();
      }
    });

    searchResults.addEventListener('click', (event) => {
      if (event.target.closest('a[href]')) closeSearch();
    });
  }

  document.addEventListener('keydown', (event) => {
    const target = event.target;
    const isTyping =
      target &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable);

    if (event.key === 'Escape') {
      if (searchOverlay && searchOverlay.classList.contains('is-open')) {
        closeSearch();
      } else if (mobileMenu && mobileMenu.classList.contains('is-open')) {
        closeMenu();
      }
      return;
    }

    if (event.key === '/' && !isTyping) {
      event.preventDefault();
      openSearch();
      return;
    }

    if (event.key === 'Tab') {
      if (searchOverlay && searchOverlay.classList.contains('is-open')) {
        trapFocus(event, searchOverlay);
      } else if (mobileMenu && mobileMenu.classList.contains('is-open')) {
        trapFocus(event, mobileMenu);
      }
    }
  });

  /* -------------------------------------------------------------------------
     Hero slider
     ---------------------------------------------------------------------- */
  const heroSlides = $$('[data-hero-slide]');
  if (heroSlides.length > 1) {
    const dots = $$('[data-hero-dot]');
    const current = $('[data-hero-current]');
    const hero = $('[data-hero]');
    const prev = $('[data-hero-prev]');
    const next = $('[data-hero-next]');
    let activeIndex = 0;
    let timer = null;

    const pad = (value) => String(value).padStart(2, '0');

    function showSlide(index) {
      activeIndex = (index + heroSlides.length) % heroSlides.length;
      heroSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle('is-active', slideIndex === activeIndex);
        slide.setAttribute('aria-hidden', slideIndex === activeIndex ? 'false' : 'true');
      });
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === activeIndex);
        dot.setAttribute('aria-pressed', dotIndex === activeIndex ? 'true' : 'false');
      });
      if (current) current.textContent = pad(activeIndex + 1);
    }

    function startAutoPlay() {
      if (reduceMotion) return;
      stopAutoPlay();
      timer = window.setInterval(() => showSlide(activeIndex + 1), 6500);
    }

    function stopAutoPlay() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    prev && prev.addEventListener('click', () => {
      showSlide(activeIndex - 1);
      startAutoPlay();
    });

    next && next.addEventListener('click', () => {
      showSlide(activeIndex + 1);
      startAutoPlay();
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        showSlide(Number(dot.dataset.heroDot || 0));
        startAutoPlay();
      });
    });

    if (hero) {
      hero.addEventListener('pointerenter', stopAutoPlay);
      hero.addEventListener('pointerleave', startAutoPlay);
      hero.addEventListener('focusin', stopAutoPlay);
      hero.addEventListener('focusout', startAutoPlay);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoPlay();
      else startAutoPlay();
    });

    showSlide(0);
    startAutoPlay();
  }

  /* -------------------------------------------------------------------------
     Reveal on scroll
     ---------------------------------------------------------------------- */
  const revealItems = $$('.reveal');

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  /* -------------------------------------------------------------------------
     Counters
     ---------------------------------------------------------------------- */
  const counters = $$('[data-counter]');

  function animateCounter(el) {
    const target = Number.parseFloat(el.dataset.counter);
    if (!Number.isFinite(target)) return;

    const decimals = Number.parseInt(el.dataset.decimals || '0', 10);
    const duration = 1500;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = value.toLocaleString('en-NG', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
      if (progress < 1) window.requestAnimationFrame(tick);
    }

    window.requestAnimationFrame(tick);
  }

  if (counters.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      counters.forEach((el) => {
        const decimals = Number.parseInt(el.dataset.decimals || '0', 10);
        el.textContent = Number.parseFloat(el.dataset.counter).toLocaleString('en-NG', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        });
      });
    } else {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      counters.forEach((el) => counterObserver.observe(el));
    }
  }

  /* -------------------------------------------------------------------------
     Gallery scroller
     ---------------------------------------------------------------------- */
  const gallery = $('[data-gallery]');
  if (gallery) {
    const step = () => {
      const first = gallery.firstElementChild;
      if (!first) return 340;
      const styles = window.getComputedStyle(gallery);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || '20') || 20;
      return first.getBoundingClientRect().width + gap;
    };

    const galleryPrev = $('[data-gallery-prev]');
    const galleryNext = $('[data-gallery-next]');

    galleryPrev &&
      galleryPrev.addEventListener('click', () => {
        gallery.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' });
      });

    galleryNext &&
      galleryNext.addEventListener('click', () => {
        gallery.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' });
      });
  }

  /* -------------------------------------------------------------------------
     Programme filtering + search
     ---------------------------------------------------------------------- */
  const programGrid = $('[data-program-grid]');
  if (programGrid) {
    const cards = $$('[data-program-card]', programGrid);
    const filterButtons = $$('[data-filter]');
    const programSearch = $('[data-program-search]');
    const programCount = $('[data-program-count]');
    const programEmpty = $('[data-program-empty]');
    const programReset = $('[data-program-reset]');

    const ACTIVE_CLASSES =
      'rounded-full bg-ink px-4 py-2 text-[11px] font-extrabold text-white transition hover:bg-ink-800';
    const IDLE_CLASSES =
      'rounded-full border border-line bg-white px-4 py-2 text-[11px] font-extrabold text-ink/65 transition hover:border-brand hover:text-brand-700';

    let activeCategory = 'all';

    function applyProgramFilters() {
      const query = (programSearch ? programSearch.value : '').toLowerCase().trim();
      const terms = query.split(/\s+/).filter(Boolean);
      let visible = 0;

      cards.forEach((card) => {
        const categories = (card.dataset.category || '').toLowerCase().split(/\s+/);
        const title = (card.dataset.title || '').toLowerCase();
        const text = (card.textContent || '').toLowerCase();
        const haystack = `${title} ${text} ${categories.join(' ')}`;

        const categoryMatch = activeCategory === 'all' || categories.includes(activeCategory);
        const queryMatch = terms.every((term) => haystack.includes(term));
        const show = categoryMatch && queryMatch;

        card.classList.toggle('hidden', !show);
        if (show) {
          visible += 1;
          card.classList.add('is-visible');
        }
      });

      if (programCount) programCount.textContent = String(visible);
      if (programEmpty) programEmpty.classList.toggle('hidden', visible > 0);
      if (filterButtons.length) {
        filterButtons.forEach((button) => {
          button.setAttribute('aria-pressed', button.dataset.filter === activeCategory ? 'true' : 'false');
        });
      }
    }

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activeCategory = button.dataset.filter || 'all';
        filterButtons.forEach((item) => {
          const isActive = item === button;
          item.className = isActive ? ACTIVE_CLASSES : IDLE_CLASSES;
          item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
        applyProgramFilters();
        updateQueryString();
      });
    });

    function updateQueryString() {
      if (!window.history.replaceState) return;
      const url = new URL(window.location.href);
      const query = programSearch ? programSearch.value.trim() : '';

      if (query) url.searchParams.set('q', query);
      else url.searchParams.delete('q');

      if (activeCategory !== 'all') url.searchParams.set('category', activeCategory);
      else url.searchParams.delete('category');

      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    }

    if (programSearch) {
      programSearch.addEventListener('input', () => {
        applyProgramFilters();
        updateQueryString();
      });
    }

    if (programReset) {
      programReset.addEventListener('click', () => {
        activeCategory = 'all';
        if (programSearch) programSearch.value = '';
        filterButtons.forEach((button) => {
          const isActive = button.dataset.filter === 'all';
          button.className = isActive ? ACTIVE_CLASSES : IDLE_CLASSES;
          button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
        applyProgramFilters();
        updateQueryString();
        if (programSearch) programSearch.focus();
      });
    }

    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get('q');
    const initialCategory = params.get('category');

    if (initialQuery && programSearch) programSearch.value = initialQuery;
    if (initialCategory && filterButtons.some((button) => button.dataset.filter === initialCategory)) {
      activeCategory = initialCategory;
      filterButtons.forEach((button) => {
        const isActive = button.dataset.filter === activeCategory;
        button.className = isActive ? ACTIVE_CLASSES : IDLE_CLASSES;
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    }

    applyProgramFilters();
  }

  /* -------------------------------------------------------------------------
     Newsletter form
     ---------------------------------------------------------------------- */
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

  const subscribeForm = $('[data-subscribe-form]');
  if (subscribeForm) {
    const emailInput = $('input[type="email"]', subscribeForm);
    const submitButton = $('button[type="submit"]', subscribeForm);

    subscribeForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!emailInput) return;

      const email = emailInput.value.trim();
      if (!isValidEmail(email)) {
        emailInput.classList.remove('border-white/15');
        emailInput.classList.add('border-red-400');
        emailInput.setAttribute('aria-invalid', 'true');
        emailInput.focus();
        showToast('Please enter a valid email address.');
        return;
      }

      emailInput.classList.remove('border-red-400');
      emailInput.classList.add('border-white/15');
      emailInput.removeAttribute('aria-invalid');
      emailInput.value = '';

      if (submitButton) {
        const original = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.textContent = 'Subscribed';
        window.setTimeout(() => {
          submitButton.disabled = false;
          submitButton.innerHTML = original;
        }, 2600);
      }

      showToast('You are subscribed. Welcome to the Ministry newsletter.');
    });

    if (emailInput) {
      emailInput.addEventListener('input', () => {
        emailInput.classList.remove('border-red-400');
        emailInput.classList.add('border-white/15');
        emailInput.removeAttribute('aria-invalid');
      });
    }
  }

  /* -------------------------------------------------------------------------
     Contact form
     ---------------------------------------------------------------------- */
  const contactForm = $('[data-contact-form]');
  if (contactForm) {
    const success = $('[data-contact-success]');
    const nameInput = $('[name="name"]', contactForm);
    const emailInput = $('[name="email"]', contactForm);
    const messageInput = $('[name="message"]', contactForm);
    const subjectInput = $('[name="subject"]', contactForm);

    const subjectParam = new URLSearchParams(window.location.search).get('subject');
    if (subjectParam && subjectInput && !subjectInput.value) {
      subjectInput.value = subjectParam;
    }

    function setFieldError(input, errorSelector, valid) {
      if (!input) return true;
      const error = $(errorSelector);
      if (error) error.classList.toggle('hidden', valid);
      input.setAttribute('aria-invalid', valid ? 'false' : 'true');
      input.classList.toggle('border-red-300', !valid);
      input.classList.toggle('border-line', valid);
      return valid;
    }

    function validateContact() {
      const nameValid = setFieldError(
        nameInput,
        '[data-error-for="name"]',
        Boolean(nameInput && nameInput.value.trim().length >= 2)
      );
      const emailValid = setFieldError(
        emailInput,
        '[data-error-for="email"]',
        Boolean(emailInput && isValidEmail(emailInput.value.trim()))
      );
      const messageValid = setFieldError(
        messageInput,
        '[data-error-for="message"]',
        Boolean(messageInput && messageInput.value.trim().length >= 5)
      );

      return nameValid && emailValid && messageValid;
    }

    [nameInput, emailInput, messageInput].forEach((input) => {
      if (!input) return;
      input.addEventListener('input', () => {
        const error = $(`[data-error-for="${input.name}"]`);
        if (error) error.classList.add('hidden');
        input.setAttribute('aria-invalid', 'false');
        input.classList.remove('border-red-300');
        input.classList.add('border-line');
      });
    });

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!validateContact()) {
        const firstInvalid = $('[aria-invalid="true"]', contactForm);
        if (firstInvalid) firstInvalid.focus();
        showToast('Please check the highlighted fields.');
        return;
      }

      const submitButton = $('button[type="submit"]', contactForm);
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }

      window.setTimeout(() => {
        contactForm.reset();
        [nameInput, emailInput, messageInput].forEach((input) => {
          if (!input) return;
          input.setAttribute('aria-invalid', 'false');
          input.classList.remove('border-red-300');
        });

        if (success) {
          success.classList.remove('hidden');
          success.classList.add('flex');
          success.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        }

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML =
            'Send a message <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="m3 11 18-8-8 18-2-8-8-2Z"/></svg>';
        }

        showToast('Message sent. Thank you for contacting the Ministry.');
      }, 700);
    });
  }
})();
