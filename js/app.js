import { PRODUCTS } from '../data/products.js';
import { retailFromWholesale, MARKUP_PERCENT_ON_TOP } from '../config/supplier.js';
import { loadCart, addToCart, setQty, clearCart } from './cart-store.js';

function formatEur(n) {
  return new Intl.NumberFormat('lt-LT', { style: 'currency', currency: 'EUR' }).format(n);
}

const els = {
  catalog: document.getElementById('catalog-grid'),
  cartLines: document.getElementById('cart-lines'),
  cartSubtotal: document.getElementById('cart-subtotal'),
  cartCount: document.getElementById('cart-count'),
  cartPanel: document.getElementById('cart-panel'),
  openCart: document.getElementById('open-cart'),
  closeCart: document.getElementById('close-cart'),
  overlay: document.getElementById('overlay'),
  checkoutForm: document.getElementById('checkout-form'),
  checkoutMsg: document.getElementById('checkout-msg'),
  navHome: document.getElementById('nav-home'),
  navShop: document.getElementById('nav-shop'),
  navCheckout: document.getElementById('nav-checkout'),
  sectionHome: document.getElementById('section-home'),
  sectionShop: document.getElementById('section-shop'),
  sectionCheckout: document.getElementById('section-checkout'),
};

/** @type {Map<string, typeof PRODUCTS[0]>} */
const byId = new Map(PRODUCTS.map((p) => [p.id, p]));

function cartTotals() {
  const lines = loadCart();
  let sub = 0;
  let count = 0;
  for (const line of lines) {
    const p = byId.get(line.id);
    if (!p) continue;
    const unit = retailFromWholesale(p.wholesaleEur);
    if (unit == null) continue;
    sub += unit * line.qty;
    count += line.qty;
  }
  return { lines, sub, count };
}

function renderCart() {
  const { lines, sub, count } = cartTotals();
  els.cartCount.textContent = String(count);
  els.cartSubtotal.textContent = formatEur(sub);

  els.cartLines.innerHTML = '';
  if (lines.length === 0) {
    els.cartLines.appendChild(Object.assign(document.createElement('p'), { className: 'small', textContent: 'Krepšelis tuščias.' }));
    return;
  }

  for (const line of lines) {
    const p = byId.get(line.id);
    if (!p) continue;
    const unit = retailFromWholesale(p.wholesaleEur);
    if (unit == null) continue;

    const row = document.createElement('div');
    row.className = 'cart-row';

    const info = document.createElement('div');
    info.innerHTML = `<strong>${escapeHtml(p.title)}</strong><div class="small">${formatEur(unit)} × ${line.qty}</div>`;

    const controls = document.createElement('div');
    controls.className = 'cart-row-controls';

    const minus = document.createElement('button');
    minus.type = 'button';
    minus.className = 'btn btn-ghost btn-sm';
    minus.textContent = '−';
    minus.addEventListener('click', () => {
      addToCart(line.id, -1);
      renderCart();
    });

    const inp = document.createElement('input');
    inp.type = 'number';
    inp.min = '0';
    inp.className = 'qty-input';
    inp.value = String(line.qty);
    inp.addEventListener('change', () => {
      setQty(line.id, inp.value);
      renderCart();
    });

    const plus = document.createElement('button');
    plus.type = 'button';
    plus.className = 'btn btn-ghost btn-sm';
    plus.textContent = '+';
    plus.addEventListener('click', () => {
      addToCart(line.id, 1);
      renderCart();
    });

    controls.append(minus, inp, plus);
    row.append(info, controls);
    els.cartLines.appendChild(row);
  }
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function productImageUrl(p) {
  if (p.image && typeof p.image === 'string' && p.image.startsWith('http')) return p.image;
  return `https://picsum.photos/seed/${encodeURIComponent(p.id)}/640/480`;
}

function renderCatalog() {
  els.catalog.innerHTML = '';

  for (const p of PRODUCTS) {
    const retail = retailFromWholesale(p.wholesaleEur);
    const card = document.createElement('article');
    card.className = 'product-card';

    const price = retail != null ? formatEur(retail) : '—';

    const media = document.createElement('div');
    media.className = 'product-media';

    const img = document.createElement('img');
    img.className = 'product-img';
    img.alt = p.title;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 640;
    img.height = 480;
    img.src = productImageUrl(p);
    img.addEventListener('error', () => {
      const ph = document.createElement('div');
      ph.className = 'product-placeholder';
      ph.setAttribute('aria-hidden', 'true');
      img.replaceWith(ph);
    });

    media.appendChild(img);

    const body = document.createElement('div');
    body.className = 'product-body';
    body.innerHTML = `
      <h3 class="product-title">${escapeHtml(p.title)}</h3>
      <p class="small product-blurb">${escapeHtml(p.blurb)}</p>
      <p class="product-price">${price} <span class="small muted-inline">(+${MARKUP_PERCENT_ON_TOP}% antkainis)</span></p>
    `;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-primary';
    btn.textContent = 'Į krepšelį';
    btn.addEventListener('click', () => {
      addToCart(p.id, 1);
      renderCart();
      openCartPanel();
    });

    body.appendChild(btn);
    card.append(media, body);
    els.catalog.appendChild(card);
  }
}

function openCartPanel() {
  els.cartPanel.classList.add('is-open');
  els.overlay.classList.add('is-visible');
  els.overlay.setAttribute('aria-hidden', 'false');
}

function closeCartPanel() {
  els.cartPanel.classList.remove('is-open');
  els.overlay.classList.remove('is-visible');
  els.overlay.setAttribute('aria-hidden', 'true');
}

function showSection(name) {
  const map = { home: els.sectionHome, shop: els.sectionShop, checkout: els.sectionCheckout };
  for (const sec of Object.values(map)) sec.hidden = true;
  if (map[name]) map[name].hidden = false;
  closeCartPanel();
}

function initNav() {
  els.navHome.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('home');
  });
  els.navShop.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('shop');
  });
  els.navCheckout.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('checkout');
  });
}

function initCartUi() {
  els.openCart.addEventListener('click', () => openCartPanel());
  els.closeCart.addEventListener('click', () => closeCartPanel());
  els.overlay.addEventListener('click', () => closeCartPanel());

  const goCheckout = document.getElementById('go-checkout');
  if (goCheckout) {
    goCheckout.addEventListener('click', () => {
      closeCartPanel();
      showSection('checkout');
    });
  }
}

function initPricingWidget() {
  const input = document.getElementById('wholesale');
  const out = document.getElementById('retail-out');
  if (!input || !out) return;

  function update() {
    const raw = input.value.trim();
    if (raw === '') {
      out.textContent = '';
      return;
    }
    const retail = retailFromWholesale(parseFloat(raw.replace(',', '.')));
    if (retail == null) {
      out.textContent = 'Įveskite teigiamą skaičių.';
      return;
    }
    out.textContent = `Rekomenduojama pardavimo kaina: ${formatEur(retail)} (antkainis +${MARKUP_PERCENT_ON_TOP} %).`;
  }

  input.addEventListener('input', update);
  input.addEventListener('change', update);
}

function initCheckout() {
  els.checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const { sub, count } = cartTotals();
    if (count === 0) {
      els.checkoutMsg.textContent = 'Pirmiau pridėkite prekių į krepšelį.';
      els.checkoutMsg.hidden = false;
      return;
    }

    const fd = new FormData(els.checkoutForm);
    const email = String(fd.get('email') || '').trim();
    if (!email) {
      els.checkoutMsg.textContent = 'Įveskite el. paštą.';
      els.checkoutMsg.hidden = false;
      return;
    }

    els.checkoutMsg.textContent = `Ačiū. Užsakymo santrauka (${count} vnt., ${formatEur(sub)}) gauta. Atsakysime el. paštu dėl apmokėjimo ir diskretaus siuntimo.`;
    els.checkoutMsg.hidden = false;
    clearCart();
    renderCart();
    els.checkoutForm.reset();
  });
}

renderCatalog();
renderCart();
initNav();
initCartUi();
initPricingWidget();
initCheckout();
