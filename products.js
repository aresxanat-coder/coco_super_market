/* ==========================================================================
   COCO MART — Product data
   Prices are plain numbers (INR) so they can be edited easily in one place.
   ========================================================================== */

const CATEGORIES = [
  { id: "fruits-vegetables", name: "Fruits & Vegetables", emoji: "🥦" },
  { id: "rice-grains", name: "Rice & Grains", emoji: "🌾" },
  { id: "dals-pulses", name: "Dals & Pulses", emoji: "🫘" },
  { id: "oil-ghee", name: "Oil & Ghee", emoji: "🫙" },
  { id: "spices-masala", name: "Spices & Masala", emoji: "🌶️" },
  { id: "snacks", name: "Snacks", emoji: "🍪" },
  { id: "beverages", name: "Beverages", emoji: "🧃" },
  { id: "dairy-milk", name: "Dairy & Milk", emoji: "🥛" },
  { id: "bakery", name: "Bakery", emoji: "🍞" },
  { id: "personal-care", name: "Personal Care", emoji: "🧴" },
  { id: "home-care", name: "Home Care", emoji: "🧼" },
  { id: "baby-care", name: "Baby Care", emoji: "🍼" },
  { id: "household-essentials", name: "Household Essentials", emoji: "🧺" },
];

const PRODUCTS = [
  { id: "atta-aashirvaad-5kg", name: "Aashirvaad Atta", brand: "Aashirvaad", category: "rice-grains", pack: "5 kg", mrp: 315, price: 279, rating: 4.6, reviewCount: 812, emoji: "🌾", desc: "Whole wheat atta milled from carefully selected wheat for soft, fluffy rotis every day." },
  { id: "rice-indiagate-basmati-5kg", name: "India Gate Basmati Rice", brand: "India Gate", category: "rice-grains", pack: "5 kg", mrp: 699, price: 599, rating: 4.7, reviewCount: 540, emoji: "🍚", desc: "Aged long-grain basmati rice with a naturally rich aroma, perfect for biryani and pulao." },
  { id: "salt-tata-1kg", name: "Tata Salt", brand: "Tata", category: "spices-masala", pack: "1 kg", mrp: 28, price: 25, rating: 4.8, reviewCount: 1204, emoji: "🧂", desc: "Iodised vacuum-evaporated salt, India's most trusted everyday kitchen essential." },
  { id: "oil-fortune-sunflower-1l", name: "Fortune Sunflower Oil", brand: "Fortune", category: "oil-ghee", pack: "1 L", mrp: 165, price: 149, rating: 4.5, reviewCount: 398, emoji: "🫗", desc: "Light, refined sunflower oil that's low in saturated fat and ideal for everyday cooking." },
  { id: "milk-aavin-500ml", name: "Aavin Milk", brand: "Aavin", category: "dairy-milk", pack: "500 ml", mrp: 33, price: 33, rating: 4.4, reviewCount: 260, emoji: "🥛", desc: "Fresh, pasteurised toned milk delivered daily, sourced from local Tamil Nadu dairy farms." },
  { id: "biscuits-goodday-britannia", name: "Britannia Good Day Biscuits", brand: "Britannia", category: "snacks", pack: "600 g", mrp: 90, price: 79, rating: 4.6, reviewCount: 675, emoji: "🍪", desc: "Rich, buttery cashew cookies — the classic teatime favourite in every Coco Mart basket." },
  { id: "tea-tata-500g", name: "Tata Tea Gold", brand: "Tata", category: "beverages", pack: "500 g", mrp: 265, price: 235, rating: 4.6, reviewCount: 512, emoji: "🍵", desc: "A rich, aromatic blend of long leaf and fine tea for a strong, flavourful cup." },
  { id: "surf-excel-2kg", name: "Surf Excel Detergent", brand: "Surf Excel", category: "home-care", pack: "2 kg", mrp: 420, price: 369, rating: 4.5, reviewCount: 331, emoji: "🧼", desc: "Advanced stain-removal detergent powder that's gentle on fabric, tough on stains." },
  { id: "colgate-toothpaste-200g", name: "Colgate Strong Teeth", brand: "Colgate", category: "personal-care", pack: "200 g", mrp: 115, price: 99, rating: 4.7, reviewCount: 890, emoji: "🦷", desc: "Calcium-boost toothpaste that strengthens teeth and freshens breath, twice daily." },
  { id: "coconut-oil-500ml", name: "Coco Mart Coconut Oil", brand: "Coco Mart", category: "oil-ghee", pack: "500 ml", mrp: 175, price: 155, rating: 4.8, reviewCount: 421, emoji: "🥥", desc: "Pure, cold-pressed coconut oil — a Coimbatore favourite for cooking and hair care alike." },
  { id: "banana-fresh-1kg", name: "Fresh Bananas", brand: "Coco Mart Farm Fresh", category: "fruits-vegetables", pack: "1 kg", mrp: 60, price: 49, rating: 4.5, reviewCount: 190, emoji: "🍌", desc: "Naturally ripened bananas, hand-picked every morning for the best sweetness." },
  { id: "tomato-fresh-1kg", name: "Fresh Tomatoes", brand: "Coco Mart Farm Fresh", category: "fruits-vegetables", pack: "1 kg", mrp: 45, price: 36, rating: 4.3, reviewCount: 142, emoji: "🍅", desc: "Juicy, farm-fresh tomatoes sourced daily from growers around Coimbatore." },
  { id: "toor-dal-1kg", name: "Toor Dal (Arhar)", brand: "Coco Mart Staples", category: "dals-pulses", pack: "1 kg", mrp: 165, price: 149, rating: 4.6, reviewCount: 233, emoji: "🫘", desc: "Premium unpolished toor dal, rich in protein and perfect for everyday sambar." },
  { id: "bread-britannia-400g", name: "Britannia Whole Wheat Bread", brand: "Britannia", category: "bakery", pack: "400 g", mrp: 55, price: 49, rating: 4.4, reviewCount: 178, emoji: "🍞", desc: "Soft, freshly baked whole wheat bread loaf, delivered daily to Coco Mart shelves." },
  { id: "johnson-baby-powder-200g", name: "Johnson's Baby Powder", brand: "Johnson's", category: "baby-care", pack: "200 g", mrp: 145, price: 129, rating: 4.7, reviewCount: 305, emoji: "🍼", desc: "Gentle, dermatologist-tested baby powder that keeps your little one fresh all day." },
  { id: "vim-dishwash-bar", name: "Vim Dishwash Bar", brand: "Vim", category: "household-essentials", pack: "Pack of 3", mrp: 60, price: 54, rating: 4.5, reviewCount: 221, emoji: "🧽", desc: "Lemon-fresh dishwash bars that cut through grease fast, without drying your hands." },
  { id: "lays-chips-classic", name: "Lay's Classic Salted Chips", brand: "Lay's", category: "snacks", pack: "150 g", mrp: 50, price: 45, rating: 4.5, reviewCount: 402, emoji: "🥔", desc: "Crispy, thinly sliced potato chips with the classic salted flavour everyone loves." },
  { id: "real-juice-mixedfruit-1l", name: "Real Mixed Fruit Juice", brand: "Real", category: "beverages", pack: "1 L", mrp: 130, price: 115, rating: 4.4, reviewCount: 168, emoji: "🧃", desc: "No added preservatives, a refreshing blend of real fruit juices for the whole family." },
];

/** Utility: discount percentage for a product. */
function discountPct(p) {
  if (!p.mrp || p.mrp <= p.price) return 0;
  return Math.round(((p.mrp - p.price) / p.mrp) * 100);
}

function starString(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id);
}

function formatINR(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

/** Renders a single product card and returns the HTML string. */
function productCardHTML(p) {
  const disc = discountPct(p);
  return `
  <div class="product-card" data-id="${p.id}">
    <div class="product-thumb">
      ${disc > 0 ? `<span class="discount-badge">${disc}% OFF</span>` : ""}
      <a href="product.html?id=${p.id}" aria-label="${p.name}">${p.emoji}</a>
    </div>
    <div class="product-body">
      <span class="product-brand">${p.brand}</span>
      <h3 class="product-name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <span class="product-pack">${p.pack}</span>
      <div class="product-rating"><span class="stars">${starString(p.rating)}</span> ${p.rating} (${p.reviewCount})</div>
      <div class="product-price-row">
        <span class="price-now">${formatINR(p.price)}</span>
        ${disc > 0 ? `<span class="price-mrp">${formatINR(p.mrp)}</span>` : ""}
      </div>
      <div class="product-actions">
        <div class="actions-row">
          <button class="btn btn-primary btn-sm" data-action="add-to-cart" data-id="${p.id}">Add to Cart</button>
          <button class="btn btn-outline btn-sm" data-action="buy-now" data-id="${p.id}">Buy Now</button>
        </div>
        <button class="btn btn-whatsapp btn-sm btn-block" data-action="whatsapp-product" data-id="${p.id}">
          ${icon("whatsapp")} Order on WhatsApp
        </button>
      </div>
    </div>
  </div>`;
}

function renderProductGrid(container, list) {
  if (!container) return;
  if (!list.length) {
    container.innerHTML = `<div class="empty-state"><h3>No products found</h3><p>Try adjusting your filters or search term.</p></div>`;
    return;
  }
  container.innerHTML = list.map(productCardHTML).join("");
}

function renderCategoryGrid(container) {
  if (!container) return;
  container.innerHTML = CATEGORIES.map(
    (c) => `
    <a class="category-card" href="shop.html?category=${c.id}">
      <div class="category-emoji">${c.emoji}</div>
      <span>${c.name}</span>
    </a>`
  ).join("");
}

/** Small inline SVG icon set, referenced via icon('name'). Keeps markup DRY. */
function icon(name) {
  const icons = {
    whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2Zm0 18.2a8.1 8.1 0 0 1-4.2-1.1l-.3-.2-3 .9.9-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.6.1-.2-.1-1.1-.4-2-1.3-.8-.7-1.3-1.6-1.4-1.8-.2-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.5-.3Z"/></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`,
    user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>`,
    cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h2l2.6 12.3a2 2 0 0 0 2 1.6h8a2 2 0 0 0 2-1.6L21 7H6"/></svg>`,
    menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`,
    pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-7.4 7-12.5A7 7 0 0 0 5 9.5C5 14.6 12 22 12 22Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>`,
  };
  return icons[name] || "";
}
