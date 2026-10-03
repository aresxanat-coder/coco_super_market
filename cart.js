/* ==========================================================================
   COCO MART — Cart
   Cart is stored in localStorage as { [productId]: quantity }.
   ========================================================================== */

const CART_KEY = "cocomart_cart";
const DELIVERY_CHARGE = 25;
const FREE_DELIVERY_THRESHOLD = 499;

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(id, qty = 1) {
  const cart = readCart();
  cart[id] = (cart[id] || 0) + qty;
  writeCart(cart);
  showToast(`${getProductById(id)?.name || "Item"} added to cart`);
}

function setCartQty(id, qty) {
  const cart = readCart();
  if (qty <= 0) {
    delete cart[id];
  } else {
    cart[id] = qty;
  }
  writeCart(cart);
}

function removeFromCart(id) {
  const cart = readCart();
  delete cart[id];
  writeCart(cart);
  renderCartPage();
}

function clearCart() {
  writeCart({});
}

function cartCount() {
  const cart = readCart();
  return Object.values(cart).reduce((sum, q) => sum + q, 0);
}

function cartLines() {
  const cart = readCart();
  return Object.entries(cart)
    .map(([id, qty]) => ({ product: getProductById(id), qty }))
    .filter((l) => l.product);
}

function cartTotals() {
  const lines = cartLines();
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const mrpTotal = lines.reduce((s, l) => s + l.product.mrp * l.qty, 0);
  const discount = Math.max(0, mrpTotal - subtotal);
  const delivery = lines.length === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const grandTotal = subtotal + delivery;
  return { subtotal, discount, delivery, grandTotal, mrpTotal };
}

function updateCartBadge() {
  document.querySelectorAll("[data-cart-badge]").forEach((el) => {
    const count = cartCount();
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

/* ---------------- Cart page rendering ---------------- */

function renderCartPage() {
  const wrap = document.getElementById("cart-content");
  if (!wrap) return;
  const lines = cartLines();

  if (!lines.length) {
    wrap.innerHTML = `
      <div class="cart-empty">
        <div class="emoji">🛒</div>
        <h3>Your cart is empty</h3>
        <p style="color:var(--charcoal-60);margin:10px 0 22px;">Looks like you haven't added anything yet.</p>
        <a href="shop.html" class="btn btn-primary">Start Shopping</a>
      </div>`;
    return;
  }

  const rows = lines
    .map(
      ({ product, qty }) => `
    <tr data-id="${product.id}">
      <td>
        <div class="cart-product">
          <div class="cart-thumb">${product.emoji}</div>
          <div>
            <div class="cart-name">${product.name}</div>
            <div class="cart-pack">${product.brand} · ${product.pack}</div>
            <a class="remove-link" data-action="cart-remove" data-id="${product.id}" href="#">Remove</a>
          </div>
        </div>
      </td>
      <td>
        <div class="qty-stepper">
          <button data-action="cart-dec" data-id="${product.id}" aria-label="Decrease quantity">−</button>
          <span>${qty}</span>
          <button data-action="cart-inc" data-id="${product.id}" aria-label="Increase quantity">+</button>
        </div>
      </td>
      <td>${formatINR(product.price)}</td>
      <td><strong>${formatINR(product.price * qty)}</strong></td>
    </tr>`
    )
    .join("");

  const totals = cartTotals();

  wrap.innerHTML = `
    <div class="cart-layout">
      <div>
        <table class="cart-table">
          <thead>
            <tr><th>Product</th><th>Quantity</th><th>Price</th><th>Subtotal</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <div style="display:flex;justify-content:space-between;margin-top:20px;flex-wrap:wrap;gap:12px;">
          <a href="shop.html" class="btn btn-outline">Continue Shopping</a>
          <button class="btn btn-whatsapp" data-action="whatsapp-cart">${icon("whatsapp")} Order Entire Cart on WhatsApp</button>
        </div>
      </div>
      <div class="summary-card">
        <h3>Order Summary</h3>
        <div class="summary-row"><span>Subtotal (${cartCount()} items)</span><span>${formatINR(totals.subtotal)}</span></div>
        <div class="summary-row"><span>Product Discount</span><span>−${formatINR(totals.discount)}</span></div>
        <div class="summary-row"><span>Delivery</span><span>${totals.delivery === 0 ? "FREE" : formatINR(totals.delivery)}</span></div>
        <div class="summary-row total"><span>Grand Total</span><span>${formatINR(totals.grandTotal)}</span></div>
        <div class="summary-actions">
          <a href="checkout.html" class="btn btn-primary btn-block">Proceed to Checkout</a>
        </div>
        ${totals.delivery > 0 ? `<p style="font-size:0.78rem;color:var(--charcoal-60);margin-top:12px;">Add items worth ${formatINR(FREE_DELIVERY_THRESHOLD - totals.subtotal)} more for free delivery.</p>` : ""}
      </div>
    </div>`;
}

/* ---------------- Checkout page rendering ---------------- */

function renderCheckoutSummary() {
  const wrap = document.getElementById("checkout-summary");
  if (!wrap) return;
  const lines = cartLines();
  const totals = cartTotals();

  if (!lines.length) {
    wrap.innerHTML = `<p style="color:var(--charcoal-60);">Your cart is empty. <a href="shop.html" style="color:var(--green-700);font-weight:700;">Go shopping</a></p>`;
    const placeBtn = document.getElementById("place-order-btn");
    if (placeBtn) placeBtn.setAttribute("disabled", "true");
    return;
  }

  const items = lines
    .map(
      ({ product, qty }) => `
      <div class="summary-row"><span>${product.name} × ${qty}</span><span>${formatINR(product.price * qty)}</span></div>`
    )
    .join("");

  wrap.innerHTML = `
    ${items}
    <div class="summary-row"><span>Delivery</span><span>${totals.delivery === 0 ? "FREE" : formatINR(totals.delivery)}</span></div>
    <div class="summary-row total"><span>Grand Total</span><span>${formatINR(totals.grandTotal)}</span></div>
  `;
}

/* Wires up +/- and remove buttons on the cart page via event delegation. */
function bindCartEvents() {
  document.addEventListener("click", (e) => {
    const inc = e.target.closest("[data-action='cart-inc']");
    const dec = e.target.closest("[data-action='cart-dec']");
    const rem = e.target.closest("[data-action='cart-remove']");
    if (inc) {
      const cart = readCart();
      const id = inc.dataset.id;
      setCartQty(id, (cart[id] || 0) + 1);
      renderCartPage();
    }
    if (dec) {
      const cart = readCart();
      const id = dec.dataset.id;
      setCartQty(id, (cart[id] || 0) - 1);
      renderCartPage();
    }
    if (rem) {
      e.preventDefault();
      removeFromCart(rem.dataset.id);
    }
  });
}
