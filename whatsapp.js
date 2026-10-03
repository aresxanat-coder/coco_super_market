/* ==========================================================================
   COCO MART — WhatsApp ordering
   ========================================================================== */

const WHATSAPP_NUMBER = "919350213389";

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}

/** Order message for a single product (used on product cards / product page). */
function whatsappMessageForProduct(product, qty = 1) {
  const lines = [
    "Hello Coco Mart 👋",
    "",
    "I would like to place an order.",
    "",
    "Products:",
    `1. ${product.name} (${product.pack}) x ${qty} — ${formatINR(product.price * qty)}`,
    "",
    `Total: ${formatINR(product.price * qty)}`,
    "",
    "Please confirm my order.",
  ];
  return lines.join("\n");
}

/** Order message for the whole cart. */
function whatsappMessageForCart() {
  const lines = cartLines();
  const totals = cartTotals();
  const productLines = lines.map(
    ({ product, qty }, i) => `${i + 1}. ${product.name} (${product.pack}) x ${qty} — ${formatINR(product.price * qty)}`
  );
  const msg = [
    "Hello Coco Mart 👋",
    "",
    "I would like to place an order.",
    "",
    "Products:",
    ...productLines,
    "",
    `Subtotal: ${formatINR(totals.subtotal)}`,
    `Delivery: ${totals.delivery === 0 ? "FREE" : formatINR(totals.delivery)}`,
    `Total: ${formatINR(totals.grandTotal)}`,
    "",
    "Please confirm my order.",
  ];
  return msg.join("\n");
}

/** Full checkout order message including customer + delivery details. */
function whatsappMessageForCheckout(customer) {
  const lines = cartLines();
  const totals = cartTotals();
  const productLines = lines.map(
    ({ product, qty }, i) => `${i + 1}. ${product.name} (${product.pack}) x ${qty} — ${formatINR(product.price * qty)}`
  );
  const msg = [
    "Hello Coco Mart 👋",
    "",
    "I would like to place an order.",
    "",
    "Customer:",
    customer.name,
    customer.phone,
    "",
    "Products:",
    ...productLines,
    "",
    `Subtotal: ${formatINR(totals.subtotal)}`,
    `Delivery: ${totals.delivery === 0 ? "FREE" : formatINR(totals.delivery)}`,
    `Total: ${formatINR(totals.grandTotal)}`,
    "",
    `Delivery/Pickup: ${customer.mode}`,
    "",
    "Delivery Address:",
    customer.mode === "Delivery" ? `${customer.address}, ${customer.landmark ? customer.landmark + ", " : ""}${customer.pincode}` : "N/A — Store Pickup",
    "",
    "Please confirm my order.",
  ];
  return msg.join("\n");
}

function orderSingleProductOnWhatsApp(id, qty = 1) {
  const product = getProductById(id);
  if (!product) return;
  openWhatsApp(whatsappMessageForProduct(product, qty));
}

function orderCartOnWhatsApp() {
  if (!cartLines().length) {
    showToast("Your cart is empty", true);
    return;
  }
  openWhatsApp(whatsappMessageForCart());
}
