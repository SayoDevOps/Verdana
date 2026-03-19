/* ============================================
   VERDANA — main.js
   Shared logic across all pages
   ============================================ */

/* ── PRODUCT DATABASE ── */
window.PRODUCTS = [
  {
    id: 1,
    name: 'Monstera Albo',
    scientific: 'Monstera deliciosa var. albo',
    price: 185,
    category: 'rare',
    tag: 'Rare',
    rating: 4.9,
    reviews: 124,
    img: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&q=80',
    stock: 3,
    desc: 'One of the most sought-after variegated aroids. Each leaf is a unique canvas of cream and deep green — no two plants are alike.'
  },
  {
    id: 2,
    name: 'Pink Princess Philodendron',
    scientific: 'Philodendron erubescens',
    price: 95,
    category: 'tropical',
    tag: 'Popular',
    rating: 4.8,
    reviews: 89,
    img: 'https://images.unsplash.com/photo-1603912699214-92627f304eb6?w=800&q=80',
    stock: 8,
    desc: 'Stunning deep burgundy leaves splashed with bubblegum pink variegation. A true collector\'s gem that turns heads in any room.'
  },
  {
    id: 3,
    name: 'Alocasia Zebrina',
    scientific: 'Alocasia zebrina',
    price: 65,
    category: 'tropical',
    tag: 'New',
    rating: 4.7,
    reviews: 56,
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    stock: 12,
    desc: 'Distinctive zebra-striped petioles and glossy arrow-shaped leaves make this tropical an unmistakable statement piece.'
  },
  {
    id: 4,
    name: 'Hoya Kerrii Variegata',
    scientific: 'Hoya kerrii',
    price: 45,
    category: 'succulents',
    tag: '',
    rating: 4.6,
    reviews: 201,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    stock: 20,
    desc: 'Heart-shaped leaves with cream variegation on a trailing vine. Perfect for gifting or adding charm to any windowsill.'
  },
  {
    id: 5,
    name: 'Anthurium Veitchii',
    scientific: 'Anthurium veitchii',
    price: 220,
    category: 'rare',
    tag: 'Rare',
    rating: 5.0,
    reviews: 34,
    img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80',
    stock: 2,
    desc: 'The King Anthurium. Extraordinarily long, deeply ribbed leaves of remarkable beauty — a true botanical trophy for serious collectors.'
  },
  {
    id: 6,
    name: 'Calathea Orbifolia',
    scientific: 'Calathea orbifolia',
    price: 55,
    category: 'indoor',
    tag: '',
    rating: 4.5,
    reviews: 178,
    img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80',
    stock: 15,
    desc: 'Large, perfectly round leaves with silver brush strokes. Moves gently with the light — alive and responsive to its surroundings.'
  },
  {
    id: 7,
    name: 'Ficus Triangularis',
    scientific: 'Ficus triangularis variegata',
    price: 75,
    category: 'indoor',
    tag: 'New',
    rating: 4.7,
    reviews: 42,
    img: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=800&q=80',
    stock: 7,
    desc: 'Triangular variegated leaves on graceful branching stems. Architectural, elegant, and surprisingly easy to care for.'
  },
  {
    id: 8,
    name: 'Pitcher Plant',
    scientific: 'Nepenthes x ventrata',
    price: 48,
    category: 'rare',
    tag: '',
    rating: 4.6,
    reviews: 67,
    img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80',
    stock: 9,
    desc: 'A carnivorous wonder. Dangling pitchers that catch insects — fascinating to watch and surprisingly easy to grow indoors.'
  }
];

/* ── RENDER PRODUCT CARD ── */
window.renderProductCard = function(p) {
  const tagHtml = p.tag
    ? `<span class="product-tag ${p.tag === 'Rare' ? 'rare' : p.tag === 'New' ? 'new' : ''}">${p.tag}</span>`
    : '';
  const stars = '★'.repeat(Math.floor(p.rating));

  return `
    <div class="product-card reveal" onclick="window.location='product.html?id=${p.id}'">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${tagHtml}
        <div class="product-overlay">
          <button
            class="btn btn-sage"
            onclick="event.stopPropagation(); addToCart(${p.id})"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div class="product-name">${p.name}</div>
      <div class="product-scientific">${p.scientific}</div>
      <div class="product-footer">
        <div class="product-price">$${p.price}</div>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          (${p.reviews})
        </div>
      </div>
    </div>
  `;
};

/* ── NAVBAR SCROLL ── */
window.addEventListener('scroll', function() {
  var nav = document.getElementById('navbar');
  if (nav) {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
});

/* ── MOBILE MENU ── */
window.toggleMenu = function() {
  var ham  = document.getElementById('hamburger');
  var menu = document.getElementById('mobile-menu');
  if (!ham || !menu) return;
  ham.classList.toggle('open');
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
};

/* ── SCROLL REVEAL ── */
document.addEventListener('DOMContentLoaded', function() {
  if ('IntersectionObserver' in window) {
    document.body.classList.add('js-ready');

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function(el) {
      observer.observe(el);
    });

    // Fallback — force all visible after 2s
    setTimeout(function() {
      document.querySelectorAll('.reveal').forEach(function(el) {
        el.classList.add('visible');
      });
    }, 2000);
  }
});