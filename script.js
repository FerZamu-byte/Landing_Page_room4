'use strict'; // Fuerza modo estricto para evitar errores silenciosos en JS

/* ─────────────────────────────────────────────────────
   DATA LAYER — Catálogo de productos
   Fuente de verdad (single source of truth) del frontend
   Cada objeto representa un producto renderizable
───────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,                 // Identificador único (clave primaria lógica)
    cat: 'running',        // Categoría (usada en filtros)
    name: 'Tenis Ultra Boost X',  // Nombre del producto
    price: 2499,           // Precio actual
    oldPrice: 3199,        // Precio anterior (para mostrar descuento)
    badge: 'sale',         // Badge visual (sale | new | top)
    stars: 4.8,            // Rating promedio
    reviews: 124,          // Número de reseñas
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop'
  },

  // ... resto de productos (misma estructura)

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