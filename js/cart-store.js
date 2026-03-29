const KEY = 'sexshiop-cart-v1';

/** @typedef {{ id: string, qty: number }} CartLine */

/**
 * @returns {CartLine[]}
 */
export function loadCart() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data.filter((l) => l && typeof l.id === 'string' && l.qty > 0) : [];
  } catch {
    return [];
  }
}

/** @param {CartLine[]} lines */
export function saveCart(lines) {
  localStorage.setItem(KEY, JSON.stringify(lines));
}

/** @param {string} productId @param {number} delta */
export function addToCart(productId, delta = 1) {
  const lines = loadCart();
  const i = lines.findIndex((l) => l.id === productId);
  if (i >= 0) {
    lines[i].qty = Math.max(0, lines[i].qty + delta);
    if (lines[i].qty === 0) lines.splice(i, 1);
  } else if (delta > 0) {
    lines.push({ id: productId, qty: delta });
  }
  saveCart(lines);
  return lines;
}

/** @param {string} productId */
export function setQty(productId, qty) {
  const q = Math.max(0, Math.floor(Number(qty)) || 0);
  const lines = loadCart().filter((l) => l.id !== productId);
  if (q > 0) lines.push({ id: productId, qty: q });
  saveCart(lines);
  return lines;
}

export function clearCart() {
  saveCart([]);
}
