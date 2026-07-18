/* All Beer — main.js
   PLUMBING_V 1 (da Agenzia/Toolkit/boilerplate). Birreria notturna: orari con
   SCAVALCO MEZZANOTTE (chiude alle 02:00 → stored come 26:00). GSAP SUBITO;
   reveal once; watchdog 1,5s. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO (PLUMBING_V 1) ══════════ */
  var SITE = {
    slug: 'all-beer',
    hours: {
      0: [['17:00', '24:00']],
      1: [],
      2: [['17:00', '26:00']],
      3: [['17:00', '26:00']],
      4: [['17:00', '26:00']],
      5: [['17:00', '26:00']],
      6: [['17:00', '26:00']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '#orariTable tr[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1800,
    inViewClass: 'in-view',
    breakpointMenu: 920,
    EN: {
      'nav.rito': 'The ritual', 'nav.bevi': 'What to drink', 'nav.casa': 'Like home', 'nav.dove': 'Where & hours', 'nav.chiama': 'Call',
      'hero.rec': '468 reviews',
      'hero.kicker': 'The pub 300 metres from San Siro',
      'hero.sub': 'Craft beers <strong>on tap</strong>, cocktails and a basket of popcorn with every beer. The meeting point <strong>before and after the match</strong> — open till 2am.',
      'hero.cta1': 'Call: 02 2317 2057', 'hero.cta2': 'What to drink',
      'tk.1': 'beers on tap', 'tk.2': 'cocktails & gin tonic', 'tk.3': 'popcorn with every beer', 'tk.4': 'pinse & piadine', 'tk.5': 'open till 2am', 'tk.6': '300 metres from the stadium',
      'tk.1b': 'beers on tap', 'tk.2b': 'cocktails & gin tonic', 'tk.3b': 'popcorn with every beer', 'tk.4b': 'pinse & piadine', 'tk.5b': 'open till 2am', 'tk.6b': '300 metres from the stadium',
      'rito.kicker': 'The ritual', 'rito.t1': 'Before heading', 'rito.t2': 'to the stadium',
      'rito.p1': 'Just <strong>300 metres from San Siro</strong>, All Beer is the meeting point before and after matches and concerts. You gather, you toast, you stock up on good beer — and head to the stadium in the right spirit.',
      'rito.p2': 'And if there’s no match, it still works: the beer is good every day, and here you stay till 2am.',
      'bevi.kicker': 'What to drink (and eat)', 'bevi.t1': 'On tap,', 'bevi.t2': 'with popcorn',
      'b1.t': 'The beers', 'b1.p': 'Craft beers on tap of every kind — the Lagunitas IPA is a classic — and plenty in the bottle. Always poured the right way.',
      'b2.t': 'And more', 'b2.p': 'Well-made cocktails and gin tonics, and with every beer comes a <strong>basket of freshly-made popcorn</strong>. To eat: pinse, piadine, puccie and sandwiches.',
      'casa.kicker': 'Like home', 'casa.t1': 'Elvis', 'casa.t2': '& Irisild',
      'casa.p1': 'The secret of All Beer is the people: <strong>Elvis</strong>, the owner, and <strong>Irisild</strong> behind the bar. Some call them «the best people in the world» — and after the first pint, you simply feel <em>at home</em>.',
      'casa.p2': 'Welcoming staff, the right music and the wish to make you feel good: that’s why people have come back for years.',
      'gal.kicker': 'In the pub', 'gal.t1': 'A look', 'gal.t2': 'inside',
      'rec.kicker': 'What people say', 'rec.t2': 'from 468 reviews',
      'rec.r1': '«A great pub 300 metres from San Siro stadium. Perfect for a few beers before or after the match. Good beers on tap, I recommend the Lagunitas IPA. Fair prices.»',
      'rec.r2': '«With every beer they bring a basket of freshly-made popcorn. A wonderful place, courteous staff and excellent beers.»',
      'rec.r3': '«Not only the best pub in Milan, but the people inside — Elvis and Irisild — are the best in the world. I feel at home!»',
      'rec.r4': '«My favourite spot before heading up to the stadium: fabulous beer and gin tonic, and you can also grab a pinsa or a sandwich.»',
      'dove.kicker': 'Where & hours', 'dove.t1': 'On Via Capecelatro,', 'dove.t2': 'under San Siro',
      'dove.metro': 'Via Alfonso Capecelatro 75, 20148 Milan · 300 metres from the stadium, near San Siro Stadio station (M5)',
      'dove.chiama': 'Call 02 2317 2057', 'dove.apri': 'Open in Maps',
      'giorni.lun': 'Monday', 'giorni.mar': 'Tuesday', 'giorni.mer': 'Wednesday', 'giorni.gio': 'Thursday', 'giorni.ven': 'Friday', 'giorni.sab': 'Saturday', 'giorni.dom': 'Sunday', 'giorni.chiuso': 'Closed',
      'faq.kicker': 'Frequently asked questions',
      'faq.q1': 'How far are you from the stadium?', 'faq.a1': 'About 300 metres from San Siro stadium, on Via Capecelatro 75. The perfect meeting point for a beer before or after matches and concerts.',
      'faq.q2': 'What beers do you have?', 'faq.a2': 'Craft beers on tap of every kind (like the Lagunitas IPA) and in the bottle, plus cocktails and gin tonic. And with every beer comes a basket of freshly-made popcorn.',
      'faq.q3': 'Is there food?', 'faq.a3': 'Yes: pinse, piadine, puccie and sandwiches, all fresh. Perfect with a beer.',
      'faq.q4': 'What are your opening hours?', 'faq.a4': 'Tuesday to Saturday 5pm–2am, Sunday 5pm–midnight. We’re closed on Mondays.',
      'faq.q5': 'Where are you?', 'faq.a5': 'At Via Alfonso Capecelatro 75 in Milan, San Siro area, near San Siro Stadio station on the M5. Call 02 2317 2057.',
      'foot.dove': 'Via Alfonso Capecelatro 75, 20148 Milan · <a href="tel:+390223172057">02 2317 2057</a>',
      'foot.demo': 'Demo website (concept) by Bespoke Studio, built from public data and photos — this is not the official website of the business.',
      'bar.chiama': 'Call', 'bar.orari': 'Hours', 'bar.mappa': 'Directions'
    },
  };
  /* ═══════════════════════════════════════════════════ */

  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll('.reveal, .reveal-hero');
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) { gsap.set(els, { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }); }
    else { els.forEach(function (el) { el.style.opacity = 1; }); }
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray('.reveal').forEach(function (el) {
      if (el.classList.contains('rito-logo')) return;
      gsap.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    gsap.to('#heroPhoto', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    /* GESTO-FIRMA: il logo (brindisi) entra ruotando */
    var ritoLogo = document.querySelector('.rito-logo');
    if (ritoLogo) gsap.fromTo(ritoLogo, { opacity: 0, scale: .7, rotate: -12 }, { opacity: 1, scale: 1, rotate: 0, duration: .9, ease: 'back.out(1.6)', scrollTrigger: { trigger: '#rito', start: 'top 72%', once: true } });
    gsap.fromTo('.bevi-card', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .7, stagger: .15, ease: 'power2.out', scrollTrigger: { trigger: '.bevi-grid', start: 'top 82%', once: true } });
  } else {
    document.querySelectorAll('.reveal, .reveal-hero').forEach(function (el) { el.classList.add(SITE.inViewClass); el.style.opacity = 1; });
  }

  /* hero entrance */
  function heroEntrance() {
    if (!hasGsap || reducedMotion) { document.querySelectorAll('.reveal-hero').forEach(function (el) { el.style.opacity = 1; }); return; }
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.hero-badge', { opacity: 1, y: 0, duration: .5 }, .05)
      .to('.hero-kicker', { opacity: 1, y: 0, duration: .5 }, .15)
      .fromTo('.hero-title', { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: .8 }, .25)
      .to('.hero-sub', { opacity: 1, y: 0, duration: .6 }, .55)
      .to('.hero-cta', { opacity: 1, y: 0, duration: .6 }, .75);
  }
  var intro = document.getElementById(SITE.introId);
  function hideIntro() { if (!intro) return; var el = intro; intro = null; el.classList.add('hide'); setTimeout(function () { el.remove(); }, 700); heroEntrance(); }
  if (reducedMotion || !intro) { if (intro) { intro.remove(); intro = null; } heroEntrance(); }
  else { setTimeout(hideIntro, SITE.introDuration); setTimeout(hideIntro, 6000); intro.addEventListener('click', hideIntro); }

  /* burger */
  var burger = document.getElementById('burger'); var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () { nav.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); if (lastFocus) { lastFocus.focus(); lastFocus = null; } };
    var openNav = function () { lastFocus = document.activeElement; nav.classList.add('nav-open'); burger.setAttribute('aria-expanded', 'true'); var f = nav.querySelector('a'); if (f) f.focus(); };
    burger.addEventListener('click', function () { nav.classList.contains('nav-open') ? closeNav() : openNav(); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > SITE.breakpointMenu) closeNav(); });
  }

  /* lightbox */
  var lightbox = document.getElementById('lightbox'), lightboxImg = document.getElementById('lightboxImg'), lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) { lightboxImg.src = src; lightboxImg.alt = alt || ''; lightbox.hidden = false; document.body.style.overflow = 'hidden'; if (lightboxClose) lightboxClose.focus(); };
    var closeLb = function () { lightbox.hidden = true; lightboxImg.src = ''; document.body.style.overflow = ''; if (opener) { opener.focus(); opener = null; } };
    document.querySelectorAll('[data-full]').forEach(function (fig) {
      fig.setAttribute('tabindex', '0'); fig.setAttribute('role', 'button');
      var img = fig.querySelector('img');
      var go = function () { opener = fig; openLb(fig.getAttribute('data-full'), img ? img.alt : ''); };
      fig.addEventListener('click', go);
      fig.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lightbox.hidden) closeLb(); });
  }

  /* orari dinamici Europe/Rome — con SCAVALCO MEZZANOTTE (PLUMBING_V 1) */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var g = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[g('weekday')], mins: parseInt(g('hour'), 10) * 60 + parseInt(g('minute'), 10) };
    } catch (e) { var d = new Date(); return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() }; }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = ((m % 1440) + 1440) % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DIT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function hoursState() {
    var now = romeNow(), w = SITE.hours[now.day] || [];
    for (var i = 0; i < w.length; i++) { var s = toMin(w[i][0]), e = toMin(w[i][1]); if (now.mins >= s && now.mins < Math.min(e, 1440)) return { open: true, day: now.day, closesAt: fmt(e) }; }
    /* finestra del giorno prima che scavalca la mezzanotte (es. chiude alle 26:00 = 02:00) */
    var prev = (now.day + 6) % 7, pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) { var pe = toMin(pw[j][1]); if (pe > 1440 && now.mins < pe - 1440) return { open: true, day: prev, closesAt: fmt(pe) }; }
    for (var k = 0; k < w.length; k++) { if (now.mins < toMin(w[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(w[k][0])) }; }
    for (var d = 1; d <= 7; d++) { var nd = (now.day + d) % 7, nw = SITE.hours[nd] || []; if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) }; }
    return { open: false, day: now.day };
  }
  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId), st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) { row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day); });
    if (!el) return;
    var en = root.lang === 'en', txt;
    if (st.open) txt = (en ? 'Open now' : 'Aperto ora') + ' · ' + (en ? 'closes at ' : 'chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DEN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DIT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    el.textContent = txt;
  }
  renderHours(); setInterval(renderHours, 60000);

  /* i18n overlay (innerHTML per <strong>/<em>/<a>) */
  var originals = {};
  var I18N_ATTRS = [['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt']];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr), store = originals[dattr];
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    var t = document.getElementById('langToggle'); if (t) t.textContent = lang === 'en' ? 'IT' : 'EN';
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', function () { setLang(root.lang === 'en' ? 'it' : 'en'); });
  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}

  /* action-bar mobile */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () { actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();
