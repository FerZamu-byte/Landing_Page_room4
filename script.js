/* ══════════════════════════════════════════════════════════════════════
   FYKA SPORT — app.js
   ──────────────────────────────────────────────────────────────────────
   Descripción: Archivo principal de JavaScript para la tienda deportiva
   FYKA SPORT. Controla toda la lógica interactiva de la página:
   productos, carrito, filtros, animaciones, formularios y más.

   Estructura del archivo:
   ┌─ 1. Datos de productos (array PRODUCTS)
   ├─ 2. Estado global (objeto state)
   ├─ 3. Funciones auxiliares (helpers)
   ├─ 4. Renderizado de productos
   ├─ 5. Lógica del carrito de compras
   ├─ 6. Control del drawer (panel lateral del carrito)
   ├─ 7. Sistema de notificaciones (toast)
   ├─ 8. Navbar con scroll y menú móvil
   ├─ 9. Animaciones de entrada con IntersectionObserver
   ├─ 10. Contadores animados del hero
   ├─ 11. Filtros de categorías de productos
   ├─ 12. Delegación de eventos en la grilla de productos
   ├─ 13. Delegación de eventos en el carrito
   ├─ 14. Formulario de contacto (Formspree)
   ├─ 15. Newsletter del footer
   ├─ 16. Cursor personalizado (solo desktop)
   ├─ 17. Efecto parallax en el hero
   ├─ 18. Scroll spy (link activo en navbar)
   └─ 19. Función de inicialización (DOMContentLoaded)

   Equipo: Kaleb · Yarilis · Arturo · Fernando
   Proyecto: FYKA SPORT — 2026
══════════════════════════════════════════════════════════════════════ */

/* Activa el modo estricto de JavaScript: evita errores silenciosos,
   prohíbe variables no declaradas y mejora el rendimiento del motor JS. */
'use strict';


/* ══════════════════════════════════════════════════════════════════════
   1. DATOS DE PRODUCTOS
   ──────────────────────────────────────────────────────────────────────
   Array con los 12 productos de la tienda. Cada objeto representa
   un artículo con sus propiedades:

   - id        → Identificador único del producto (número entero)
   - cat       → Categoría: 'running', 'crossfit', 'ciclismo', 'natacion'
   - name      → Nombre visible del producto
   - price     → Precio actual en pesos mexicanos (MXN)
   - oldPrice  → Precio anterior para mostrar el descuento (null si no aplica)
   - badge     → Tipo de etiqueta: 'new' (nuevo), 'sale' (oferta), 'top' (más vendido)
   - stars     → Calificación promedio del 1 al 5
   - reviews   → Número total de reseñas
   - img       → URL de la imagen del producto (Unsplash)

   Para agregar un producto nuevo, copiar uno de los objetos existentes,
   cambiar el id (debe ser único y consecutivo) y actualizar los datos.
══════════════════════════════════════════════════════════════════════ */
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
    img: 'https://images.unsplash.com/photo-1752392185223-c1d5d5f1d7af?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];


/* ══════════════════════════════════════════════════════════════════════
   2. ESTADO GLOBAL
   ──────────────────────────────────────────────────────────────────────
   Objeto central que guarda la "memoria" de la aplicación en tiempo real.
   Cualquier función puede leer o modificar este objeto para saber
   qué está pasando en la página en cada momento.

   Propiedades:
   - cart     → Array de productos agregados al carrito. Cada elemento
                es una copia del producto del array PRODUCTS más la
                propiedad 'qty' (cantidad). Ej: { ...producto, qty: 2 }
   - filter   → String con la categoría activa en el filtro de productos.
                Valor por defecto 'all' (mostrar todos).
   - wishlist → Set (conjunto) de IDs de productos marcados como favoritos.
                Usamos Set en lugar de Array porque automáticamente evita
                IDs duplicados y tiene búsqueda más rápida con .has().
══════════════════════════════════════════════════════════════════════ */
const state = {
  cart: [],
  filter: 'all',
  wishlist: new Set()
};


/* ══════════════════════════════════════════════════════════════════════
   3. FUNCIONES AUXILIARES (HELPERS)
   ──────────────────────────────────────────────────────────────────────
   Funciones pequeñas y reutilizables que simplifican operaciones
   comunes a lo largo de todo el archivo.
══════════════════════════════════════════════════════════════════════ */

/* fmt(n) → Formatea un número como precio en pesos mexicanos.
   Ejemplo: fmt(2499) → "$2,499"
   Usa toLocaleString con la configuración regional 'es-MX' para
   agregar automáticamente la coma como separador de miles. */
const fmt = n => `$${n.toLocaleString('es-MX')}`;

/* stars(n) → Convierte una calificación numérica en estrellas de texto.
   Ejemplo: stars(4.8) → "★★★★★" (redondea 4.8 a 5)
            stars(3.2) → "★★★☆☆" (redondea 3.2 a 3)
   Usa Math.round para redondear y .repeat() para generar los caracteres. */
const stars = n => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));

/* $(id) → Atajo para document.getElementById(id).
   Ejemplo: $('cartBtn') es equivalente a document.getElementById('cartBtn')
   Reduce código repetitivo cuando necesitamos un elemento por su ID. */
const $ = id => document.getElementById(id);

/* $$(sel) → Atajo para document.querySelectorAll(selector).
   Ejemplo: $$('.nav-link') selecciona todos los elementos con clase nav-link.
   Devuelve un NodeList (lista de elementos), no un Array.
   Para recorrerlo se puede usar .forEach() directamente. */
const $$ = sel => document.querySelectorAll(sel);


/* ══════════════════════════════════════════════════════════════════════
   4. RENDERIZADO DE PRODUCTOS
   ──────────────────────────────────────────────────────────────────────
   Responsable: Kaleb
══════════════════════════════════════════════════════════════════════ */

/**
 * renderProducts(filter)
 * ──────────────────────
 * Genera dinámicamente las tarjetas de producto en el HTML y las
 * inserta en el contenedor #productsGrid.
 *
 * Flujo de ejecución:
 * 1. Obtiene el contenedor del grid (#productsGrid).
 * 2. Filtra el array PRODUCTS según la categoría recibida.
 * 3. Aplica una animación de fade-out (opacidad 0) al grid actual.
 * 4. Después de 260ms (tiempo del fade), vacía el grid y genera
 *    las nuevas tarjetas con innerHTML.
 * 5. Aplica fade-in (opacidad 1) para mostrar el nuevo contenido.
 *
 * Cada tarjeta (<article>) contiene:
 * - Imagen del producto con onerror como fallback si la URL falla.
 * - Badge de tipo (NUEVO / OFERTA / TOP).
 * - Botón de favoritos (wishlist) con estado liked/no-liked.
 * - Nombre, categoría, estrellas y precio (con tachado si hay oldPrice).
 * - Botón "Añadir al carrito" o "Añadido" si ya está en el carrito.
 *
 * @param {string} filter - Categoría a mostrar: 'all', 'running',
 *                          'crossfit', 'ciclismo' o 'natacion'.
 *                          Por defecto muestra todos ('all').
 */
function renderProducts(filter = 'all') {
  const grid = $('productsGrid');

  /* Filtrar productos: si es 'all' mostramos todos; si no, solo los
     que coincidan con la categoría recibida (p.cat === filter). */
  const items = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);

  /* Animación de salida: hacemos el grid transparente y lo bajamos
     ligeramente antes de limpiar el contenido. */
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(10px)';
  grid.style.transition = 'opacity .25s ease, transform .25s ease';

  /* Esperamos 260ms (duración del fade-out) antes de repoblar el grid */
  setTimeout(() => {
    grid.innerHTML = ''; /* Limpiar todas las tarjetas anteriores */

    if (items.length === 0) {
      /* Caso especial: no hay productos en esta categoría */
      grid.innerHTML = `<p style="color:var(--text-muted);grid-column:1/-1;padding:40px 0;">
        No hay productos en esta categoría aún.
      </p>`;
    } else {
      items.forEach((p, i) => {
        /* Crear el elemento <article> para cada tarjeta de producto */
        const card = document.createElement('article');
        card.className = 'product-card';
        card.setAttribute('data-id', p.id); /* Para identificar la tarjeta en eventos */

        /* Delay escalonado: cada tarjeta aparece 60ms después de la anterior,
           creando un efecto de "cascada" visual al renderizar. */
        card.style.animationDelay = `${i * 0.06}s`;

        /* Mapas de etiquetas: convierten el valor interno del badge
           al texto e clase CSS que se mostrará en la tarjeta. */
        const badgeLabel = { new: 'NUEVO', sale: 'OFERTA', top: 'TOP' };
        const badgeClass = { new: 'badge-new', sale: 'badge-sale', top: 'badge-top' };

        /* Verificar si el producto ya está en el carrito (para mostrar
           "Añadido" en lugar de "+ Carrito"). */
        const inCart = state.cart.find(c => c.id === p.id);

        /* Verificar si el producto está en favoritos del usuario. */
        const liked = state.wishlist.has(p.id);

        /* Construir el HTML interno de la tarjeta con template literals.
           El operador ternario en oldPrice evita mostrar el precio
           tachado si no existe precio anterior. */
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

        grid.appendChild(card); /* Insertar la tarjeta en el DOM */
      });
    }

    /* Animación de entrada: restaurar opacidad y posición después
       de insertar todas las tarjetas nuevas. */
    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';
  }, 260);
}


/* ══════════════════════════════════════════════════════════════════════
   5. LÓGICA DEL CARRITO DE COMPRAS
   ──────────────────────────────────────────────────────────────────────
   Responsable: Kaleb
   Estas funciones gestionan el estado del carrito (state.cart) y
   actualizan la UI del drawer lateral en tiempo real.
══════════════════════════════════════════════════════════════════════ */

/**
 * renderCart()
 * ────────────
 * Lee el array state.cart y dibuja todos los ítems en el panel
 * lateral del carrito. También actualiza el contador numérico
 * que aparece sobre el ícono de bolsa en el navbar.
 *
 * Lo que actualiza en cada llamada:
 * - Contador de ítems en el navbar (número sobre el ícono de bolsa).
 * - Texto "X items" dentro del header del drawer.
 * - Total monetario en el footer del drawer.
 * - Lista de productos: nombre, categoría, controles +/-, precio y botón quitar.
 * - Muestra u oculta el estado "carrito vacío" según corresponda.
 */
function renderCart() {
  /* Referencias a los elementos del DOM que vamos a actualizar */
  const container  = $('cartItems');      /* Contenedor de los ítems del carrito */
  const emptyEl    = $('cartEmpty');      /* Mensaje de "carrito vacío" */
  const footerEl   = $('cartFooter');     /* Footer con total y botón de pago */
  const countEl    = $('cartCount');      /* Número sobre el ícono del navbar */
  const countLabel = $('cartItemsCount'); /* Texto "X items" en el header */
  const totalEl    = $('totalAmount');    /* Monto total del carrito */

  /* Calcular el total monetario: sumamos precio × cantidad de cada ítem */
  const total = state.cart.reduce((s, i) => s + i.price * i.qty, 0);

  /* Calcular la cantidad total de piezas (sumando las cantidades de cada ítem) */
  const qty = state.cart.reduce((s, i) => s + i.qty, 0);

  /* Actualizar el contador visible en el navbar */
  countEl.textContent = qty;
  /* Mostrar u ocultar el badge según si hay o no ítems */
  if (qty > 0) { countEl.classList.add('show'); }
  else         { countEl.classList.remove('show'); }

  /* Actualizar texto del header con singular/plural correcto */
  countLabel.textContent = `${qty} item${qty !== 1 ? 's' : ''}`;

  /* Mostrar el total formateado como precio */
  totalEl.textContent = fmt(total);

  /* Si el carrito está vacío, mostrar el estado vacío y ocultar el footer */
  if (state.cart.length === 0) {
    emptyEl.style.display = 'flex';
    footerEl.style.display = 'none';
    /* Limpiar los ítems renderizados previamente, conservando el elemento vacío */
    [...container.children].forEach(c => { if (c !== emptyEl) c.remove(); });
    return; /* Salir de la función, no hay más que renderizar */
  }

  /* Si hay ítems: ocultar el estado vacío y mostrar el footer con el total */
  emptyEl.style.display = 'none';
  footerEl.style.display = 'flex';

  /* Limpiar los ítems anteriores antes de re-renderizar */
  [...container.children].forEach(c => { if (c !== emptyEl) c.remove(); });

  /* Generar un elemento HTML por cada ítem en el carrito */
  state.cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.setAttribute('data-cart-id', item.id);

    /* La animación slideInRight está definida en styles.css.
       Se aplica automáticamente al agregar la clase cart-item. */
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

/**
 * addToCart(id)
 * ─────────────
 * Agrega un producto al carrito o incrementa su cantidad si ya existe.
 * Después de modificar state.cart, llama a renderCart() para
 * actualizar la interfaz inmediatamente.
 *
 * También dispara tres efectos visuales:
 * 1. Toast de notificación con el nombre del producto.
 * 2. Animación "bounce" en el botón de la tarjeta.
 * 3. Escala rápida en el ícono del carrito del navbar.
 *
 * @param {number} id - El ID del producto a agregar (coincide con PRODUCTS[n].id).
 */
function addToCart(id) {
  /* Buscar el producto en el catálogo por su ID */
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return; /* Salir si el ID no existe (seguridad) */

  /* Verificar si el producto ya está en el carrito */
  const existing = state.cart.find(c => c.id === id);

  if (existing) {
    /* Si ya existe: solo incrementar la cantidad */
    existing.qty += 1;
    showToast(`+1 ${product.name} en tu carrito`);
  } else {
    /* Si es nuevo: agregar al array con spread operator para copiar
       todas las propiedades del producto + la propiedad qty inicial */
    state.cart.push({ ...product, qty: 1 });
    showToast(`✓ ${product.name} añadido`);
  }

  /* Actualizar la UI del carrito con los nuevos datos */
  renderCart();

  /* Animación del botón "Añadir al carrito" de la tarjeta:
     - Agrega clase 'adding' que activa el keyframe cartBounce en CSS.
     - Cambia el texto a "Añadido" para feedback visual.
     - Remueve la clase después de 400ms (duración de la animación). */
  const btn = document.querySelector(`.add-to-cart[data-id="${id}"]`);
  if (btn) {
    btn.classList.add('adding');
    btn.textContent = '✓ Añadido';
    setTimeout(() => btn.classList.remove('adding'), 400);
  }

  /* Animación del ícono del carrito en el navbar: escala a 1.2x
     y vuelve a su tamaño normal después de 200ms. */
  const cartBtn = $('cartBtn');
  cartBtn.style.transform = 'scale(1.2)';
  cartBtn.style.transition = 'transform .15s ease';
  setTimeout(() => { cartBtn.style.transform = ''; }, 200);
}

/**
 * changeQty(id, delta)
 * ────────────────────
 * Incrementa o decrementa la cantidad de un ítem en el carrito.
 * Si la cantidad llega a 0 o menos, elimina el ítem completamente.
 *
 * @param {number} id    - ID del producto cuya cantidad cambiar.
 * @param {number} delta - Valor a sumar: +1 para incrementar, -1 para decrementar.
 */
function changeQty(id, delta) {
  const item = state.cart.find(c => c.id === id);
  if (!item) return; /* Seguridad: salir si no se encuentra el ítem */

  item.qty += delta;

  /* Si la cantidad resultante es 0 o negativa, eliminar el ítem */
  if (item.qty <= 0) removeFromCart(id);
  else renderCart(); /* Si sigue siendo positiva, solo re-renderizar */
}

/**
 * removeFromCart(id)
 * ──────────────────
 * Elimina completamente un producto del carrito y actualiza la UI.
 * También resetea el texto del botón en la tarjeta de producto
 * de "Añadido" a "+ Carrito".
 *
 * @param {number} id - ID del producto a eliminar del carrito.
 */
function removeFromCart(id) {
  /* Filtrar el array eliminando el ítem con el ID indicado */
  state.cart = state.cart.filter(c => c.id !== id);

  /* Actualizar la UI del carrito */
  renderCart();

  /* Restaurar el botón de la tarjeta al estado original */
  const btn = document.querySelector(`.add-to-cart[data-id="${id}"]`);
  if (btn) btn.textContent = '+ Carrito';
}


/* ══════════════════════════════════════════════════════════════════════
   6. CONTROL DEL DRAWER (PANEL LATERAL DEL CARRITO)
   ──────────────────────────────────────────────────────────────────────
   El drawer es el panel que se desliza desde la derecha al hacer clic
   en el ícono del carrito. Se controla agregando/quitando la clase
   'open' en el elemento #cartDrawer y en el overlay oscuro #cartOverlay.
   El CSS en styles.css se encarga de la animación con transform.
══════════════════════════════════════════════════════════════════════ */

/**
 * openCart()
 * ──────────
 * Abre el panel lateral del carrito añadiendo la clase 'open' al
 * drawer y al overlay. También bloquea el scroll del body para
 * evitar que la página de fondo se desplace mientras el carrito está abierto.
 */
function openCart() {
  $('cartDrawer').classList.add('open');
  $('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden'; /* Bloquear scroll del fondo */
}

/**
 * closeCart()
 * ───────────
 * Cierra el panel lateral del carrito quitando la clase 'open'.
 * Restaura el scroll normal de la página.
 */
function closeCart() {
  $('cartDrawer').classList.remove('open');
  $('cartOverlay').classList.remove('open');
  document.body.style.overflow = ''; /* Restaurar scroll */
}


/* ══════════════════════════════════════════════════════════════════════
   7. SISTEMA DE NOTIFICACIONES (TOAST)
   ──────────────────────────────────────────────────────────────────────
   Un "toast" es una notificación pequeña que aparece brevemente en la
   parte inferior de la pantalla para confirmar una acción del usuario.
   Se usa en toda la app para: agregar al carrito, favoritos, checkout, etc.
══════════════════════════════════════════════════════════════════════ */

/* Variable para guardar el ID del timer del toast.
   Necesaria para cancelar el auto-cierre si se dispara un nuevo toast
   antes de que el anterior desaparezca. */
let toastTimer;

/**
 * showToast(msg)
 * ──────────────
 * Muestra un mensaje de notificación en la parte inferior de la pantalla.
 * El toast aparece con animación slide-up, permanece 2.8 segundos y
 * desaparece automáticamente.
 *
 * Si se llama mientras ya hay un toast visible, cancela el timer
 * anterior y reinicia el contador, evitando que desaparezca demasiado
 * pronto o que queden timers acumulados.
 *
 * @param {string} msg - Texto del mensaje a mostrar en el toast.
 *                       Puede incluir emojis: '✅ Mensaje enviado'.
 */
function showToast(msg) {
  const toast = $('toast');
  toast.textContent = msg;           /* Actualizar el texto */
  toast.classList.add('show');       /* Activar animación de entrada (CSS) */
  clearTimeout(toastTimer);          /* Cancelar timer anterior si existe */
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}


/* ══════════════════════════════════════════════════════════════════════
   8. NAVBAR — SCROLL Y MENÚ MÓVIL
   ──────────────────────────────────────────────────────────────────────
   Responsable: Arturo
══════════════════════════════════════════════════════════════════════ */

/**
 * initNavbar()
 * ────────────
 * Inicializa todos los comportamientos interactivos del navbar:
 *
 * 1. SCROLL: Agrega la clase 'scrolled' al navbar cuando el usuario
 *    baja más de 50px. El CSS usa esta clase para cambiar el fondo
 *    a un negro más opaco con sombra.
 *
 * 2. HAMBURGER (móvil): Al hacer clic en el botón de tres líneas,
 *    alterna la clase 'open' en el botón (que lo convierte en X)
 *    y en el menú móvil desplegable.
 *
 * 3. CIERRE AUTOMÁTICO: Los links del menú móvil cierran el menú
 *    al hacer clic, para que el usuario vea la sección destino.
 *
 * 4. SMOOTH SCROLL: Los links del navbar (#productos, #servicios, etc.)
 *    hacen scroll suave hasta la sección en lugar de saltar bruscamente.
 */
function initNavbar() {
  const nav = $('navbar');

  /* Listener de scroll con { passive: true } para mejor rendimiento.
     No llamamos a event.preventDefault(), así que passive es seguro. */
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* Referencias al botón hamburger y al menú móvil */
  const ham = $('hamburger');
  const mobileNav = $('mobileNav');

  /* Toggle del menú al hacer clic en el hamburger */
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  /* Cerrar el menú móvil al hacer clic en cualquier link */
  mobileNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      ham.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  /* Smooth scroll para todos los links de navegación.
     Solo aplica a hrefs que empiezan con '#' (links internos). */
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault(); /* Evitar el comportamiento por defecto del navegador */
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}


/* ══════════════════════════════════════════════════════════════════════
   9. ANIMACIONES DE ENTRADA (IntersectionObserver)
   ──────────────────────────────────────────────────────────────────────
   Responsable: Kaleb
   IntersectionObserver es una API del navegador que detecta cuándo
   un elemento entra en el viewport (área visible de la pantalla).
   La usamos para activar animaciones de entrada solo cuando el usuario
   llega a esa sección al hacer scroll, en lugar de animarlas todas al cargar.
══════════════════════════════════════════════════════════════════════ */

/**
 * initRevealObserver()
 * ─────────────────────
 * Observa todos los elementos con clases reveal-up, reveal-left o
 * reveal-right. Cuando un elemento entra en pantalla (con un margen
 * de 40px antes del borde inferior), agrega la clase 'revealed' que
 * activa la transición CSS definida en styles.css.
 *
 * Las clases de animación:
 * - .reveal-up    → el elemento sube desde abajo (translateY de 32px a 0)
 * - .reveal-left  → el elemento entra desde la izquierda
 * - .reveal-right → el elemento entra desde la derecha
 * - .revealed     → estado final: opacidad 1, posición original
 *
 * El delay escalonado se controla con la variable CSS --d en cada elemento.
 * Ejemplo en HTML: <div class="reveal-up" style="--d: .15s">
 * Esto hace que el elemento espere 150ms antes de animar, creando
 * el efecto de "cascada" cuando varios elementos aparecen juntos.
 *
 * observer.unobserve(entry.target) detiene la observación después de
 * animar, para no re-disparar la animación ni desperdiciar recursos.
 */
function initRevealObserver() {
  const els = $$('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          /* El elemento entró al viewport: activar la animación */
          entry.target.classList.add('revealed');
          /* Dejar de observar este elemento (ya se animó, no necesitamos más) */
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,               /* Activar cuando el 12% del elemento sea visible */
      rootMargin: '0px 0px -40px 0px' /* Activar 40px antes del borde inferior */
    }
  );

  /* Registrar cada elemento para ser observado */
  els.forEach(el => observer.observe(el));
}


/* ══════════════════════════════════════════════════════════════════════
   10. CONTADORES ANIMADOS DEL HERO
   ──────────────────────────────────────────────────────────────────────
   Responsable: Kaleb
   Los números de estadísticas en el hero (3,500 productos, 18,000
   clientes, 12 años) se animan contando desde 0 hasta su valor final
   con una curva de aceleración easeOutExpo para que se vea natural.
══════════════════════════════════════════════════════════════════════ */

/**
 * animateCounter(el)
 * ──────────────────
 * Anima un elemento de contador desde 0 hasta el valor indicado en
 * su atributo data-target, durante 1600ms con curva easeOutExpo.
 *
 * easeOutExpo: empieza rápido y desacelera exponencialmente al final.
 * La fórmula es: 1 - 2^(-10 * progress)
 * Esto crea una animación que se siente más orgánica que una lineal.
 *
 * Usa requestAnimationFrame para sincronizarse con el refresh del
 * navegador y lograr la animación más fluida posible.
 *
 * @param {HTMLElement} el - Elemento cuyo textContent se va a animar.
 *                           Debe tener el atributo data-target con el valor final.
 */
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10); /* Leer el valor final del atributo HTML */
  const duration = 1600;                            /* Duración total en milisegundos */
  const start    = performance.now();               /* Marca de tiempo de inicio */

  function step(now) {
    const elapsed  = now - start;                   /* Tiempo transcurrido */
    const progress = Math.min(elapsed / duration, 1); /* Progreso entre 0 y 1 */

    /* Aplicar curva easeOutExpo. Cuando progress llega a 1, usamos 1
       directamente para evitar el cálculo de 2^0 = 1 (que ya sería 0). */
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

    /* Actualizar el texto con el valor calculado, formateado con comas */
    el.textContent = Math.round(eased * target).toLocaleString('es-MX');

    /* Si no hemos llegado al final, pedir el siguiente frame */
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step); /* Iniciar el loop de animación */
}

/**
 * initCounters()
 * ──────────────
 * Configura un IntersectionObserver que activa animateCounter()
 * en cada elemento .stat-num cuando entra en pantalla.
 *
 * El threshold de 0.5 significa que la animación inicia cuando
 * el 50% del elemento es visible, garantizando que el usuario
 * vea toda la animación desde el principio.
 */
function initCounters() {
  const counterEls = $$('.stat-num[data-target]');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target); /* Iniciar la animación de este contador */
        obs.unobserve(e.target);  /* No volver a animarlo al hacer scroll */
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => obs.observe(el));
}


/* ══════════════════════════════════════════════════════════════════════
   11. FILTROS DE CATEGORÍAS DE PRODUCTOS
   ──────────────────────────────────────────────────────────────────────
   Responsable: Arturo
══════════════════════════════════════════════════════════════════════ */

/**
 * initFilters()
 * ─────────────
 * Inicializa dos sistemas de filtrado de productos:
 *
 * 1. FILTER BAR: Los botones "Todos / Running / CrossFit / Ciclismo /
 *    Natación" encima del grid. Al hacer clic en uno, se marca como
 *    activo y se re-renderiza el grid con los productos de esa categoría.
 *    Usa delegación de eventos: un solo listener en el contenedor padre
 *    maneja los clics de todos los botones hijos.
 *
 * 2. TARJETAS DE CATEGORÍAS: Las tarjetas grandes de la sección
 *    "Categorías" también funcionan como filtros. Al hacer clic en
 *    "Running", el filtro se activa automáticamente y la página hace
 *    scroll suave hasta la sección de productos.
 */
function initFilters() {
  const filterBar = document.querySelector('.filter-bar');
  if (!filterBar) return; /* Salir si no existe el elemento en esta página */

  /* Delegación de eventos: en lugar de agregar un listener a cada botón,
     ponemos uno solo en el contenedor padre y verificamos cuál botón
     fue el origen del clic con .closest(). */
  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return; /* El clic fue en el contenedor, no en un botón */

    /* Quitar la clase 'active' de todos los botones */
    $$('.filter-btn').forEach(b => b.classList.remove('active'));
    /* Marcar el botón clicado como activo */
    btn.classList.add('active');

    /* Guardar el filtro activo en el estado global y re-renderizar */
    state.filter = btn.dataset.cat;
    renderProducts(state.filter);
  });

  /* Conectar las tarjetas de categoría con el sistema de filtros */
  $$('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.filter; /* Leer la categoría del atributo data-filter */
      if (cat) {
        /* Activar el botón de filtro correspondiente */
        const btn = document.querySelector(`.filter-btn[data-cat="${cat}"]`);
        if (btn) {
          $$('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.filter = cat;
          renderProducts(state.filter);
        }
        /* Navegar suavemente hacia la sección de productos */
        document.querySelector('#productos').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}


/* ══════════════════════════════════════════════════════════════════════
   12. DELEGACIÓN DE EVENTOS EN LA GRILLA DE PRODUCTOS
   ──────────────────────────────────────────────────────────────────────
   Responsable: Kaleb
   Como las tarjetas de producto son generadas dinámicamente por
   renderProducts(), no podemos agregar listeners directamente en ellas
   al cargar la página (aún no existen). La solución es usar delegación:
   poner un listener en el contenedor padre #productsGrid, que SÍ existe
   desde el inicio, y filtrar los eventos según su origen.
══════════════════════════════════════════════════════════════════════ */

/**
 * initProductsGrid()
 * ──────────────────
 * Configura la delegación de eventos en el contenedor #productsGrid
 * para manejar dos tipos de interacción:
 *
 * 1. BOTÓN "+ CARRITO": Llama a addToCart() con el ID del producto.
 *
 * 2. BOTÓN WISHLIST (corazón): Alterna el estado de favorito del producto.
 *    - Si ya está en favoritos: lo quita, cambia el ícono a corazón vacío.
 *    - Si no está: lo agrega, cambia el ícono a corazón lleno.
 *    En ambos casos muestra un toast de confirmación.
 */
function initProductsGrid() {
  const grid = $('productsGrid');

  grid.addEventListener('click', e => {
    /* Verificar si el clic fue sobre (o dentro de) un botón de carrito */
    const addBtn = e.target.closest('.add-to-cart');
    if (addBtn) {
      const id = parseInt(addBtn.dataset.id, 10); /* Leer el ID del producto */
      addToCart(id);
      return; /* No procesar más eventos para este clic */
    }

    /* Verificar si el clic fue sobre (o dentro de) el botón de wishlist */
    const wishBtn = e.target.closest('.wishlist-btn');
    if (wishBtn) {
      const id = parseInt(wishBtn.dataset.wish, 10);

      if (state.wishlist.has(id)) {
        /* Quitar de favoritos */
        state.wishlist.delete(id);
        wishBtn.textContent = '🤍';
        wishBtn.classList.remove('liked');
        showToast('Eliminado de favoritos');
      } else {
        /* Agregar a favoritos */
        state.wishlist.add(id);
        wishBtn.textContent = '❤️';
        wishBtn.classList.add('liked');
        showToast('¡Añadido a favoritos!');
      }
    }
  });
}


/* ══════════════════════════════════════════════════════════════════════
   13. DELEGACIÓN DE EVENTOS EN EL CARRITO
   ──────────────────────────────────────────────────────────────────────
   Responsable: Kaleb
   Mismo principio que initProductsGrid(): los ítems del carrito
   se generan dinámicamente, por lo que los listeners van en el padre.
══════════════════════════════════════════════════════════════════════ */

/**
 * initCartEvents()
 * ────────────────
 * Registra todos los eventos interactivos relacionados con el carrito:
 *
 * - Abrir/cerrar el drawer (botón del navbar, X, clic en overlay).
 * - Botón "Ver Productos" cuando el carrito está vacío.
 * - Botón "Proceder al Pago": cierra el drawer, genera un número
 *   de orden aleatorio y abre el modal de confirmación.
 * - Cerrar el modal (botón X o clic fuera del modal).
 * - Botón "Perfecto" en el modal: vacía el carrito, actualiza la UI
 *   y muestra un toast de agradecimiento.
 * - Controles +/- de cantidad y botón "Quitar" de cada ítem
 *   (delegación desde el contenedor #cartItems).
 * - Tecla Escape: cierra el drawer y el modal si están abiertos.
 */
function initCartEvents() {
  /* Abrir el panel del carrito al clicar el ícono en el navbar */
  $('cartBtn').addEventListener('click', openCart);

  /* Cerrar con el botón X dentro del drawer */
  $('cartClose').addEventListener('click', closeCart);

  /* Cerrar al hacer clic en el overlay oscuro de fondo */
  $('cartOverlay').addEventListener('click', closeCart);

  /* Botón "Ver Productos" en el estado de carrito vacío */
  $('goShop').addEventListener('click', () => { closeCart(); });

  /* Botón "Proceder al Pago" */
  $('checkoutBtn').addEventListener('click', () => {
    if (state.cart.length === 0) return; /* No proceder si no hay productos */

    closeCart(); /* Cerrar el drawer antes de mostrar el modal */

    /* Generar número de orden aleatorio entre 100000 y 999999 */
    $('orderNum').textContent = Math.floor(100000 + Math.random() * 900000);

    /* Abrir el modal de confirmación */
    $('modalOverlay').classList.add('open');
  });

  /* Cerrar modal con el botón X */
  $('modalClose').addEventListener('click', () => $('modalOverlay').classList.remove('open'));

  /* Botón "Perfecto" en el modal de compra confirmada */
  $('modalOk').addEventListener('click', () => {
    $('modalOverlay').classList.remove('open');

    /* Vaciar el carrito completamente */
    state.cart = [];

    /* Actualizar la UI del carrito y los botones de las tarjetas */
    renderCart();
    renderProducts(state.filter);

    showToast('🎉 ¡Gracias por tu compra, hasta pronto!');
  });

  /* Cerrar modal al hacer clic en el overlay (fuera del modal) */
  $('modalOverlay').addEventListener('click', e => {
    /* Solo cerrar si el clic fue directo en el overlay, no en el modal */
    if (e.target === $('modalOverlay')) $('modalOverlay').classList.remove('open');
  });

  /* Delegación de eventos en #cartItems para controles de cantidad y quitar */
  $('cartItems').addEventListener('click', e => {
    /* Verificar clic en botón + o - */
    const qtyBtn = e.target.closest('.qty-btn');
    if (qtyBtn) {
      const id     = parseInt(qtyBtn.dataset.id, 10);
      const action = qtyBtn.dataset.action;
      /* 'inc' = incrementar (+1), cualquier otro valor = decrementar (-1) */
      changeQty(id, action === 'inc' ? 1 : -1);
      return;
    }

    /* Verificar clic en botón "Quitar" */
    const removeBtn = e.target.closest('.remove-item');
    if (removeBtn) {
      const id = parseInt(removeBtn.dataset.remove, 10);
      removeFromCart(id);
    }
  });

  /* Atajo de teclado: Escape cierra drawer y modal */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeCart();
      $('modalOverlay').classList.remove('open');
    }
  });
}


/* ══════════════════════════════════════════════════════════════════════
   14. FORMULARIO DE CONTACTO — Formspree
   ──────────────────────────────────────────────────────────────────────
   Responsable: Arturo
   Formspree es un servicio externo que recibe los datos del formulario
   y los envía por correo al propietario. No requiere servidor propio.
   La URL del endpoint está en el atributo action del <form> en el HTML.
══════════════════════════════════════════════════════════════════════ */

/**
 * initContactForm()
 * ─────────────────
 * Intercepta el envío del formulario de contacto para enviarlo
 * de forma asíncrona a Formspree en lugar de recargar la página.
 *
 * Flujo al enviar:
 * 1. Prevenir el comportamiento por defecto (recarga de página).
 * 2. Mostrar estado de carga en el botón ("Enviando...").
 * 3. Hacer POST a Formspree con los datos del formulario.
 * 4a. Si la respuesta es OK: limpiar el formulario, mostrar mensaje
 *     verde de éxito y disparar toast de confirmación.
 * 4b. Si hay error de Formspree: mostrar el mensaje de error específico.
 * 4c. Si no hay conexión a internet: mostrar mensaje de red.
 * 5. En cualquier caso (bloque finally): restaurar el botón al estado original.
 */
function initContactForm() {
  const form = $('contactForm');
  if (!form) return; /* Salir si el formulario no existe en la página */

  /* async/await para manejar la llamada fetch de forma legible */
  form.addEventListener('submit', async e => {
    e.preventDefault(); /* Evitar que el navegador recargue la página */

    const btn      = form.querySelector('button[type="submit"]');
    const original = btn.textContent; /* Guardar el texto original del botón */
    btn.textContent = 'Enviando...';
    btn.disabled    = true; /* Deshabilitar para evitar múltiples envíos */

    try {
      /* fetch() hace la petición HTTP al endpoint de Formspree.
         - method: 'POST' porque estamos enviando datos.
         - body: FormData serializa automáticamente todos los campos del form.
         - headers: indicamos que aceptamos JSON como respuesta. */
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        /* Envío exitoso: limpiar el formulario y mostrar confirmación */
        form.reset();
        const success = $('formSuccess');
        success.classList.add('show'); /* Mostrar mensaje verde (CSS lo anima) */
        /* Ocultar el mensaje de éxito después de 5 segundos */
        setTimeout(() => success.classList.remove('show'), 5000);
        showToast('✅ ¡Mensaje enviado con éxito!');
      } else {
        /* Error de Formspree: extraer y mostrar el mensaje de error */
        const data   = await response.json();
        const errMsg = data?.errors?.map(e => e.message).join(', ') || 'Error al enviar.';
        showToast('❌ ' + errMsg);
      }
    } catch (err) {
      /* Error de red: sin conexión a internet o el servidor no responde */
      showToast('❌ Sin conexión. Intenta de nuevo.');
    } finally {
      /* Este bloque siempre se ejecuta, haya o no error.
         Restaurar el botón para que el usuario pueda reintentar. */
      btn.textContent = original;
      btn.disabled    = false;
    }
  });
}


/* ══════════════════════════════════════════════════════════════════════
   15. NEWSLETTER DEL FOOTER
   ──────────────────────────────────────────────────────────────────────
   Responsable: Fernando
══════════════════════════════════════════════════════════════════════ */

/**
 * initNewsletter()
 * ────────────────
 * Maneja el formulario de suscripción al newsletter en el footer.
 * Valida que el email ingresado tenga formato correcto antes de
 * "suscribir" al usuario (muestra confirmación con toast).
 *
 * Nota: Esta implementación solo valida y muestra el toast.
 * Para conectar con un servicio real de email (Mailchimp, ConvertKit, etc.),
 * se deberá agregar una llamada fetch() similar a initContactForm().
 */
function initNewsletter() {
  const btn   = document.querySelector('.newsletter-form .btn');
  const input = document.querySelector('.newsletter-form input');
  if (!btn || !input) return; /* Salir si los elementos no existen */

  btn.addEventListener('click', () => {
    const val = input.value.trim(); /* Obtener el valor sin espacios extra */

    /* Validación básica: no vacío y contiene '@' (mínimo de un email válido) */
    if (!val || !val.includes('@')) {
      showToast('Ingresa un email válido');
      return;
    }

    /* Limpiar el campo y confirmar la suscripción */
    input.value = '';
    showToast('✅ ¡Suscrito exitosamente!');
  });
}


/* ══════════════════════════════════════════════════════════════════════
   16. CURSOR PERSONALIZADO (solo en desktop con mouse)
   ──────────────────────────────────────────────────────────────────────
   Responsable: Arturo
   Reemplaza el cursor del navegador con un diseño personalizado:
   un punto pequeño que sigue el cursor exactamente, y un anillo más
   grande que lo sigue con un pequeño retraso (efecto lag suavizado).
══════════════════════════════════════════════════════════════════════ */

/**
 * initCustomCursor()
 * ──────────────────
 * Crea y anima un cursor personalizado de dos partes:
 * - cursor: punto de 10px en color acento (#C8F000) con mix-blend-mode:difference
 *           que lo hace visible sobre cualquier fondo.
 * - ring: anillo circular de 32px que sigue al cursor con lag suavizado.
 *
 * El lag se logra con interpolación lineal en cada frame:
 *   posición_actual += (posición_objetivo - posición_actual) * 0.12
 * El factor 0.12 determina la "pereza" del anillo: más bajo = más lag.
 *
 * Se omite en dispositivos táctiles (tablets y móviles) porque la
 * media query '(hover: none)' detecta que no tienen mouse.
 *
 * Al hacer hover sobre elementos interactivos (links, botones, tarjetas),
 * el cursor se escala para dar retroalimentación visual.
 */
function initCustomCursor() {
  /* No ejecutar en dispositivos táctiles (sin mouse) */
  if (window.matchMedia('(hover: none)').matches) return;

  /* Crear el elemento del punto central */
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position:fixed;width:10px;height:10px;border-radius:50%;
    background:var(--accent);pointer-events:none;z-index:9999;
    transform:translate(-50%,-50%);transition:transform .1s ease,opacity .2s;
    mix-blend-mode:difference;
  `;
  document.body.appendChild(cursor);

  /* Crear el elemento del anillo exterior */
  const ring = document.createElement('div');
  ring.style.cssText = `
    position:fixed;width:32px;height:32px;border-radius:50%;
    border:1.5px solid rgba(200,240,0,.5);pointer-events:none;z-index:9998;
    transform:translate(-50%,-50%);transition:all .15s ease;
  `;
  document.body.appendChild(ring);

  /* Variables para la posición del mouse (mx, my) y la posición
     actual del anillo con lag (rx, ry). */
  let mx = 0, my = 0, rx = 0, ry = 0;

  /* Actualizar la posición objetivo del cursor en cada movimiento del mouse */
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  /* Loop de animación: actualiza la posición del cursor y del anillo en cada frame */
  function loop() {
    /* El punto sigue exactamente al mouse */
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';

    /* El anillo interpola hacia la posición del mouse (lag suavizado) */
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';

    requestAnimationFrame(loop); /* Pedir el siguiente frame */
  }
  loop(); /* Iniciar el loop */

  /* Escalar el cursor al hacer hover sobre elementos interactivos */
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .cat-card, .product-card')) {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      ring.style.transform   = 'translate(-50%,-50%) scale(1.5)';
      ring.style.borderColor = 'rgba(200,240,0,.9)'; /* Borde más opaco */
    }
  });

  /* Restaurar el tamaño normal al salir del elemento interactivo */
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, .cat-card, .product-card')) {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.transform   = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor = 'rgba(200,240,0,.5)';
    }
  });
}


/* ══════════════════════════════════════════════════════════════════════
   17. EFECTO PARALLAX EN EL HERO
   ──────────────────────────────────────────────────────────────────────
   Responsable: Kaleb
   El parallax crea profundidad visual al mover los elementos del
   hero a velocidades diferentes mientras el usuario hace scroll.
   La imagen del producto se mueve más lento que el scroll normal,
   dando la ilusión de que está "flotando" en una capa más lejana.
══════════════════════════════════════════════════════════════════════ */

/**
 * initHeroParallax()
 * ──────────────────
 * Aplica transformaciones CSS a la imagen del hero y a los blobs de
 * fondo al hacer scroll, creando un efecto de profundidad (parallax).
 *
 * Factores de velocidad (ajustar para cambiar la intensidad):
 * - Imagen: -0.06 (se mueve el 6% de la distancia de scroll hacia arriba)
 * - Blob 1: 0.03 horizontal, -0.05 vertical
 * - Blob 2: -0.02 horizontal, 0.03 vertical
 *
 * El efecto solo aplica mientras el usuario está dentro del hero
 * (y < window.innerHeight) para no crear transformaciones innecesarias
 * cuando la sección ya no es visible.
 *
 * El listener usa { passive: true } para no bloquear el scroll del
 * navegador, lo que mejora el rendimiento en dispositivos lentos.
 */
function initHeroParallax() {
  const shoe  = document.querySelector('.hero-shoe'); /* Imagen del producto */
  const blob1 = document.querySelector('.blob1');     /* Mancha verde grande */
  const blob2 = document.querySelector('.blob2');     /* Mancha cyan pequeña */

  /* Salir si alguno de los elementos no existe en la página */
  if (!shoe) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY; /* Pixels desplazados desde el top */

    /* Solo aplicar el efecto mientras el hero es visible */
    if (y < window.innerHeight) {
      /* La imagen mantiene su rotación de -8deg del CSS original */
      shoe.style.transform  = `rotate(-8deg) translateY(${y * -0.06}px)`;
      /* Los blobs se mueven en diferentes direcciones para crear dinamismo */
      blob1.style.transform = `translate(${y * 0.03}px, ${y * -0.05}px)`;
      blob2.style.transform = `translate(${y * -0.02}px, ${y * 0.03}px)`;
    }
  }, { passive: true });
}


/* ══════════════════════════════════════════════════════════════════════
   18. SCROLL SPY (LINK ACTIVO EN NAVBAR)
   ──────────────────────────────────────────────────────────────────────
   Responsable: Kaleb
   Resalta automáticamente el link del navbar que corresponde a la
   sección que el usuario está viendo en ese momento. Mejora la
   orientación del usuario dentro del sitio.
══════════════════════════════════════════════════════════════════════ */

/**
 * initScrollSpy()
 * ───────────────
 * Observa todas las secciones de la página y aplica la clase
 * 'active-link' al link del navbar que corresponde a la sección
 * actualmente visible.
 *
 * Funciona con IntersectionObserver con threshold 0.35, lo que
 * significa que una sección se considera "activa" cuando al menos
 * el 35% de ella es visible en pantalla.
 *
 * La clase 'active-link' está definida en styles.css y cambia el
 * color del link a --accent para indicar la posición actual.
 */
function initScrollSpy() {
  /* Seleccionar todas las secciones que tienen un id */
  const sections = $$('section[id], div[id="hero"]');
  const links    = $$('.nav-link');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        /* Quitar 'active-link' de todos los links */
        links.forEach(l => l.classList.remove('active-link'));

        /* Buscar el link cuyo href coincide con el id de la sección visible */
        const link = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (link) link.classList.add('active-link');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => obs.observe(s));
}


/* ══════════════════════════════════════════════════════════════════════
   19. INICIALIZACIÓN — DOMContentLoaded
   ──────────────────────────────────────────────────────────────────────
   Este evento se dispara cuando el navegador termina de parsear todo
   el HTML pero antes de cargar imágenes y otros recursos externos.
   Es el momento correcto para inicializar todos los módulos de JS,
   ya que el DOM ya está disponible pero no hemos esperado innecesariamente.

   El orden de llamada importa:
   - renderProducts y renderCart primero (la UI principal necesita datos).
   - initNavbar antes que los observers (el navbar debe estar listo).
   - Los observers y animaciones al final (dependen de que el DOM esté completo).
══════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  renderProducts('all');   /* Pintar las 12 tarjetas de productos */
  renderCart();            /* Inicializar el carrito (vacío al cargar) */
  initNavbar();            /* Scroll + hamburger + smooth scroll */
  initRevealObserver();    /* Animaciones de entrada por scroll */
  initCounters();          /* Contadores animados del hero */
  initFilters();           /* Filtros de categoría + clic en cat-cards */
  initProductsGrid();      /* Delegación de eventos en tarjetas de producto */
  initCartEvents();        /* Todos los eventos del carrito y modal */
  initContactForm();       /* Formulario con envío real a Formspree */
  initNewsletter();        /* Suscripción al newsletter del footer */
  initCustomCursor();      /* Cursor personalizado (solo en desktop) */
  initHeroParallax();      /* Efecto parallax en el hero */
  initScrollSpy();         /* Link activo en navbar según sección visible */

  /* Mensaje de confirmación en consola para verificar que la app cargó OK.
     %c aplica estilos CSS al texto del console.log. */
  console.log('%c⚡ FYKA SPORT cargado ', 'background:#c8f000;color:#000;font-weight:bold;padding:4px 8px;border-radius:4px;');
});