/*
  TASTE MY NIGHTMARE
  BLOOD MARKET CUSTOM CHECKOUT

  Current cart source:
  - Nightmare Munchies: localStorage "tmnMunchiesCart"

  Later:
  - Nightware and Nightshade Productions can feed this same page.
*/

const TMN_API_BASE =
  "https://tmn-square-api.tastemynightmare.workers.dev";

const MUNCHIES_CART_KEY = "tmnMunchiesCart";

const CHECKOUT_PRODUCTS = {
  "blood-velvet": {
    name: "Blood Velvet",
    vendor: "Nightmare Munchies",
    price: 600
  },

  "birthday-massacre": {
    name: "Birthday Massacre",
    vendor: "Nightmare Munchies",
    price: 600
  },

  "monsters-delight": {
    name: "Monsters Delight",
    vendor: "Nightmare Munchies",
    price: 600
  },

  "forbidden-nana": {
    name: "Forbidden Nana",
    vendor: "Nightmare Munchies",
    price: 600
  }
};


const checkoutItems =
  document.getElementById("checkoutItems");

const checkoutItemCount =
  document.getElementById("checkoutItemCount");

const checkoutTotal =
  document.getElementById("checkoutTotal");

const checkoutEmpty =
  document.getElementById("checkoutEmpty");

const payButton =
  document.getElementById("payButton");

const payButtonTotal =
  document.getElementById("payButtonTotal");

const paymentForm =
  document.getElementById("tmnPaymentForm");

const paymentStatus =
  document.getElementById("paymentStatus");

const paymentSuccess =
  document.getElementById("paymentSuccess");

const successMessage =
  document.getElementById("successMessage");

const squareReceiptLink =
  document.getElementById("squareReceiptLink");

let card;
let squareConfig;
let cart = loadCart();


function loadCart() {
  try {
    const stored =
      localStorage.getItem(MUNCHIES_CART_KEY);

    if (!stored) {
      return {};
    }

    const parsed =
      JSON.parse(stored);

    return parsed && typeof parsed === "object"
      ? parsed
      : {};
  } catch (error) {
    console.error(
      "Could not load Blood Market cart:",
      error
    );

    return {};
  }
}


function getValidCartEntries() {
  return Object.entries(cart).filter(
    ([productId, quantity]) =>
      CHECKOUT_PRODUCTS[productId] &&
      Number.isInteger(quantity) &&
      quantity > 0
  );
}


function getItemCount() {
  return getValidCartEntries().reduce(
    (total, [, quantity]) =>
      total + quantity,
    0
  );
}


function getSubtotal() {
  return getValidCartEntries().reduce(
    (
      total,
      [productId, quantity]
    ) => {
      return (
        total +
        CHECKOUT_PRODUCTS[productId].price *
          quantity
      );
    },
    0
  );
}


function formatMoney(cents) {
  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD"
    }
  ).format(cents / 100);
}


function renderOrder() {
  const entries =
    getValidCartEntries();

  checkoutItems.innerHTML = "";

  const count =
    getItemCount();

  const subtotal =
    getSubtotal();

  checkoutItemCount.textContent =
    `${count} ${count === 1 ? "ITEM" : "ITEMS"}`;

  checkoutTotal.textContent =
    formatMoney(subtotal);

  payButtonTotal.textContent =
    formatMoney(subtotal);

  checkoutEmpty.hidden =
    entries.length > 0;

  entries.forEach(
    ([productId, quantity]) => {
      const product =
        CHECKOUT_PRODUCTS[productId];

      const line =
        document.createElement("div");

      line.className =
        "checkout-line-item";

      line.innerHTML = `
        <div class="checkout-line-copy">
          <strong>${product.name}</strong>

          <span>
            ${product.vendor}
            // ${quantity} × ${formatMoney(product.price)}
          </span>
        </div>

        <span class="checkout-line-total">
          ${formatMoney(product.price * quantity)}
        </span>
      `;

      checkoutItems.appendChild(line);
    }
  );

  if (entries.length === 0) {
    payButton.disabled = true;

    setStatus(
      "Your cart is empty. Return to the Blood Market to add an item.",
      true
    );
  }
}


function setStatus(
  message = "",
  isError = false
) {
  paymentStatus.textContent =
    message;

  paymentStatus.classList.toggle(
    "is-error",
    isError
  );
}


async function fetchSquareConfig() {
  const response =
    await fetch(
      `${TMN_API_BASE}/config`
    );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ||
        "Could not load Square configuration."
    );
  }

  if (
    !data.applicationId ||
    !data.locationId ||
    !data.environment
  ) {
    throw new Error(
      "Square configuration is incomplete."
    );
  }

  return data;
}


function loadSquareSdk(
  environment
) {
  return new Promise(
    (resolve, reject) => {
      if (window.Square) {
        resolve();
        return;
      }

      const script =
        document.createElement("script");

      script.src =
        environment === "production"
          ? "https://web.squarecdn.com/v1/square.js"
          : "https://sandbox.web.squarecdn.com/v1/square.js";

      script.async = true;

      script.onload =
        () => resolve();

      script.onerror =
        () =>
          reject(
            new Error(
              "Square's secure payment form could not load."
            )
          );

      document.head.appendChild(
        script
      );
    }
  );
}


async function initializeSquareCard() {
  squareConfig =
    await fetchSquareConfig();

  await loadSquareSdk(
    squareConfig.environment
  );

  if (!window.Square) {
    throw new Error(
      "Square Web Payments SDK is unavailable."
    );
  }

  const payments =
    window.Square.payments(
      squareConfig.applicationId,
      squareConfig.locationId
    );

  const tmnCardStyle = {
    ".input-container": {
      borderColor:
        "rgba(255,255,255,0.18)",
      borderRadius:
        "0px"
    },

    ".input-container.is-focus": {
      borderColor:
        "#ff241c"
    },

    ".input-container.is-error": {
      borderColor:
        "#ff514b"
    },

    ".message-text": {
      color:
        "#aaaaaa"
    },

    ".message-icon": {
      color:
        "#aaaaaa"
    },

    ".message-text.is-error": {
      color:
        "#ff514b"
    },

    ".message-icon.is-error": {
      color:
        "#ff514b"
    },

    "input": {
      backgroundColor:
        "#0b0b0b",
      color:
        "#f7f7f7",
      fontFamily:
        "Arial, sans-serif",
      fontSize:
        "16px"
    },

    "input::placeholder": {
      color:
        "#777777"
    },

    "input.is-error": {
      color:
        "#ff514b"
    }
  };

  card =
    await payments.card({
      style: tmnCardStyle
    });

  await card.attach(
    "#card-container"
  );

  if (getItemCount() > 0) {
    payButton.disabled = false;
  }

  setStatus("");
}


function validateBuyerFields() {
  const firstName =
    document
      .getElementById("firstName")
      .value
      .trim();

  const lastName =
    document
      .getElementById("lastName")
      .value
      .trim();

  const email =
    document
      .getElementById("email")
      .value
      .trim();

  if (
    !firstName ||
    !lastName ||
    !email
  ) {
    throw new Error(
      "Enter your first name, last name, and email."
    );
  }

  return {
    firstName,
    lastName,
    email
  };
}


function buildVerificationDetails(
  buyer
) {
  return {
    amount:
      (getSubtotal() / 100).toFixed(2),

    billingContact: {
      givenName:
        buyer.firstName,

      familyName:
        buyer.lastName,

      email:
        buyer.email,

      countryCode:
        "US"
    },

    currencyCode:
      "USD",

    intent:
      "CHARGE",

    customerInitiated:
      true,

    sellerKeyedIn:
      false
  };
}


async function createPayment(
  sourceId,
  buyer
) {
  const items =
    getValidCartEntries().map(
      ([id, quantity]) => ({
        id,
        quantity
      })
    );

  const response =
    await fetch(
      `${TMN_API_BASE}/create-payment`,
      {
        method:
          "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify({
            sourceId,
            items,
            buyer
          })
      }
    );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ||
        "Square could not complete the payment."
    );
  }

  return data;
}


function showPaymentSuccess(
  result
) {
  paymentForm.hidden = true;
  paymentSuccess.hidden = false;

  const paymentId =
    result.paymentId || "";

  successMessage.textContent =
    paymentId
      ? `Payment complete. Square payment ${paymentId} was accepted.`
      : "Payment complete.";

  if (result.receiptUrl) {
    squareReceiptLink.href =
      result.receiptUrl;

    squareReceiptLink.hidden =
      false;
  }

  localStorage.removeItem(
    MUNCHIES_CART_KEY
  );

  cart = {};
}


paymentForm.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    if (!card) {
      setStatus(
        "The secure card form is still loading.",
        true
      );

      return;
    }

    if (getItemCount() < 1) {
      setStatus(
        "Your cart is empty.",
        true
      );

      return;
    }

    payButton.disabled = true;

    setStatus(
      "Securing payment with Square..."
    );

    try {
      const buyer =
        validateBuyerFields();

      const verificationDetails =
        buildVerificationDetails(
          buyer
        );

      const tokenResult =
        await card.tokenize(
          verificationDetails
        );

      if (
        tokenResult.status !== "OK"
      ) {
        console.error(
          "Square tokenization error:",
          tokenResult.errors
        );

        throw new Error(
          tokenResult.errors?.[0]?.message ||
            "Please check your card information."
        );
      }

      const paymentResult =
        await createPayment(
          tokenResult.token,
          buyer
        );

      showPaymentSuccess(
        paymentResult
      );

    } catch (error) {
      console.error(
        "TMN payment error:",
        error
      );

      setStatus(
        error.message ||
          "Payment could not be completed.",
        true
      );

      payButton.disabled = false;
    }
  }
);


async function startCheckout() {
  renderOrder();

  if (getItemCount() < 1) {
    return;
  }

  setStatus(
    "Loading secure Square card entry..."
  );

  try {
    await initializeSquareCard();
  } catch (error) {
    console.error(
      "Square initialization error:",
      error
    );

    setStatus(
      error.message ||
        "Square checkout could not load.",
      true
    );
  }
}


startCheckout();