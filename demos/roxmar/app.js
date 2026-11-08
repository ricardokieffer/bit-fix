/* ROXMAR — catálogo + pedido por WhatsApp. Hecho por Bit&Fix. */
(function () {
  'use strict';

  /* ===== CONFIGURACIÓN =====
     WHATSAPP: número del local con código de país, sin + ni espacios (ej.: '5493525123456').
     Mientras esté vacío, WhatsApp abre para elegir el contacto. */
  var WHATSAPP = '';
  var NEGOCIO = 'ROXMAR';
  var STORE_KEY = 'roxmar-pedido-v1';

  var U = function (id, w, h) {
    return 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&w=' + (w || 600) + '&h=' + (h || 750) + '&q=70';
  };

  var CATS = [
    { id: 'Zapatillas', img: '1600269452121-4f2416e55c28', c1: '#e3262f', c2: '#ff7a59' },
    { id: 'Camperas', img: '1548624313-0396c75e4b1a', c1: '#14213d', c2: '#3a5bab' },
    { id: 'Pantalones', img: '1602293589930-45aad59ba3ab', c1: '#1d4ed8', c2: '#14213d' },
    { id: 'Remeras', img: '1581655353564-df123a1eb820', c1: '#f59e0b', c2: '#e3262f' },
    { id: 'Vestidos', img: '1613966570650-add3cf83aa83', c1: '#db2777', c2: '#f59e0b' },
    { id: 'Mochilas', img: '1622560480654-d96214fdc887', c1: '#0f766e', c2: '#14213d' },
    { id: 'Crocs', img: '1724092130936-fb1b5f9921ad', c1: '#16a34a', c2: '#0ea5e9' }
  ];
  var CAT = {};
  CATS.forEach(function (c) { CAT[c.id] = c; });

  var CALZADO = ['35', '36', '37', '38', '39', '40', '41', '42', '43'];
  var ROPA = ['S', 'M', 'L', 'XL', 'XXL'];
  var JEAN = ['36', '38', '40', '42', '44', '46'];
  var CROCS = ['34/35', '36/37', '38/39', '40/41', '42/43'];
  var UNICO = ['Único'];

  // flag: nuevo | oferta | top ; old: precio anterior
  var P = [
    { n: 'Zapatillas urbanas pastel', c: 'Zapatillas', p: 58900, old: 69900, f: 'oferta', img: '1595950653106-6c9ebd614d3a', s: CALZADO },
    { n: 'Zapatillas blancas clásicas', c: 'Zapatillas', p: 54900, f: 'top', img: '1600269452121-4f2416e55c28', s: CALZADO },
    { n: 'Zapatillas running', c: 'Zapatillas', p: 62500, f: 'nuevo', img: '1560769629-975ec94e6a86', s: CALZADO },
    { n: 'Zapatillas perforadas', c: 'Zapatillas', p: 49900, img: '1608231387042-66d1773070a5', s: CALZADO },
    { n: 'Campera inflable blanca', c: 'Camperas', p: 79900, old: 109900, f: 'oferta', img: '1706765779494-2705542ebe74', s: ROPA },
    { n: 'Campera rompeviento amarilla', c: 'Camperas', p: 64900, old: 84900, f: 'oferta', img: '1548624313-0396c75e4b1a', s: ROPA },
    { n: 'Jean recto clásico', c: 'Pantalones', p: 42900, f: 'top', img: '1602293589930-45aad59ba3ab', s: JEAN },
    { n: 'Jean mom celeste', c: 'Pantalones', p: 45900, f: 'nuevo', img: '1714729382668-7bc3bb261662', s: JEAN },
    { n: 'Jean slim oscuro', c: 'Pantalones', p: 39900, img: '1637069585336-827b298fe84a', s: JEAN },
    { n: 'Remera básica blanca', c: 'Remeras', p: 14900, f: 'top', img: '1581655353564-df123a1eb820', s: ROPA },
    { n: 'Remera básica negra', c: 'Remeras', p: 14900, img: '1583743814966-8936f5b7be1a', s: ROPA },
    { n: 'Pack x2 remeras', c: 'Remeras', p: 25900, old: 29800, f: 'oferta', img: '1759572095384-1a7e646d0d4f', s: ROPA },
    { n: 'Vestido floral de verano', c: 'Vestidos', p: 38900, f: 'nuevo', img: '1602303894456-398ce544d90b', s: ['S', 'M', 'L', 'XL'] },
    { n: 'Vestido rayado azul', c: 'Vestidos', p: 41900, f: 'nuevo', img: '1613966570650-add3cf83aa83', s: ['S', 'M', 'L', 'XL'] },
    { n: 'Vestido blanco liviano', c: 'Vestidos', p: 36900, img: '1520026582657-4daf5bb60adb', s: ['S', 'M', 'L', 'XL'] },
    { n: 'Mochila urbana roja', c: 'Mochilas', p: 32900, f: 'top', img: '1622560480654-d96214fdc887', s: UNICO },
    { n: 'Mochila marrón con bolsillos', c: 'Mochilas', p: 35900, img: '1622560480605-d83c853bc5c3', s: UNICO },
    { n: 'Mochila negra escolar', c: 'Mochilas', p: 29900, old: 34900, f: 'oferta', img: '1553062407-98eeb64c6a62', s: UNICO },
    { n: 'Crocs clásicas blancas', c: 'Crocs', p: 34900, f: 'top', img: '1603145733190-59811e523c72', s: CROCS },
    { n: 'Crocs verdes', c: 'Crocs', p: 34900, f: 'nuevo', img: '1724092130936-fb1b5f9921ad', s: CROCS },
    { n: 'Crocs rosas', c: 'Crocs', p: 32900, img: '1732888979036-be690f79d5b8', s: CROCS }
  ];
  P.forEach(function (x, i) { x.id = 'p' + (i + 1); });
  var BY_ID = {};
  P.forEach(function (x) { BY_ID[x.id] = x; });

  var FLAG = { nuevo: 'Nuevo', oferta: 'Oferta', top: 'Más vendido' };
  var ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4 4 7l2 3 2-1v11h8V9l2 1 2-3-4-3h-2a2 2 0 0 1-4 0z"/></svg>';

  /* ===== Utilidades ===== */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var money = function (n) { return '$ ' + Math.round(n).toLocaleString('es-AR'); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; });
  };
  var norm = function (s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };

  // Si una foto no carga (sin internet, link caído), se muestra un recuadro con color de la categoría
  function fallback(img) {
    var c = CAT[img.getAttribute('data-cat')] || { c1: '#e3262f', c2: '#14213d' };
    var d = document.createElement('div');
    d.className = 'ph';
    d.style.setProperty('--c1', c.c1);
    d.style.setProperty('--c2', c.c2);
    d.innerHTML = ICON + '<span>' + esc(img.getAttribute('data-cat') || NEGOCIO) + '</span>';
    if (img.parentNode) img.parentNode.replaceChild(d, img);
  }
  function wireImg(img) {
    img.addEventListener('error', function () { fallback(img); }, { once: true });
    if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
  }

  /* ===== Pedido (guardado en el navegador) ===== */
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch (e) { cart = []; }
  cart = cart.filter(function (l) { return BY_ID[l.id] && l.q > 0; });
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); } catch (e) { /* modo privado */ } }
  function count() { return cart.reduce(function (a, l) { return a + l.q; }, 0); }
  function total() { return cart.reduce(function (a, l) { return a + BY_ID[l.id].p * l.q; }, 0); }

  function add(id, size) {
    var l = cart.filter(function (x) { return x.id === id && x.s === size; })[0];
    if (l) l.q++; else cart.push({ id: id, s: size, q: 1 });
    save(); renderCart(true);
  }

  /* ===== Categorías ===== */
  function renderCats() {
    $('#cats').innerHTML = CATS.map(function (c) {
      var n = P.filter(function (p) { return p.c === c.id; }).length;
      return '<button class="cat reveal" type="button" data-filter="' + c.id + '">' +
        '<div class="cat__img"><img data-src="' + U(c.img, 360, 480) + '" alt="' + c.id + '" data-cat="' + c.id + '" loading="lazy"></div>' +
        '<div class="cat__name">' + c.id + ' <span>' + n + '</span></div></button>';
    }).join('');
  }

  /* ===== Catálogo ===== */
  var state = { cat: 'Todo', q: '', sort: 'rel' };

  function renderChips() {
    var list = ['Todo'].concat(CATS.map(function (c) { return c.id; }), ['Ofertas']);
    $('#chips').innerHTML = list.map(function (c) {
      var n = c === 'Todo' ? P.length : c === 'Ofertas' ? P.filter(function (p) { return p.f === 'oferta'; }).length : P.filter(function (p) { return p.c === c; }).length;
      return '<button class="chip" type="button" role="tab" data-chip="' + c + '" aria-selected="' + (state.cat === c) + '">' + (c === 'Ofertas' ? '🔥 ' : '') + c + '<small>' + n + '</small></button>';
    }).join('');
  }

  function card(p) {
    var off = p.old ? Math.round((1 - p.p / p.old) * 100) : 0;
    var single = p.s.length === 1;
    return '<article class="card" data-id="' + p.id + '">' +
      '<div class="card__img">' + (p.f ? '<span class="flag flag--' + p.f + '">' + FLAG[p.f] + '</span>' : '') +
      '<img data-src="' + U(p.img) + '" alt="' + esc(p.n) + '" data-cat="' + p.c + '" loading="lazy"></div>' +
      '<div class="card__body"><span class="card__cat">' + p.c + '</span><h3>' + esc(p.n) + '</h3>' +
      '<div class="price"><b>' + money(p.p) + '</b>' + (p.old ? '<s>' + money(p.old) + '</s><em>-' + off + '%</em>' : '') + '</div>' +
      '<div class="sizes" role="group" aria-label="Talle">' + p.s.map(function (s) {
        return '<button class="size" type="button" data-size="' + s + '" aria-pressed="' + single + '">' + s + '</button>';
      }).join('') + '</div>' +
      '<button class="add" type="button">+ Agregar</button></div></article>';
  }

  function renderGrid() {
    var q = norm(state.q.trim());
    var list = P.filter(function (p) {
      if (state.cat === 'Ofertas' && p.f !== 'oferta') return false;
      if (state.cat !== 'Todo' && state.cat !== 'Ofertas' && p.c !== state.cat) return false;
      return !q || norm(p.n + ' ' + p.c).indexOf(q) > -1 || (q === 'jean' && p.c === 'Pantalones');
    });
    if (state.sort === 'asc') list.sort(function (a, b) { return a.p - b.p; });
    if (state.sort === 'desc') list.sort(function (a, b) { return b.p - a.p; });
    var g = $('#grid');
    g.innerHTML = list.map(card).join('');
    $$('img', g).forEach(wireImg);
    $$('.card', g).forEach(function (el, i) { el.style.animationDelay = Math.min(i * 40, 400) + 'ms'; });
    $('#empty').hidden = list.length > 0;
  }

  function setCat(c) {
    state.cat = c;
    $$('.chip').forEach(function (b) { b.setAttribute('aria-selected', b.dataset.chip === c); });
    renderGrid();
  }

  $('#chips').addEventListener('click', function (e) {
    var b = e.target.closest('.chip');
    if (b) setCat(b.dataset.chip);
  });
  $('#q').addEventListener('input', function (e) { state.q = e.target.value; renderGrid(); });
  $('#sort').addEventListener('change', function (e) { state.sort = e.target.value; renderGrid(); });

  // Tiles de categoría y promos filtran el catálogo
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-filter]');
    if (!t) return;
    e.preventDefault();
    setCat(t.dataset.filter);
    $('#catalogo').scrollIntoView({ behavior: 'smooth' });
  });

  $('#grid').addEventListener('click', function (e) {
    var cardEl = e.target.closest('.card');
    if (!cardEl) return;
    var sz = e.target.closest('.size');
    if (sz) {
      $$('.size', cardEl).forEach(function (b) { b.setAttribute('aria-pressed', b === sz); });
      return;
    }
    var btn = e.target.closest('.add');
    if (!btn) return;
    var sel = $('.size[aria-pressed="true"]', cardEl);
    if (!sel) {
      var box = $('.sizes', cardEl);
      box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake');
      toast('Elegí un talle primero', true);
      return;
    }
    var p = BY_ID[cardEl.dataset.id];
    add(p.id, sel.dataset.size);
    btn.classList.add('ok'); btn.textContent = '✓ Agregado';
    setTimeout(function () { btn.classList.remove('ok'); btn.textContent = '+ Agregar'; }, 1400);
    toast(p.n + (sel.dataset.size !== 'Único' ? ' · talle ' + sel.dataset.size : '') + ' agregado');
  });

  /* ===== Carrito ===== */
  var drawer = $('#drawer');
  function openCart() { drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
  function closeCart() { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
  $$('[data-open-cart]').forEach(function (b) { b.addEventListener('click', openCart); });
  $$('[data-close-cart]').forEach(function (b) { b.addEventListener('click', closeCart); });

  function renderCart(bump) {
    var n = count();
    $$('[data-cart-count]').forEach(function (b) {
      b.textContent = n; b.hidden = n === 0;
      if (bump) { b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); }
    });
    $$('[data-cart-total]').forEach(function (b) { b.textContent = money(total()); });
    $('.cart-fab').hidden = n === 0;
    $('#drawer-empty').hidden = n > 0;
    $('#checkout').hidden = n === 0;
    var lines = $('#lines');
    lines.innerHTML = cart.map(function (l, i) {
      var p = BY_ID[l.id];
      return '<li class="line"><div class="line__img"><img data-src="' + U(p.img, 140, 160) + '" alt="" data-cat="' + p.c + '"></div>' +
        '<div><h4>' + esc(p.n) + '</h4><small>' + (l.s === 'Único' ? 'Talle único' : 'Talle ' + l.s) + ' · ' + money(p.p) + '</small><br>' +
        '<span class="qty"><button type="button" data-q="-1" data-i="' + i + '" aria-label="Restar">−</button><span>' + l.q + '</span><button type="button" data-q="1" data-i="' + i + '" aria-label="Sumar">+</button></span></div>' +
        '<div><div class="line__price">' + money(p.p * l.q) + '</div><button class="rm" type="button" data-rm="' + i + '">Quitar</button></div></li>';
    }).join('');
    $$('img', lines).forEach(wireImg);
  }

  $('#lines').addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.rm != null) cart.splice(+b.dataset.rm, 1);
    else if (b.dataset.q) {
      var l = cart[+b.dataset.i];
      l.q += +b.dataset.q;
      if (l.q <= 0) cart.splice(+b.dataset.i, 1);
    }
    save(); renderCart();
  });

  /* ===== Checkout ===== */
  var form = $('#checkout');
  var other = $('#other');
  form.addEventListener('change', function (e) {
    if (e.target.name === 'entrega') {
      other.hidden = e.target.value !== 'otra';
      if (!other.hidden) $('#c-loc').focus();
    }
  });
  $$('input, textarea', form).forEach(function (i) { i.addEventListener('input', function () { i.classList.remove('invalid'); $('#err').hidden = true; }); });

  function buildMessage(d) {
    var L = ['*Pedido web ' + NEGOCIO + '*', ''];
    cart.forEach(function (l) {
      var p = BY_ID[l.id];
      L.push('• ' + l.q + ' x ' + p.n + (l.s === 'Único' ? '' : ' (talle ' + l.s + ')') + ' — ' + money(p.p * l.q));
    });
    L.push('', '*Total: ' + money(total()) + '*', '');
    L.push('Nombre: ' + d.nombre);
    if (d.entrega === 'retiro') L.push('Entrega: Retiro en el local');
    else if (d.entrega === 'local') L.push('Entrega: Envío en San José de la Dormida');
    else {
      L.push('Entrega: Envío a ' + d.localidad);
      L.push('_Soy de otra localidad: el costo y la forma de envío los acuerdo con el vendedor._');
    }
    L.push('Pago: ' + d.pago);
    if (d.comentario) L.push('Comentario: ' + d.comentario);
    L.push('', '¿Me confirman disponibilidad? ¡Gracias!');
    return L.join('\n');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = {
      nombre: form.nombre.value.trim(),
      entrega: (form.querySelector('[name=entrega]:checked') || {}).value || 'retiro',
      localidad: form.localidad.value.trim(),
      pago: form.pago.value,
      comentario: form.comentario.value.trim()
    };
    var err = $('#err');
    if (!cart.length) return;
    if (!d.nombre) { form.nombre.classList.add('invalid'); form.nombre.focus(); err.textContent = 'Escribí tu nombre para que sepan quién hace el pedido.'; err.hidden = false; return; }
    if (d.entrega === 'otra' && !d.localidad) { form.localidad.classList.add('invalid'); form.localidad.focus(); err.textContent = 'Decinos de qué localidad sos.'; err.hidden = false; return; }
    var msg = buildMessage(d);
    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);
    $('#bubble').textContent = msg;
    $('#wa-go').href = url;
    $('#modal-note').textContent = WHATSAPP
      ? 'Revisá el mensaje. Al tocar el botón se abre WhatsApp con todo listo para enviar.'
      : 'Vista previa: cuando se cargue el número del local, el pedido le llega directo. Por ahora WhatsApp te deja elegir el contacto.';
    openModal();
  });

  var modal = $('#modal');
  function openModal() { modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); }
  function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }
  $$('[data-close-modal]').forEach(function (b) { b.addEventListener('click', closeModal); });
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });

  /* ===== Galería ===== */
  var lb = $('#lightbox');
  $('#gallery').addEventListener('click', function (e) {
    var g = e.target.closest('[data-full]');
    if (!g) return;
    var img = $('img', lb);
    img.src = g.dataset.full; img.alt = $('img', g).alt;
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
  });
  lb.addEventListener('click', function () { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeModal(); closeCart(); lb.classList.remove('open');
    closeMenu();
  });

  /* ===== Menú y header ===== */
  var menuBtn = $('.menu-btn'), nav = $('#nav');
  function closeMenu() { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', function () {
    var o = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', o);
  });
  $$('a', nav).forEach(function (a) { a.addEventListener('click', closeMenu); });
  var top = $('.top');
  window.addEventListener('scroll', function () { top.classList.toggle('scrolled', window.scrollY > 10); }, { passive: true });

  /* ===== Toast ===== */
  var tEl = $('#toast'), tT;
  function toast(m) {
    tEl.textContent = m; tEl.classList.add('show');
    clearTimeout(tT); tT = setTimeout(function () { tEl.classList.remove('show'); }, 2000);
  }

  /* ===== Inicio ===== */
  renderCats();
  renderChips();
  renderGrid();
  renderCart();
  $$('img[data-src]').forEach(wireImg);
  $$('img:not([data-cat])').forEach(function (img) { img.addEventListener('error', function () { img.style.visibility = 'hidden'; }); });

  // Animación de aparición
  var rv = $$('.head, .promo, .g, .steps li, .contact > *, .reveal');
  rv.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('on'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -40px 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('on'); });
})();
