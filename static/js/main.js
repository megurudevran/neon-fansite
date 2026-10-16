/* Neon fan sitesi: GSAP animasyonları, parçacıklar, lightbox */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduced = root.classList.contains('reduced');
  var hasGsap = typeof window.gsap !== 'undefined';

  /* Yedek görsel: yüklenemeyen resimler için */
  var heroImg = document.getElementById('hero-img');
  if (heroImg) {
    heroImg.addEventListener('error', function () {
      var fb = heroImg.getAttribute('data-fallback');
      if (fb && heroImg.src.indexOf(fb) === -1) heroImg.src = fb;
    });
  }
  document.querySelectorAll('img[data-hide-on-error]').forEach(function (img) {
    img.addEventListener('error', function () { img.style.display = 'none'; });
  });

  /* Menü arka planı */
  var nav = document.getElementById('nav');
  function onScrollNav() { nav.classList.toggle('solid', window.scrollY > 40); }
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* Kart üzerinde fare ışığı + hero ışığı */
  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--cx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--cy', (e.clientY - r.top) + 'px');
    });
  });
  var hero = document.getElementById('hero');
  if (hero && !reduced) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      hero.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  }

  /* Lightbox */
  var box = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbCap = document.getElementById('lb-cap');
  document.querySelectorAll('.shot').forEach(function (btn) {
    btn.addEventListener('click', function () {
      lbImg.src = btn.getAttribute('data-full');
      lbImg.alt = btn.getAttribute('data-title');
      lbCap.textContent = btn.getAttribute('data-title');
      if (box.showModal) box.showModal(); else box.setAttribute('open', '');
    });
  });
  document.getElementById('lb-close').addEventListener('click', function () { box.close(); });
  box.addEventListener('click', function (e) { if (e.target === box) box.close(); });

  /* Yetenekler sahnesi: ikona tıklayınca video ve açıklama değişir */
  var sVideo = document.getElementById('stage-video');
  var sMissing = document.getElementById('stage-missing');
  var sName = document.getElementById('stage-name');
  var sShort = document.getElementById('stage-short');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.icon-btn'));
  var stageStarted = false;
  if (reduced) { sVideo.controls = true; }
  function selectTab(btn, play) {
    tabs.forEach(function (t) { var on = t === btn; t.classList.toggle('active', on); t.setAttribute('aria-selected', on ? 'true' : 'false'); });
    sName.textContent = btn.getAttribute('data-name');
    sShort.textContent = btn.getAttribute('data-short');
    var src = btn.getAttribute('data-video');
    if (src) {
      sMissing.hidden = true; sVideo.hidden = false;
      sVideo.src = src; sVideo.load();
      if (play && !reduced) { var pr = sVideo.play(); if (pr && pr.catch) pr.catch(function () {}); }
    } else {
      sVideo.pause(); sVideo.removeAttribute('src'); sVideo.hidden = true; sMissing.hidden = false;
    }
  }
  tabs.forEach(function (btn) { btn.addEventListener('click', function () { selectTab(btn, true); }); });
  if (tabs.length) {
    selectTab(tabs[0], false);
    var stageEl = document.querySelector('.stage');
    if ('IntersectionObserver' in window && !reduced) {
      new IntersectionObserver(function (entries, obs) {
        if (entries[0].isIntersecting) { obs.disconnect(); stageStarted = true; selectTab(tabs[0], true); }
      }, { threshold: 0.3 }).observe(stageEl);
    }
  }

  /* Sayaçlar ve göstergeler için başlangıç değerleri */
  var meters = document.querySelectorAll('.meter i');
  meters.forEach(function (m) { m.style.setProperty('--w', m.getAttribute('data-fill')); });

  /* Hareketsiz mod ya da GSAP yoksa: her şey görünür kalır */
  if (reduced || !hasGsap) {
    root.classList.add('reduced');
    var bar = document.getElementById('progress-bar');
    window.addEventListener('scroll', function () {
      var max = document.body.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
    }, { passive: true });
    document.getElementById('timeline').style.setProperty('--p', 1);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* Sayfa açılışı: tek, düzenli giriş */
  var intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
  intro
    .from('.neon-word span', { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.09 })
    .from('.hero-role, .hero-tag, #discover', { x: -30, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.5')
    .from('.hero-figure', { x: 80, opacity: 0, duration: 1.1 }, 0.1)
    .from('.nav', { y: -40, opacity: 0, duration: 0.6 }, 0.2);

  /* NEON harflerinde ara sıra elektrik titremesi */
  gsap.to('.neon-word', {
    keyframes: [{ opacity: 0.82, duration: 0.05 }, { opacity: 1, duration: 0.05 }, { opacity: 0.9, duration: 0.04 }, { opacity: 1, duration: 0.06 }],
    repeat: -1, repeatDelay: 3.8, delay: 2.5
  });

  /* Yumuşak kaydırma butonu */
  document.getElementById('discover').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('bilgi').scrollIntoView({ behavior: 'smooth' });
  });

  /* İlerleme çizgisi */
  gsap.to('#progress-bar', { scaleX: 1, ease: 'none',
    scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 } });

  /* Parallax */
  document.querySelectorAll('[data-parallax]').forEach(function (el) {
    var amount = parseFloat(el.getAttribute('data-parallax'));
    gsap.to(el, { y: function () { return innerHeight * amount * -1; }, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
  });

  /* Başlıklar: keskin kesik açılış */
  gsap.utils.toArray('.title').forEach(function (t) {
    gsap.fromTo(t, { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
      { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: t, start: 'top 85%', once: true } });
  });

  /* Kartlar ve diğer öğeler: gruplar halinde belirme */
  ScrollTrigger.batch('.reveal:not(.title)', {
    start: 'top 88%', once: true,
    onEnter: function (els) {
      gsap.fromTo(els, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out', overwrite: true, clearProps: 'transform' });
    }
  });

  /* Zaman çizelgesi çizgisi kaydırdıkça dolar */
  var tl = document.getElementById('timeline');
  ScrollTrigger.create({ trigger: tl, start: 'top 70%', end: 'bottom 60%', scrub: true,
    onUpdate: function (self) { tl.style.setProperty('--p', self.progress.toFixed(3)); } });

  /* Sayaçlar ve göstergeler */
  document.querySelectorAll('.stat').forEach(function (card) {
    var num = card.querySelector('.num');
    var target = parseInt(num.getAttribute('data-count'), 10);
    var meter = card.querySelector('.meter i');
    var counter = { v: 0 };
    num.textContent = '0';
    gsap.set(meter, { scaleX: 0 });
    ScrollTrigger.create({ trigger: card, start: 'top 85%', once: true, onEnter: function () {
      gsap.to(counter, { v: target, duration: 1.4, ease: 'power2.out', onUpdate: function () { num.textContent = Math.round(counter.v); } });
      gsap.to(meter, { scaleX: 1, duration: 1.4, ease: 'power2.out' });
    } });
  });

  /* Elektrik parçacıkları ve yıldırım çizgileri (hafif canvas) */
  var canvas = document.getElementById('sparks');
  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, running = true, sparks = [], bolts = [];
  function resize() {
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function makeSpark(initial) {
    return { x: initial ? Math.random() * W : -20, y: Math.random() * H, len: 14 + Math.random() * 40,
             v: 5 + Math.random() * 9, a: 0.25 + Math.random() * 0.6, c: Math.random() < 0.25 ? '138,61,255' : '31,210,255' };
  }
  function makeBolt() {
    var x = Math.random() * W, y = 0, pts = [[x, y]];
    while (y < H * (0.5 + Math.random() * 0.5)) { x += (Math.random() - 0.5) * 70; y += 24 + Math.random() * 40; pts.push([x, y]); }
    bolts.push({ pts: pts, life: 1 });
  }
  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = 'round';
    sparks.forEach(function (s, i) {
      s.x += s.v;
      ctx.strokeStyle = 'rgba(' + s.c + ',' + s.a + ')'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.len, s.y); ctx.stroke();
      if (s.x - s.len > W) sparks[i] = makeSpark(false);
    });
    if (Math.random() < 0.012 && bolts.length < 2) makeBolt();
    bolts = bolts.filter(function (b) {
      b.life -= 0.045;
      if (b.life <= 0) return false;
      ctx.strokeStyle = 'rgba(234,249,255,' + b.life + ')'; ctx.shadowColor = '#1fd2ff'; ctx.shadowBlur = 14; ctx.lineWidth = 2;
      ctx.beginPath(); b.pts.forEach(function (p, i) { i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }); ctx.stroke();
      ctx.shadowBlur = 0;
      return true;
    });
    requestAnimationFrame(frame);
  }
  function start() {
    resize();
    var count = W < 700 ? 22 : 45;
    sparks = []; for (var i = 0; i < count; i++) sparks.push(makeSpark(true));
    running = true; requestAnimationFrame(frame);
  }
  start();
  window.addEventListener('resize', function () { running = false; setTimeout(start, 120); });
  /* Hero görünmüyorsa çizimi durdur */
  ScrollTrigger.create({ trigger: '#hero', start: 'top top', end: 'bottom top',
    onToggle: function (self) { if (self.isActive && !running) { running = true; requestAnimationFrame(frame); } else if (!self.isActive) { running = false; } } });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) running = false; else if (!running) { running = true; requestAnimationFrame(frame); }
  });
})();
