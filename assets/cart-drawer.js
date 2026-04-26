class CartDrawer extends HTMLElement {
  constructor() {
    super();
    this.overlay = document.getElementById('CartDrawer-Overlay');
    this.panel = this.querySelector('.cart-drawer__panel');
    this.closeBtn = this.querySelector('.cart-drawer__close');

    this.overlay && this.overlay.addEventListener('click', this.close.bind(this));
    this.closeBtn && this.closeBtn.addEventListener('click', this.close.bind(this));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.close(); });

    this.querySelector('.cart-drawer__body') &&
      this.querySelector('.cart-drawer__body').addEventListener('click', this.onBodyClick.bind(this));
  }

  open() {
    this.classList.add('is-open');
    document.body.classList.add('cart-drawer-open');
    this.panel && this.panel.focus();
  }

  close() {
    this.classList.remove('is-open');
    document.body.classList.remove('cart-drawer-open');
  }

  onBodyClick(e) {
    const removeBtn = e.target.closest('.cart-drawer__item-remove');
    const qtyBtn = e.target.closest('.cart-drawer__qty-btn');

    if (removeBtn) {
      const updates = { [removeBtn.dataset.key]: 0 };
      if (removeBtn.dataset.addonKey) updates[removeBtn.dataset.addonKey] = 0;
      this.updateItems(updates);
    } else if (qtyBtn) {
      const item = qtyBtn.closest('.cart-drawer__item');
      const currentQty = parseInt(item.querySelector('.cart-drawer__qty-value').textContent);
      const newQty = qtyBtn.dataset.action === 'increase' ? currentQty + 1 : currentQty - 1;
      this.updateItem(qtyBtn.dataset.key, newQty);
    }
  }

  updateItem(key, quantity) {
    this.updateItems({ [key]: quantity });
  }

  updateItems(updates) {
    fetch('/cart/update.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ updates })
    })
      .then(r => r.json())
      .then(cart => this.removeOrphanedAddons(cart))
      .then(cart => this.renderCart(cart));
  }

  removeOrphanedAddons(cart) {
    const allKeys = new Set(cart.items.map(i => i.key));
    const orphans = {};
    cart.items.forEach(item => {
      const linked = (item.properties || {})['_linked_item'];
      if (linked && !allKeys.has(linked)) orphans[item.key] = 0;
    });
    if (!Object.keys(orphans).length) return Promise.resolve(cart);
    return fetch('/cart/update.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ updates: orphans })
    }).then(r => r.json());
  }

  renderCart(cart) {
    const body = document.getElementById('CartDrawer-Body');
    const subtotal = document.getElementById('CartDrawer-Subtotal');
    const countEl = document.querySelector('.header-cart-count');

    if (subtotal) subtotal.textContent = this.formatMoney(cart.total_price);
    if (countEl) {
      countEl.textContent = cart.item_count;
      countEl.style.display = cart.item_count > 0 ? '' : 'none';
    }

    if (cart.item_count === 0) {
      this.classList.add('is-empty');
      if (body) body.innerHTML = `
        <div class="cart-drawer__empty">
          <p>${window.cartStrings.empty}</p>
          <a href="/collections/all" class="cart-drawer__continue">${window.cartStrings.continueShopping}</a>
        </div>`;
      return;
    }

    this.classList.remove('is-empty');
    if (!body) return;

    /* Index addon items by their _linked_item cart line key */
    const addonByKey = {};
    cart.items.forEach(item => {
      const linked = (item.properties || {})['_linked_item'];
      if (linked) addonByKey[linked] = item;
    });

    let html = '<div class="cart-drawer__items" id="CartDrawer-Items">';
    cart.items.forEach(item => {
      /* Skip addon line items — they render under their parent */
      if ((item.properties || {})['_linked_item']) return;

      const img = item.image ? `<img src="${item.image.replace(/(\.\w+)$/, '_120x$1')}" alt="${this.escHtml(item.title)}" width="60" height="75" loading="lazy">` : '';
      const variant = (item.variant_title && item.variant_title !== 'Default Title')
        ? `<p class="cart-drawer__item-variant">${this.escHtml(item.variant_title)}</p>` : '';

      const props = item.properties || {};
      const visibleKeys = Object.keys(props).filter(k => k !== 'Tailoring Extras' && !k.startsWith('_') && props[k] !== '');
      const propsHtml = visibleKeys.length ? `<ul class="cart-drawer__tailoring-props">${
        visibleKeys.map(k => `<li><span class="cart-drawer__prop-key">${this.escHtml(k)}:</span> ${this.escHtml(String(props[k]))}</li>`).join('')
      }</ul>` : '';

      const addon = addonByKey[item.key];
      const addonHtml = addon ? `
        <div class="cart-drawer__addon-row" data-key="${addon.key}">
          <span class="cart-drawer__addon-label">${this.escHtml(addon.product_title)}</span>
          <span class="cart-drawer__addon-price">${this.formatMoney(addon.final_line_price)}</span>
        </div>` : '';
      const addonKeyAttr = addon ? ` data-addon-key="${addon.key}"` : '';

      html += `
        <div class="cart-drawer__item" data-key="${item.key}">
          <a href="${item.url}" class="cart-drawer__item-image">${img}</a>
          <div class="cart-drawer__item-info">
            <a href="${item.url}" class="cart-drawer__item-title">${this.escHtml(item.product_title)}</a>
            ${variant}
            ${propsHtml}
            <p class="cart-drawer__item-price">${this.formatMoney(item.final_line_price)}</p>
            ${addonHtml}
            <div class="cart-drawer__item-qty">
              <button type="button" class="cart-drawer__qty-btn" data-action="decrease" data-key="${item.key}">−</button>
              <span class="cart-drawer__qty-value">${item.quantity}</span>
              <button type="button" class="cart-drawer__qty-btn" data-action="increase" data-key="${item.key}">+</button>
            </div>
          </div>
          <button type="button" class="cart-drawer__item-remove" data-key="${item.key}"${addonKeyAttr} aria-label="Remove">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>`;
    });
    html += '</div>';
    body.innerHTML = html;
  }

  formatMoney(cents) {
    const format = window.shopMoneyFormat || '₹{{amount}}';
    const value = cents / 100;
    const amount = value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const amountNoDecimals = Math.floor(value).toLocaleString('en-IN');
    return format
      .replace('{{amount}}', amount)
      .replace('{{amount_no_decimals}}', amountNoDecimals)
      .replace('{{amount_with_comma_separator}}', amount)
      .replace('{{amount_no_decimals_with_comma_separator}}', amountNoDecimals);
  }

  escHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
}

customElements.define('cart-drawer', CartDrawer);

// Intercept all add-to-cart forms
document.addEventListener('submit', function(e) {
  const form = e.target.closest('form');
  if (!form) return;
  const action = (form.getAttribute('action') || '').replace(/^https?:\/\/[^/]+/, '');
  if (action !== '/cart/add') return; // let checkout and other forms submit normally

  const drawer = document.querySelector('cart-drawer');
  if (!drawer) return;

  e.preventDefault();

  const btn = form.querySelector('[name="add"]');
  if (btn) {
    btn.classList.add('is-loading');
    btn.disabled = true;
  }

  const formData = new FormData(form);
  fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: formData
  })
    .then(r => r.json())
    .then(() => fetch('/cart.js').then(r => r.json()))
    .then(cart => {
      drawer.renderCart(cart);
      drawer.open();
    })
    .catch(err => console.error('Cart error:', err))
    .finally(() => {
      if (btn) {
        btn.classList.remove('is-loading');
        btn.disabled = false;
      }
    });
});

// Header cart icon opens drawer
document.addEventListener('DOMContentLoaded', function() {
  const cartIcon = document.querySelector('.header-icon-btn--cart');
  const drawer = document.querySelector('cart-drawer');
  if (cartIcon && drawer) {
    cartIcon.addEventListener('click', function(e) {
      e.preventDefault();
      fetch('/cart.js').then(r => r.json()).then(cart => {
        drawer.renderCart(cart);
        drawer.open();
      });
    });
  }

  document.addEventListener('cart:open', function() {
    const d = document.querySelector('cart-drawer');
    if (!d) return;
    fetch('/cart.js').then(r => r.json()).then(cart => {
      d.renderCart(cart);
      d.open();
    });
  });

  window.cartStrings = window.cartStrings || {
    empty: 'Your cart is empty',
    continueShopping: 'Continue shopping'
  };
});
