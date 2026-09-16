/*
  NIGHTMARE MUNCHIES
  Cart + custom TMN checkout routing

  This file DOES NOT change your page design.
  It only:
  - adds/removes cookie items
  - updates the existing cart
  - saves the cart in localStorage
  - opens the custom TMN checkout page in the Munchies theme
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

const CHECKOUT_URL = new URL(
  "../checkout.html?vendor=munchies",
  window.location.href
).href;


// ---------------------------------------------------------
// ELEMENTS
// ---------------------------------------------------------

const squareCart = document.getElementById("squareCart");
const openCartButton = document.getElementById("openCartButton");

const cartItemsElement = document.getElementById("cartItems");
const cartEmptyElement = document.getElementById("cartEmpty");
const cartCountElement = document.getElementById("cartCount");
const cartTotalElement = document.getElementById("cartTotal");
const cartStatusElement = document.getElementById("cartStatus");

const checkoutButton = document.getElementById("checkoutButton");


// ---------------------------------------------------------
// CART STATE
// ---------------------------------------------------------

let cart = loadCart();


// ---------------------------------------------------------
// STORAGE
// ---------------------------------------------------------

function loadCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      return {};
    }

    const parsedCart = JSON.parse(savedCart);

    if (!parsedCart || typeof parsedCart !== "object") {
      return {};
    }

    return parsedCart;
  } catch (error) {
    console.error("Could not load Nightmare Munchies cart:", error);
    return {};
  }
}


function saveCart() {
  try {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart)
    );
  } catch (error) {
    console.error("Could not save Nightmare Munchies cart:", error);
  }
}


// ---------------------------------------------------------
// HELPERS
// ---------------------------------------------------------

function formatMoney(cents) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(cents / 100);
}


function getValidEntries() {
  return Object.entries(cart).filter(
    ([productId, quantity]) =>
      MUNCHIES_PRODUCTS[productId] &&
      Number.isInteger(quantity) &&
      quantity > 0
  );
}


function getCartCount() {
  return getValidEntries().reduce(
    (total, [, quantity]) => total + quantity,
    0
  );
}


function getCartTotal() {
  return getValidEntries().reduce(
    (total, [productId, quantity]) => {
      const product = MUNCHIES_PRODUCTS[productId];

      return total + product.price * quantity;
    },
    0
  );
}


function setStatus(message = "", isError = false) {
  if (!cartStatusElement) {
    return;
  }

  cartStatusElement.textContent = message;

  cartStatusElement.classList.toggle(
    "is-error",
    isError
  );
}


// ---------------------------------------------------------
// CART VISIBILITY
// ---------------------------------------------------------

function showCart() {
  if (!squareCart) {
    return;
  }

  squareCart.hidden = false;
}


function scrollToOrderWindow() {
  const orderSection = document.getElementById("order");

  if (!orderSection) {
    return;
  }

  orderSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


// ---------------------------------------------------------
// CART ACTIONS
// ---------------------------------------------------------

function addToCart(productId) {
  const product = MUNCHIES_PRODUCTS[productId];

  if (!product) {
    console.warn("Unknown product:", productId);
    return;
  }

  cart[productId] = (cart[productId] || 0) + 1;

  saveCart();
  renderCart();
  showCart();

  setStatus(
    `${product.name} added to your nightmare haul. ♡`
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
  if (!cart[productId]) {
    return;
  }

  delete cart[productId];

  saveCart();
  renderCart();
}


// ---------------------------------------------------------
// RENDER CART
// ---------------------------------------------------------

function renderCart() {
  if (
    !cartItemsElement ||
    !cartEmptyElement ||
    !cartCountElement ||
    !cartTotalElement ||
    !checkoutButton
  ) {
    console.warn(
      "Nightmare Munchies cart elements are missing from the HTML."
    );
    return;
  }

  const entries = getValidEntries();

  cartItemsElement.innerHTML = "";

  cartEmptyElement.hidden = entries.length > 0;

  cartCountElement.textContent = getCartCount();

  cartTotalElement.textContent = formatMoney(
    getCartTotal()
  );

  checkoutButton.disabled = entries.length === 0;


  entries.forEach(([productId, quantity]) => {
    const product = MUNCHIES_PRODUCTS[productId];

    const item = document.createElement("div");

    item.className = "square-cart-item";

    item.innerHTML = `
      <div class="square-cart-info">
        <strong>${product.name}</strong>

        <span>
          ${formatMoney(product.price)} each
        </span>
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

    cartItemsElement.appendChild(item);
  });
}


// ---------------------------------------------------------
// OPEN CUSTOM CHECKOUT
// ---------------------------------------------------------

function openCustomCheckout() {
  const itemCount = getCartCount();

  if (itemCount === 0) {
    setStatus(
      "Your nightmare haul is empty.",
      true
    );

    return;
  }

  saveCart();

  setStatus(
    "Opening the Nightmare Munchies checkout..."
  );

  window.location.assign(
    CHECKOUT_URL
  );
}


// ---------------------------------------------------------
// COOKIE BUTTONS
// ---------------------------------------------------------

document
  .querySelectorAll(".add-to-cart")
  .forEach((button) => {

    button.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        const productId =
          button.dataset.productId;

        addToCart(productId);

        scrollToOrderWindow();
      }
    );

  });


// ---------------------------------------------------------
// ORIGINAL ORDER / VIEW MENU BUTTON
// ---------------------------------------------------------

if (openCartButton) {
  openCartButton.addEventListener(
    "click",
    (event) => {
      event.preventDefault();

      showCart();
      scrollToOrderWindow();
    }
  );
}


// ---------------------------------------------------------
// + / - / REMOVE BUTTONS
// ---------------------------------------------------------

if (cartItemsElement) {
  cartItemsElement.addEventListener(
    "click",
    (event) => {

      const button =
        event.target.closest(
          "[data-cart-action]"
        );

      if (!button) {
        return;
      }

      const productId =
        button.dataset.productId;

      const action =
        button.dataset.cartAction;


      if (action === "increase") {
        changeQuantity(
          productId,
          1
        );
      }


      if (action === "decrease") {
        changeQuantity(
          productId,
          -1
        );
      }


      if (action === "remove") {
        removeFromCart(
          productId
        );
      }
    }
  );
}


// ---------------------------------------------------------
// CHECKOUT BUTTON
// ---------------------------------------------------------

if (checkoutButton) {
  checkoutButton.addEventListener(
    "click",
    (event) => {
      event.preventDefault();

      openCustomCheckout();
    }
  );
}


// ---------------------------------------------------------
// INITIAL PAGE LOAD
// ---------------------------------------------------------

renderCart();

if (getCartCount() > 0) {
  showCart();
}