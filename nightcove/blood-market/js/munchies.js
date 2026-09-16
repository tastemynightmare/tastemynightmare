/*
  NIGHTMARE MUNCHIES
  Cart behavior only.

  IMPORTANT:
  - site.js stays untouched.
  - The page design stays untouched.
  - Checkout now goes to the custom TMN checkout page.
*/

const MUNCHIES_PRODUCTS = {
  "blood-velvet": {
    name: "Blood Velvet",
    price: 600
  },

  "birthday-massacre": {
    name: "Birthday Massacre",
    price: 600
  },

  "monsters-delight": {
    name: "Monsters Delight",
    price: 600
  },

  "forbidden-nana": {
    name: "Forbidden Nana",
    price: 600
  }
};

const CART_STORAGE_KEY = "tmnMunchiesCart";

const squareCart = document.getElementById("squareCart");
const openCartButton = document.getElementById("openCartButton");
const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartStatus = document.getElementById("cartStatus");
const checkoutButton = document.getElementById("checkoutButton");

let cart = loadCart();


function loadCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      return {};
    }

    const parsedCart = JSON.parse(savedCart);

    return parsedCart && typeof parsedCart === "object"
      ? parsedCart
      : {};
  } catch (error) {
    console.error("Could not load Nightmare Munchies cart:", error);
    return {};
  }
}


function saveCart() {
  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(cart)
  );
}


function formatMoney(cents) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(cents / 100);
}


function getCartCount() {
  return Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );
}


function getCartTotal() {
  return Object.entries(cart).reduce(
    (total, [productId, quantity]) => {
      const product = MUNCHIES_PRODUCTS[productId];

      if (!product) {
        return total;
      }

      return total + product.price * quantity;
    },
    0
  );
}


function showCart() {
  if (!squareCart) {
    return;
  }

  squareCart.hidden = false;
}


function scrollToCart() {
  showCart();

  squareCart?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


function setCartStatus(message = "", isError = false) {
  if (!cartStatus) {
    return;
  }

  cartStatus.textContent = message;
  cartStatus.classList.toggle("is-error", isError);
}


function addToCart(productId) {
  if (!MUNCHIES_PRODUCTS[productId]) {
    return;
  }

  cart[productId] = (cart[productId] || 0) + 1;

  saveCart();
  renderCart();
  showCart();

  setCartStatus(
    `${MUNCHIES_PRODUCTS[productId].name} added to your nightmare haul. ♡`
  );
}


function changeQuantity(productId, amount) {
  if (!cart[productId]) {
    return;
  }

  cart[productId] += amount;

  if (cart[productId] <= 0) {
    delete cart[productId];
  }

  saveCart();
  renderCart();
}


function removeFromCart(productId) {
  delete cart[productId];

  saveCart();
  renderCart();
}


function renderCart() {
  if (
    !cartItems ||
    !cartEmpty ||
    !cartCount ||
    !cartTotal ||
    !checkoutButton
  ) {
    return;
  }

  cartItems.innerHTML = "";

  const entries = Object.entries(cart).filter(
    ([productId, quantity]) =>
      MUNCHIES_PRODUCTS[productId] &&
      Number.isInteger(quantity) &&
      quantity > 0
  );

  const hasItems = entries.length > 0;

  cartEmpty.hidden = hasItems;
  checkoutButton.disabled = !hasItems;

  cartCount.textContent = getCartCount();
  cartTotal.textContent = formatMoney(getCartTotal());

  entries.forEach(([productId, quantity]) => {
    const product = MUNCHIES_PRODUCTS[productId];

    const item = document.createElement("div");
    item.className = "square-cart-item";

    item.innerHTML = `
      <div class="square-cart-info">
        <strong>${product.name}</strong>
        <span>${formatMoney(product.price)} each</span>
      </div>

      <div class="square-cart-controls">
        <button
          class="square-quantity-button"
          type="button"
          data-cart-action="decrease"
          data-product-id="${productId}"
          aria-label="Remove one ${product.name}">
          −
        </button>

        <span class="square-quantity">
          ${quantity}
        </span>

        <button
          class="square-quantity-button"
          type="button"
          data-cart-action="increase"
          data-product-id="${productId}"
          aria-label="Add one ${product.name}">
          +
        </button>

        <span class="square-line-total">
          ${formatMoney(product.price * quantity)}
        </span>

        <button
          class="square-remove-button"
          type="button"
          data-cart-action="remove"
          data-product-id="${productId}">
          REMOVE
        </button>
      </div>
    `;

    cartItems.appendChild(item);
  });
}


function beginCustomCheckout() {
  const itemCount = getCartCount();

  if (itemCount < 1) {
    setCartStatus("Your nightmare haul is empty.", true);
    return;
  }

  setCartStatus("Opening the Blood Market checkout...");

  /*
    This page is assumed to live at:
    blood-market/vendors/munchies.html

    Custom checkout lives at:
    blood-market/checkout.html
  */
  window.location.href = "../checkout.html";
}


document
  .querySelectorAll(".add-to-cart")
  .forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const productId = button.dataset.productId;

      addToCart(productId);

      document
        .getElementById("order")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
    });
  });


openCartButton?.addEventListener(
  "click",
  (event) => {
    event.preventDefault();

    scrollToCart();
  }
);


cartItems?.addEventListener(
  "click",
  (event) => {
    const button = event.target.closest(
      "[data-cart-action]"
    );

    if (!button) {
      return;
    }

    const productId = button.dataset.productId;
    const action = button.dataset.cartAction;

    if (action === "increase") {
      changeQuantity(productId, 1);
    }

    if (action === "decrease") {
      changeQuantity(productId, -1);
    }

    if (action === "remove") {
      removeFromCart(productId);
    }
  }
);


checkoutButton?.addEventListener(
  "click",
  beginCustomCheckout
);


renderCart();

if (getCartCount() > 0) {
  showCart();
}