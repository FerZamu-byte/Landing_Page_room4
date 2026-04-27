/* ══════════════════════════════════════════════════════
   APEX SPORT — app.js
   Módulos: Productos · Carrito · Navbar · Filtros ·
   Animaciones · Estadísticas · Formulario
══════════════════════════════════════════════════════ */

'use strict';

/* ── Datos de productos ─────────────────────────────── */
const PRODUCTS = [
  {
    id: 1, cat: 'running', name: 'Tenis Ultra Boost X', price: 2499, oldPrice: 3199,
    badge: 'sale', stars: 4.8, reviews: 124,
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop'
  },
  {
    id: 2, cat: 'crossfit', name: 'Kettlebell Pro 20 kg', price: 899, oldPrice: null,
    badge: 'top', stars: 4.9, reviews: 87,
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&auto=format&fit=crop'
  },
  {
    id: 3, cat: 'running', name: 'Playera Dry-Fit Elite', price: 549, oldPrice: null,
    badge: 'new', stars: 4.6, reviews: 56,
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format&fit=crop'
  },
  {
    id: 4, cat: 'ciclismo', name: 'Casco Aero Carbon', price: 1799, oldPrice: 2100,
    badge: 'sale', stars: 4.7, reviews: 43,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop'
  },
  {
    id: 5, cat: 'natacion', name: 'Googles Aqua Vision', price: 399, oldPrice: null,
    badge: 'new', stars: 4.5, reviews: 91,
    img: 'https://images.unsplash.com/photo-1560090995-01632a28895b?w=400&auto=format&fit=crop'
  },
  {
    id: 6, cat: 'crossfit', name: 'Cuerda de Saltar Speed', price: 349, oldPrice: null,
    badge: 'top', stars: 4.9, reviews: 210,
    img: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=400&auto=format&fit=crop'
  },
  {
    id: 7, cat: 'ciclismo', name: 'Maillot Ciclismo Pro', price: 1199, oldPrice: 1499,
    badge: 'sale', stars: 4.4, reviews: 38,
    img: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=400&auto=format&fit=crop'
  },
  {
    id: 8, cat: 'natacion', name: 'Traje de Baño Competencia', price: 799, oldPrice: null,
    badge: 'new', stars: 4.7, reviews: 62,
    img: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&auto=format&fit=crop'
  },
  {
    id: 9, cat: 'running', name: 'Medias Compresión Sport', price: 229, oldPrice: null,
    badge: 'top', stars: 4.6, reviews: 175,
    img: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&auto=format&fit=crop'
  },
  {
    id: 10, cat: 'crossfit', name: 'Barra Olímpica 20 kg', price: 3499, oldPrice: 4200,
    badge: 'sale', stars: 4.8, reviews: 55,
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop'
  },
  {
    id: 11, cat: 'ciclismo', name: 'Guantes Ciclismo Gel', price: 449, oldPrice: null,
    badge: 'new', stars: 4.3, reviews: 29,
    img: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=400&auto=format&fit=crop'
  },
  {
    id: 12, cat: 'running', name: 'Mochila Hidratación 10L', price: 899, oldPrice: 1099,
    badge: 'sale', stars: 4.8, reviews: 98,
    img: 'https://images.unsplash.com/photo-1591338624547-53e9a1b6c7f7?w=400&auto=format&fit=crop'
  }
];

/* ── Estado global ──────────────────────────────────── */
const state = {
  cart: [],
  filter: 'all',
  wishlist: new Set()
};

/* ── Helpers ────────────────────────────────────────── */
const fmt   = n => `$${n.toLocaleString('es-MX')}`;
const stars = n => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ══════════════════════════════════════════════════════
   RENDER PRODUCTOS
══════════════════════════════════════════════════════ */
function renderProducts(filter = 'all') {
  const grid = $('productsGrid');
  const items = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);

  // Fade-out antes de re-render
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(10px)';
  grid.style.transition = 'opacity .25s ease, transform .25s ease';

  setTimeout(() => {
    grid.innerHTML = '';

    if (items.length === 0) {
      grid.innerHTML = `<p style="color:var(--text-muted);grid-column:1/-1;padding:40px 0;">
        No hay productos en esta categoría aún.
      </p>`;
    } else {
      items.forEach((p, i) => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.setAttribute('data-id', p.id);
        card.style.animationDelay = `${i * 0.06}s`;

        const badgeLabel = { new: 'NUEVO', sale: 'OFERTA', top: 'TOP' };
        const badgeClass = { new: 'badge-new', sale: 'badge-sale', top: 'badge-top' };
        const inCart = state.cart.find(c => c.id === p.id);
        const liked  = state.wishlist.has(p.id);

        card.innerHTML = `
          <div class="product-img">
            <img
              src="${p.img}"
              alt="${p.name}"
              loading="lazy"
              onerror="this.src='https://placehold.co/400x300/111/c8f000?text=${encodeURIComponent(p.name)}'"
            />
            <span class="product-badge ${badgeClass[p.badge]}">${badgeLabel[p.badge]}</span>
            <button class="wishlist-btn ${liked ? 'liked' : ''}" data-wish="${p.id}" aria-label="Favorito">
              ${liked ? '❤️' : '🤍'}
            </button>
          </div>
          <div class="product-info">
            <p class="product-cat">${p.cat}</p>
            <h3 class="product-name">${p.name}</h3>
            <div class="product-stars">
              ${stars(p.stars)}
              <span>(${p.reviews})</span>
            </div>
            <div class="product-footer">
              <div class="product-price">
                ${p.oldPrice ? `<span class="old-price">${fmt(p.oldPrice)}</span>` : ''}
                ${fmt(p.price)}
              </div>
              <button class="add-to-cart" data-id="${p.id}" aria-label="Añadir al carrito">
                ${inCart ? '✓ Añadido' : '+ Carrito'}
              </button>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
    }

    // Fade-in
    grid.style.opacity   = '1';
    grid.style.transform = 'translateY(0)';
  }, 260);
}

/* ══════════════════════════════════════════════════════
   CARRITO
══════════════════════════════════════════════════════ */
function renderCart() {
  const container  = $('cartItems');
  const emptyEl    = $('cartEmpty');
  const footerEl   = $('cartFooter');
  const countEl    = $('cartCount');
  const countLabel = $('cartItemsCount');
  const totalEl    = $('totalAmount');

  const total = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const qty   = state.cart.reduce((s, i) => s + i.qty, 0);

  // Actualizar contador del navbar
  countEl.textContent = qty;
  if (qty > 0) { countEl.classList.add('show'); }
  else         { countEl.classList.remove('show'); }

  countLabel.textContent = `${qty} item${qty !== 1 ? 's' : ''}`;
  totalEl.textContent = fmt(total);

  if (state.cart.length === 0) {
    emptyEl.style.display = 'flex';
    footerEl.style.display = 'none';
    // Limpiar items pero dejar el empty
    [...container.children].forEach(c => { if (c !== emptyEl) c.remove(); });
    return;
  }

  emptyEl.style.display = 'none';
  footerEl.style.display = 'flex';

  // Re-render completo de items
  [...container.children].forEach(c => { if (c !== emptyEl) c.remove(); });

  state.cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.setAttribute('data-cart-id', item.id);
    el.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.img}" alt="${item.name}"
             onerror="this.src='https://placehold.co/70x70/111/c8f000?text=IMG'" />
      </div>
      <div class="cart-item-details">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-cat">${item.cat}</p>
        <div class="cart-item-controls">
          <div class="qty-controls">
            <button class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Restar">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Sumar">+</button>
          </div>
          <span class="cart-item-price">${fmt(item.price * item.qty)}</span>
        </div>
        <button class="remove-item" data-remove="${item.id}">✕ Quitar</button>
      </div>
    `;
    container.appendChild(el);
  });
}

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const existing = state.cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
    showToast(`+1 ${product.name} en tu carrito`);
  } else {
    state.cart.push({ ...product, qty: 1 });
    showToast(`✓ ${product.name} añadido`);
  }
  renderCart();

  // Animar botón
  const btn = document.querySelector(`.add-to-cart[data-id="${id}"]`);
  if (btn) {
    btn.classList.add('adding');
    btn.textContent = '✓ Añadido';
    setTimeout(() => btn.classList.remove('adding'), 400);
  }

  // Animación de la bolsa del navbar
  const cartBtn = $('cartBtn');
  cartBtn.style.transform = 'scale(1.2)';
  cartBtn.style.transition = 'transform .15s ease';
  setTimeout(() => { cartBtn.style.transform = ''; }, 200);
}

function changeQty(id, delta) {
  const item = state.cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else renderCart();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(c => c.id !== id);
  renderCart();
  // Marcar botón como no-añadido
  const btn = document.querySelector(`.add-to-cart[data-id="${id}"]`);
  if (btn) btn.textContent = '+ Carrito';
}

/* ══════════════════════════════════════════════════════
   DRAWER CARRITO
══════════════════════════════════════════════════════ */
function openCart() {
  $('cartDrawer').classList.add('open');
  $('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  $('cartDrawer').classList.remove('open');
  $('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════ */
let toastTimer;
function showToast(msg) {
  const toast = $('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ══════════════════════════════════════════════════════
   NAVBAR SCROLL
══════════════════════════════════════════════════════ */
function initNavbar() {
  const nav = $('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Hamburger
  const ham = $('hamburger');
  const mobileNav = $('mobileNav');
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  // Cerrar mobile nav al hacer clic en un enlace
  mobileNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      ham.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  // Smooth scroll activo
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ══════════════════════════════════════════════════════
   INTERSECTION OBSERVER — Animaciones de entrada
══════════════════════════════════════════════════════ */
function initRevealObserver() {
  const els = $$('.reveal-up, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════════════
   COUNTER ANIMADO (hero stats)
══════════════════════════════════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutExpo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    el.textContent = Math.round(eased * target).toLocaleString('es-MX');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initCounters() {
  const counterEls = $$('.stat-num[data-target]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => obs.observe(el));
}

/* ══════════════════════════════════════════════════════
   FILTROS DE PRODUCTOS
══════════════════════════════════════════════════════ */
function initFilters() {
  const filterBar = document.querySelector('.filter-bar');
  if (!filterBar) return;

  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    $$('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.filter = btn.dataset.cat;
    renderProducts(state.filter);
  });

  // Clic en categorías → scroll a productos y filtrar
  $$('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.filter;
      if (cat) {
        const btn = document.querySelector(`.filter-btn[data-cat="${cat}"]`);
        if (btn) {
          $$('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.filter = cat;
          renderProducts(state.filter);
        }
        document.querySelector('#productos').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ══════════════════════════════════════════════════════
   DELEGACIÓN DE EVENTOS EN EL GRID
══════════════════════════════════════════════════════ */
function initProductsGrid() {
  const grid = $('productsGrid');

  grid.addEventListener('click', e => {
    // Añadir al carrito
    const addBtn = e.target.closest('.add-to-cart');
    if (addBtn) {
      const id = parseInt(addBtn.dataset.id, 10);
      addToCart(id);
      return;
    }
    // Wishlist
    const wishBtn = e.target.closest('.wishlist-btn');
    if (wishBtn) {
      const id = parseInt(wishBtn.dataset.wish, 10);
      if (state.wishlist.has(id)) {
        state.wishlist.delete(id);
        wishBtn.textContent = '🤍';
        wishBtn.classList.remove('liked');
        showToast('Eliminado de favoritos');
      } else {
        state.wishlist.add(id);
        wishBtn.textContent = '❤️';
        wishBtn.classList.add('liked');
        showToast('¡Añadido a favoritos!');
      }
    }
  });
}

/* ══════════════════════════════════════════════════════
   DELEGACIÓN EN EL CARRITO
══════════════════════════════════════════════════════ */
function initCartEvents() {
  // Abrir
  $('cartBtn').addEventListener('click', openCart);
  // Cerrar
  $('cartClose').addEventListener('click', closeCart);
  $('cartOverlay').addEventListener('click', closeCart);
  // Ir a productos desde carrito vacío
  $('goShop').addEventListener('click', () => { closeCart(); });
  // Checkout
  $('checkoutBtn').addEventListener('click', () => {
    if (state.cart.length === 0) return;
    closeCart();
    const modal = $('modalOverlay');
    $('orderNum').textContent = Math.floor(100000 + Math.random() * 900000);
    modal.classList.add('open');
  });
  // Cerrar modal
  $('modalClose').addEventListener('click', () => $('modalOverlay').classList.remove('open'));
  $('modalOk').addEventListener('click', () => {
    $('modalOverlay').classList.remove('open');
    state.cart = [];
    renderCart();
    renderProducts(state.filter);
    showToast('🎉 ¡Gracias por tu compra, hasta pronto!');
  });
  $('modalOverlay').addEventListener('click', e => {
    if (e.target === $('modalOverlay')) $('modalOverlay').classList.remove('open');
  });

  // Qty y remove (delegación)
  $('cartItems').addEventListener('click', e => {
    const qtyBtn = e.target.closest('.qty-btn');
    if (qtyBtn) {
      const id = parseInt(qtyBtn.dataset.id, 10);
      const action = qtyBtn.dataset.action;
      changeQty(id, action === 'inc' ? 1 : -1);
      return;
    }
    const removeBtn = e.target.closest('.remove-item');
    if (removeBtn) {
      const id = parseInt(removeBtn.dataset.remove, 10);
      removeFromCart(id);
    }
  });

  // Cerrar con Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeCart();
      $('modalOverlay').classList.remove('open');
    }
  });
}

/* ══════════════════════════════════════════════════════
   FORMULARIO DE CONTACTO — Formspree
══════════════════════════════════════════════════════ */
function initContactForm() {
  const form = $('contactForm');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        const success = $('formSuccess');
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 5000);
        showToast('✅ ¡Mensaje enviado con éxito!');
      } else {
        const data = await response.json();
        const errMsg = data?.errors?.map(e => e.message).join(', ') || 'Error al enviar.';
        showToast('❌ ' + errMsg);
      }
    } catch (err) {
      showToast('❌ Sin conexión. Intenta de nuevo.');
    } finally {
      btn.textContent = original;
      btn.disabled = false;
    }
  });
}

/* ══════════════════════════════════════════════════════
   NEWSLETTER
══════════════════════════════════════════════════════ */
function initNewsletter() {
  const btn = document.querySelector('.newsletter-form .btn');
  const input = document.querySelector('.newsletter-form input');
  if (!btn || !input) return;

  btn.addEventListener('click', () => {
    const val = input.value.trim();
    if (!val || !val.includes('@')) {
      showToast('Ingresa un email válido');
      return;
    }
    input.value = '';
    showToast('✅ ¡Suscrito exitosamente!');
  });
}

/* ══════════════════════════════════════════════════════
   CURSOR PERSONALIZADO (desktop)
══════════════════════════════════════════════════════ */
function initCustomCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position:fixed;width:10px;height:10px;border-radius:50%;
    background:var(--accent);pointer-events:none;z-index:9999;
    transform:translate(-50%,-50%);transition:transform .1s ease,opacity .2s;
    mix-blend-mode:difference;
  `;
  document.body.appendChild(cursor);

  const ring = document.createElement('div');
  ring.style.cssText = `
    position:fixed;width:32px;height:32px;border-radius:50%;
    border:1.5px solid rgba(200,240,0,.5);pointer-events:none;z-index:9998;
    transform:translate(-50%,-50%);transition:all .15s ease;
  `;
  document.body.appendChild(ring);

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  function loop() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    ring.style.left   = rx + 'px';
    ring.style.top    = ry + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  // Escalar en hover de botones/links
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .cat-card, .product-card')) {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      ring.style.transform   = 'translate(-50%,-50%) scale(1.5)';
      ring.style.borderColor = 'rgba(200,240,0,.9)';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, .cat-card, .product-card')) {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.transform   = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor = 'rgba(200,240,0,.5)';
    }
  });
}

/* ══════════════════════════════════════════════════════
   PARALLAX SUAVE EN HERO
══════════════════════════════════════════════════════ */
function initHeroParallax() {
  const shoe = document.querySelector('.hero-shoe');
  const blob1 = document.querySelector('.blob1');
  const blob2 = document.querySelector('.blob2');
  if (!shoe) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      shoe.style.transform  = `rotate(-8deg) translateY(${y * -0.06}px)`;
      blob1.style.transform = `translate(${y * 0.03}px, ${y * -0.05}px)`;
      blob2.style.transform = `translate(${y * -0.02}px, ${y * 0.03}px)`;
    }
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════
   ACTIVE LINK (scroll spy ligero)
══════════════════════════════════════════════════════ */
function initScrollSpy() {
  const sections = $$('section[id], div[id="hero"]');
  const links = $$('.nav-link');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active-link'));
        const link = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (link) link.classList.add('active-link');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => obs.observe(s));
}

/* ══════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  renderCart();
  initNavbar();
  initRevealObserver();
  initCounters();
  initFilters();
  initProductsGrid();
  initCartEvents();
  initContactForm();
  initNewsletter();
  initCustomCursor();
  initHeroParallax();
  initScrollSpy();

  console.log('%c⚡ APEX SPORT cargado ', 'background:#c8f000;color:#000;font-weight:bold;padding:4px 8px;border-radius:4px;');
});
