/* ==========================================================================
   COCO MART — Main site script
   Handles: mobile nav, sticky header search, toasts, global add-to-cart /
   buy-now / whatsapp-order button delegation, and page-specific renders.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  bindMobileNav();
  bindHeaderSearch();
  bindGlobalProductActions();
  bindCartEvents();
  highlightActiveNav();

  // Page-specific initialisation (each function no-ops if its elements aren't present)
  initHomePage();
  initShopPage();
  initProductPage();
  initCartPage();
  initCheckoutPage();
});

/* ---------------- Toasts ---------------- */

function showToast(message, isError = false) {
  let stack = document.querySelector(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    document.body.appendChild(stack);
  }
  const toast = document.createElement("div");
  toast.className = "toast" + (isError ? " error" : "");
  toast.textContent = message;
  stack.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

/* ---------------- Mobile nav ---------------- */

function bindMobileNav() {
  const openBtn = document.querySelector("[data-open-nav]");
  const nav = document.querySelector(".mobile-nav");
  const closeBtn = document.querySelector("[data-close-nav]");
  if (!openBtn || !nav) return;
  openBtn.addEventListener("click", () => nav.classList.add("open"));
  closeBtn?.addEventListener("click", () => nav.classList.remove("open"));
  nav.addEventListener("click", (e) => {
    if (e.target === nav) nav.classList.remove("open");
  });
}

/* ---------------- Header search ---------------- */

function bindHeaderSearch() {
  document.querySelectorAll("[data-header-search]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");
      const q = input.value.trim();
      window.location.href = q ? `shop.html?search=${encodeURIComponent(q)}` : "shop.html";
    });
  });
}

/* ---------------- Active nav highlight ---------------- */

function highlightActiveNav() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a, .mobile-nav-panel a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
}

/* ---------------- Global add-to-cart / buy-now / whatsapp-order ---------------- */

function bindGlobalProductActions() {
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-action='add-to-cart']");
    const buyBtn = e.target.closest("[data-action='buy-now']");
    const waBtn = e.target.closest("[data-action='whatsapp-product']");
    const waCartBtn = e.target.closest("[data-action='whatsapp-cart']");

    if (addBtn) {
      addToCart(addBtn.dataset.id, getSelectedQty(addBtn.dataset.id));
    }
    if (buyBtn) {
      addToCart(buyBtn.dataset.id, getSelectedQty(buyBtn.dataset.id));
      window.location.href = "cart.html";
    }
    if (waBtn) {
      orderSingleProductOnWhatsApp(waBtn.dataset.id, getSelectedQty(waBtn.dataset.id));
    }
    if (waCartBtn) {
      orderCartOnWhatsApp();
    }
  });
}

/** On the product detail page there's a quantity stepper; elsewhere default qty is 1. */
function getSelectedQty(id) {
  const qtyEl = document.querySelector(`[data-qty-value][data-id="${id}"]`);
  return qtyEl ? parseInt(qtyEl.textContent, 10) || 1 : 1;
}

/* ==========================================================================
   Home page
   ========================================================================== */

function initHomePage() {
  const catGrid = document.getElementById("home-category-grid");
  const featuredGrid = document.getElementById("home-featured-grid");
  const dealsGrid = document.getElementById("home-deals-grid");
  if (!catGrid && !featuredGrid && !dealsGrid) return;

  renderCategoryGrid(catGrid);
  if (featuredGrid) renderProductGrid(featuredGrid, PRODUCTS.slice(0, 8));
  if (dealsGrid) {
    const deals = [...PRODUCTS].sort((a, b) => discountPct(b) - discountPct(a)).slice(0, 4);
    renderProductGrid(dealsGrid, deals);
  }
}

/* ==========================================================================
   Shop page
   ========================================================================== */

function initShopPage() {
  const grid = document.getElementById("shop-grid");
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const state = {
    search: params.get("search") || "",
    categories: params.get("category") ? [params.get("category")] : [],
    brands: [],
    maxPrice: 700,
    minDiscount: 0,
    minRating: 0,
    sort: "popularity",
  };

  const searchInput = document.getElementById("shop-search-input");
  const catBoxes = document.querySelectorAll("[data-filter-category]");
  const brandBoxes = document.querySelectorAll("[data-filter-brand]");
  const priceRange = document.getElementById("filter-price-range");
  const priceValue = document.getElementById("filter-price-value");
  const discountBoxes = document.querySelectorAll("[data-filter-discount]");
  const ratingBoxes = document.querySelectorAll("[data-filter-rating]");
  const sortSelect = document.getElementById("shop-sort");
  const resultCount = document.getElementById("shop-result-count");

  // Populate brand filter list dynamically from product data
  const brandFilterGroup = document.getElementById("brand-filter-list");
  if (brandFilterGroup) {
    const brands = [...new Set(PRODUCTS.map((p) => p.brand))].sort();
    brandFilterGroup.innerHTML = brands
      .map(
        (b) => `<label class="filter-option"><input type="checkbox" data-filter-brand value="${b}"> ${b}</label>`
      )
      .join("");
  }

  if (searchInput) searchInput.value = state.search;
  if (state.categories.length) {
    document.querySelectorAll(`[data-filter-category][value="${state.categories[0]}"]`).forEach((b) => (b.checked = true));
  }

  function readFilters() {
    state.search = (searchInput?.value || "").trim().toLowerCase();
    state.categories = [...document.querySelectorAll("[data-filter-category]:checked")].map((b) => b.value);
    state.brands = [...document.querySelectorAll("[data-filter-brand]:checked")].map((b) => b.value);
    state.maxPrice = priceRange ? parseInt(priceRange.value, 10) : 700;
    const discBox = [...discountBoxes].find((b) => b.checked);
    state.minDiscount = discBox ? parseInt(discBox.value, 10) : 0;
    const ratingBox = [...ratingBoxes].find((b) => b.checked);
    state.minRating = ratingBox ? parseFloat(ratingBox.value) : 0;
    state.sort = sortSelect ? sortSelect.value : "popularity";
  }

  function applyFilters() {
    readFilters();
    if (priceValue && priceRange) priceValue.textContent = formatINR(priceRange.value);

    let list = PRODUCTS.filter((p) => {
      if (state.search && !(p.name.toLowerCase().includes(state.search) || p.brand.toLowerCase().includes(state.search))) return false;
      if (state.categories.length && !state.categories.includes(p.category)) return false;
      if (state.brands.length && !state.brands.includes(p.brand)) return false;
      if (p.price > state.maxPrice) return false;
      if (discountPct(p) < state.minDiscount) return false;
      if (p.rating < state.minRating) return false;
      return true;
    });

    if (state.sort === "price-low") list.sort((a, b) => a.price - b.price);
    else if (state.sort === "price-high") list.sort((a, b) => b.price - a.price);
    else if (state.sort === "newest") list = [...list].reverse();
    else list.sort((a, b) => b.reviewCount - a.reviewCount);

    renderProductGrid(grid, list);
    if (resultCount) resultCount.textContent = `${list.length} product${list.length === 1 ? "" : "s"} found`;
  }

  [searchInput, priceRange, sortSelect].forEach((el) => el?.addEventListener("input", applyFilters));
  document.getElementById("shop-filters-form")?.addEventListener("change", applyFilters);
  document.getElementById("shop-search-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    applyFilters();
  });
  document.getElementById("clear-filters")?.addEventListener("click", () => {
    document.querySelectorAll("[data-filter-category], [data-filter-brand], [data-filter-discount], [data-filter-rating]").forEach((b) => (b.checked = false));
    if (searchInput) searchInput.value = "";
    if (priceRange) priceRange.value = 700;
    applyFilters();
  });

  applyFilters();
}

/* ==========================================================================
   Product detail page
   ========================================================================== */

function initProductPage() {
  const wrap = document.getElementById("pd-content");
  if (!wrap) return;

  const params = new URLSearchParams(window.location.search);
  const product = getProductById(params.get("id")) || PRODUCTS[0];
  const disc = discountPct(product);

  document.title = `${product.name} — Coco Mart`;

  wrap.innerHTML = `
    <div class="pd-grid">
      <div class="pd-image">${product.emoji}</div>
      <div>
        <span class="pd-brand">${product.brand}</span>
        <h1 class="pd-name">${product.name}</h1>
        <div class="product-rating"><span class="stars">${starString(product.rating)}</span> ${product.rating} (${product.reviewCount} reviews)</div>
        <div class="pd-price-row">
          <span class="price-now">${formatINR(product.price)}</span>
          ${disc > 0 ? `<span class="price-mrp">${formatINR(product.mrp)}</span><span class="discount-badge" style="position:static;">${disc}% OFF</span>` : ""}
        </div>
        <p class="pd-desc">${product.desc}</p>
        <div class="pd-qty-row">
          <span style="font-weight:700;font-size:0.86rem;">Quantity</span>
          <div class="qty-stepper">
            <button data-action="pd-qty-dec">−</button>
            <span data-qty-value data-id="${product.id}">1</span>
            <button data-action="pd-qty-inc">+</button>
          </div>
          <span style="font-size:0.8rem;color:var(--charcoal-60);">${product.pack} pack</span>
        </div>
        <div class="pd-actions">
          <button class="btn btn-primary" data-action="add-to-cart" data-id="${product.id}">${icon("cart")} Add to Cart</button>
          <button class="btn btn-outline" data-action="buy-now" data-id="${product.id}">Buy Now</button>
          <button class="btn btn-whatsapp" data-action="whatsapp-product" data-id="${product.id}">${icon("whatsapp")} Order via WhatsApp</button>
        </div>
        <div class="pd-meta">
          <span>🚚 Local delivery available</span>
          <span>↩️ Easy replacement</span>
          <span>✅ Quality checked</span>
        </div>
      </div>
    </div>

    <div class="section" style="padding-bottom:0;">
      <div class="leaf-rule">✦</div>
      <h2 style="margin-bottom:18px;">Customer Reviews</h2>
      <div class="reviews-list">
        ${sampleReviews(product).join("")}
      </div>
    </div>

    <div class="section">
      <div class="section-head"><div><span class="eyebrow">You may also like</span><h2>Related Products</h2></div></div>
      <div class="product-grid" id="pd-related"></div>
    </div>
  `;

  renderProductGrid(document.getElementById("pd-related"), PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4));

  document.addEventListener("click", (e) => {
    const inc = e.target.closest("[data-action='pd-qty-inc']");
    const dec = e.target.closest("[data-action='pd-qty-dec']");
    const qtyEl = document.querySelector(`[data-qty-value][data-id="${product.id}"]`);
    if (!qtyEl) return;
    if (inc) qtyEl.textContent = parseInt(qtyEl.textContent, 10) + 1;
    if (dec) qtyEl.textContent = Math.max(1, parseInt(qtyEl.textContent, 10) - 1);
  });
}

function sampleReviews(product) {
  const names = ["Priya S.", "Karthik R.", "Meena V."];
  const comments = [
    `Good quality ${product.name.toLowerCase()}, exactly as described and delivered quickly.`,
    `Been buying this from Coco Mart for months now — consistent quality every time.`,
    `Nicely packed and fresh. Will order again from Coco Mart.`,
  ];
  return names.map(
    (n, i) => `
    <div class="review-item">
      <div class="stars">${starString(4 + (i % 2))}</div>
      <strong>${n}</strong>
      <p>${comments[i]}</p>
    </div>`
  );
}

/* ==========================================================================
   Cart page
   ========================================================================== */

function initCartPage() {
  if (!document.getElementById("cart-content")) return;
  renderCartPage();
}

/* ==========================================================================
   Checkout page
   ========================================================================== */

function initCheckoutPage() {
  const form = document.getElementById("checkout-form");
  if (!form) return;

  renderCheckoutSummary();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!cartLines().length) {
      showToast("Your cart is empty", true);
      return;
    }

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const address = form.address.value.trim();
    const mode = form.querySelector("input[name='mode']:checked")?.value || "Delivery";

    let valid = true;
    toggleFieldError(form.name, !name);
    toggleFieldError(form.phone, !/^[0-9]{10}$/.test(phone));
    if (!name) valid = false;
    if (!/^[0-9]{10}$/.test(phone)) valid = false;
    if (mode === "Delivery") {
      toggleFieldError(form.address, !address);
      if (!address) valid = false;
    }
    if (!valid) {
      showToast("Please fill in the required fields", true);
      return;
    }

    const customer = {
      name,
      phone,
      address,
      landmark: form.landmark.value.trim(),
      pincode: form.pincode.value.trim(),
      mode,
    };

    openWhatsApp(whatsappMessageForCheckout(customer));
    showToast("Order sent on WhatsApp — please confirm there!");
  });

  form.querySelectorAll("input[name='mode']").forEach((radio) => {
    radio.addEventListener("change", () => {
      const addressFields = document.getElementById("delivery-address-fields");
      if (addressFields) addressFields.style.display = radio.value === "Delivery" && radio.checked ? "block" : "none";
    });
  });
}

function toggleFieldError(input, hasError) {
  if (!input) return;
  input.style.borderColor = hasError ? "var(--rust)" : "";
}
