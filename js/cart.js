/* ============================================
   VERDANA — cart.js
   Shopping cart with localStorage
   ============================================ */

var cart = JSON.parse(localStorage.getItem('verdana-cart') || '[]');

/* ── SAVE CART ── */
function saveCart() {
  localStorage.setItem('verdana-cart', JSON.stringify(cart));
}

/* ── ADD TO CART ── */
window.addToCart = function(productId) {
  var product = window.PRODUCTS.find(function(p) { return p.id === productId; });
  if (!product) return;

  var existing = cart.find(function(i) { return i.id === productId; });
  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      id:    product.id,
      name:  product.name,
      price: product.price,
      img:   product.img,
      qty:   1
    });
  }

  saveCart();
  updateCartUI();
  openCart();
};

/* ── REMOVE FROM CART ── */
window.removeFromCart = function(productId) {
  cart = cart.filter(function(i) { return i.id !== productId; });
  saveCart();
  updateCartUI();
};

/* ── UPDATE QUANTITY ── */
window.updateQty = function(productId, delta) {
  var item = cart.find(function(i) { return i.id === productId; });
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
};

/* ── TOGGLE CART ── */
window.toggleCart = function() {
  var sidebar = document.getElementById('cart-sidebar');
  var overlay = document.getElementById('cart-overlay');
  if (!sidebar) return;
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
  document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
};

/* ── OPEN CART ── */
function openCart() {
  var sidebar = document.getElementById('cart-sidebar');
  var overlay = document.getElementById('cart-overlay');
  if (sidebar && !sidebar.classList.contains('open')) {
    sidebar.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

/* ── UPDATE CART UI ── */
function updateCartUI() {
  var countEl  = document.getElementById('cart-count');
  var itemsEl  = document.getElementById('cart-items');
  var totalEl  = document.getElementById('cart-total');
  var footerEl = document.getElementById('cart-footer');

  var totalQty   = cart.reduce(function(s, i) { return s + i.qty; }, 0);
  var totalPrice = cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);

  if (countEl) {
    countEl.textContent = totalQty;
    if (totalQty > 0) {
      countEl.classList.add('visible');
    } else {
      countEl.classList.remove('visible');
    }
  }

  if (totalEl) {
    totalEl.textContent = '$' + totalPrice.toFixed(2);
  }

  if (footerEl) {
    footerEl.style.display = cart.length > 0 ? 'block' : 'none';
  }

  if (itemsEl) {
    if (cart.length === 0) {
      itemsEl.innerHTML = `
        <div class="cart-empty">
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2">
            <path d="M12 4L9 12v28a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4V12l-3-8z"/>
            <line x1="9" y1="12" x2="39" y2="12"/>
            <path d="M30 20a6 6 0 0 1-12 0"/>
          </svg>
          <p>Your cart is empty</p>
        </div>
      `;
    } else {
      itemsEl.innerHTML = cart.map(function(item) {
        return `
          <div class="cart-item">
            <img src="${item.img}" alt="${item.name}" class="cart-item-img" />
            <div>
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
              <div class="cart-item-qty">
                <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
                <span class="qty-num">${item.qty}</span>
                <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
              </div>
            </div>
            <button class="cart-remove" onclick="removeFromCart(${item.id})">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        `;
      }).join('');
    }
  }
}

/* ── INIT ON LOAD ── */
document.addEventListener('DOMContentLoaded', function() {
  updateCartUI();
});