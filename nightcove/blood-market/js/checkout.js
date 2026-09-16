/*
  TASTE MY NIGHTMARE
  THEMED BLOOD MARKET CHECKOUT

  One checkout engine.
  Visual theme is selected with:

    checkout.html?vendor=munchies
    checkout.html?vendor=nightware
    checkout.html?vendor=nightshade

  If no vendor is supplied, checkout uses the core
  TMN black / red / white Blood Market theme.
*/

const TMN_API_BASES = [
  "https://api.tastemynightmare.com",
  "https://tmn-square-api.tastemynightmare.workers.dev"
];


async function fetchFromTmnApi(path, options = {}) {
  let lastError = null;

  for (const baseUrl of TMN_API_BASES) {
    try {
      const response = await fetch(
        `${baseUrl}${path}`,
        options
      );

      return response;
    } catch (error) {
      console.warn(
        `TMN API fetch failed for ${baseUrl}${path}`,
        error
      );

      lastError = error;
    }
  }

  throw new Error(
    "Could not reach the TMN checkout server. Please try again in a moment."
  );
}

const MUNCHIES_CART_KEY =
  "tmnMunchiesCart";


/* =========================================================
   CURRENT PRODUCT CATALOG
   ========================================================= */

const CHECKOUT_PRODUCTS = {

  "blood-velvet": {
    name:
      "Blood Velvet",

    vendor:
      "Nightmare Munchies",

    vendorKey:
      "munchies",

    price:
      600
  },

  "birthday-massacre": {
    name:
      "Birthday Massacre",

    vendor:
      "Nightmare Munchies",

    vendorKey:
      "munchies",

    price:
      600
  },

  "monsters-delight": {
    name:
      "Monsters Delight",

    vendor:
      "Nightmare Munchies",

    vendorKey:
      "munchies",

    price:
      600
  },

  "forbidden-nana": {
    name:
      "Forbidden Nana",

    vendor:
      "Nightmare Munchies",

    vendorKey:
      "munchies",

    price:
      600
  }

};


/* =========================================================
   THEME CONFIG
   ========================================================= */

const CHECKOUT_THEMES = {

  bloodmarket: {
    bodyClass:
      "theme-bloodmarket",

    brandName:
      "BLOOD MARKET",

    kicker:
      "BLOOD MARKET // SECURE CHECKOUT",

    headlineTop:
      "SEAL THE",

    headlineAccent:
      "TRANSACTION.",

    intro:
      "Review your nightmare haul, enter your information, and complete payment without leaving the TMN universe.",

    orderCode:
      "ORDER // 01",

    paymentCode:
      "PAYMENT // 02",

    payButton:
      "SEAL THE TRANSACTION",

    successCode:
      "TRANSACTION ACCEPTED",

    successHeading:
      "THE BLOOD MARKET HAS YOUR ORDER.",

    editText:
      "← EDIT ORDER",

    editHref:
      "market.html",

    backText:
      "← BACK TO MARKET",

    backHref:
      "market.html",

    footer:
      "TASTE MY NIGHTMARE // BLOOD MARKET",

    returnText:
      "RETURN TO BLOOD MARKET ›",

    returnHref:
      "market.html",

    metaThemeColor:
      "#050505",

    squareCard: {
      border:
        "rgba(255,255,255,0.18)",

      focus:
        "#ff241c",

      background:
        "#0b0b0b",

      text:
        "#f7f7f7",

      placeholder:
        "#777777",

      error:
        "#ff514b"
    }
  },


  munchies: {
    bodyClass:
      "theme-munchies",

    brandName:
      "NIGHTMARE MUNCHIES",

    kicker:
      "NIGHTMARE MUNCHIES ★ SECURE ORDER WINDOW",

    headlineTop:
      "FEED THE",

    headlineAccent:
      "NIGHTMARE ♡",

    intro:
      "Your edible nightmares are almost yours. Review the drop, enter your details, and check out securely with Square.",

    orderCode:
      "YOUR NIGHTMARE HAUL",

    paymentCode:
      "SWEET PAYMENT // ♡",

    payButton:
      "CLAIM YOUR MUNCHIES ♡",

    successCode:
      "ORDER CLAIMED ♡",

    successHeading:
      "YOUR NIGHTMARE MUNCHIES ARE CLAIMED.",

    editText:
      "← EDIT MUNCHIES ORDER",

    editHref:
      "nightmare-munchies/munchies.html#order",

    backText:
      "← BACK TO BLOOD MARKET",

    backHref:
      "market.html",

    footer:
      "TASTE MY NIGHTMARE // NIGHTMARE MUNCHIES",

    returnText:
      "RETURN TO MUNCHIES ›",

    returnHref:
      "nightshade-munchies/munchies.html",

    metaThemeColor:
      "#120711",

    squareCard: {
      border:
        "rgba(255,111,174,0.38)",

      focus:
        "#ff8fc0",

      background:
        "#160b14",

      text:
        "#fff7fb",

      placeholder:
        "#b78fa7",

      error:
        "#ff5f88"
    }
  },


  nightware: {
    bodyClass:
      "theme-nightware",

    brandName:
      "NIGHTWARE",

    kicker:
      "NIGHTWARE // TRANSACTION TERMINAL",

    headlineTop:
      "EXECUTE",

    headlineAccent:
      "TRANSACTION.",

    intro:
      "Verify your cart, enter buyer credentials, and complete the Nightware payment protocol.",

    orderCode:
      "CART_CONTENTS // 01",

    paymentCode:
      "PAYMENT_PROTOCOL // 02",

    payButton:
      "PROCESS ORDER",

    successCode:
      "TRANSACTION_EXECUTED",

    successHeading:
      "NIGHTWARE ORDER PROCESSED.",

    editText:
      "← EDIT NIGHTWARE ORDER",

    editHref:
      "vendors/nightware.html",

    backText:
      "← BACK TO MARKET",

    backHref:
      "market.html",

    footer:
      "TASTE MY NIGHTMARE // NIGHTWARE",

    returnText:
      "RETURN TO NIGHTWARE ›",

    returnHref:
      "vendors/nightware.html",

    metaThemeColor:
      "#020402",

    squareCard: {
      border:
        "rgba(98,255,58,0.32)",

      focus:
        "#8cff6c",

      background:
        "#050805",

      text:
        "#f4fff1",

      placeholder:
        "#72956c",

      error:
        "#ff5151"
    }
  },


  nightshade: {
    bodyClass:
      "theme-nightshade",

    brandName:
      "NIGHTSHADE PRODUCTIONS",

    kicker:
      "NIGHTSHADE PRODUCTIONS // COMMISSION",

    headlineTop:
      "SEAL THE",

    headlineAccent:
      "COMMISSION.",

    intro:
      "Review your selected production service, enter your client details, and secure the commission.",

    orderCode:
      "PROJECT // 01",

    paymentCode:
      "CLIENT PAYMENT // 02",

    payButton:
      "COMMISSION PROJECT",

    successCode:
      "COMMISSION ACCEPTED",

    successHeading:
      "NIGHTSHADE PRODUCTIONS HAS YOUR COMMISSION.",

    editText:
      "← EDIT PRODUCTION ORDER",

    editHref:
      "vendors/nightshade.html",

    backText:
      "← BACK TO MARKET",

    backHref:
      "market.html",

    footer:
      "TASTE MY NIGHTMARE // NIGHTSHADE PRODUCTIONS",

    returnText:
      "RETURN TO NIGHTSHADE PRODUCTIONS ›",

    returnHref:
      "vendors/nightshade.html",

    metaThemeColor:
      "#03070c",

    squareCard: {
      border:
        "rgba(207,227,244,0.25)",

      focus:
        "#9bd3ff",

      background:
        "#07101a",

      text:
        "#f7fbff",

      placeholder:
        "#8699a9",

      error:
        "#ff6868"
    }
  }

};


/* =========================================================
   THEME DETECTION

   checkout-theme.js runs before CSS and saves the resolved
   theme on <html data-checkout-theme="...">.

   We use that value here so visual theme + checkout wording
   can never drift apart.
   ========================================================= */

function getActiveThemeKey() {
  const bootstrapped =
    document.documentElement.dataset.checkoutTheme ||
    window.TMN_CHECKOUT_THEME;

  if (CHECKOUT_THEMES[bootstrapped]) {
    return bootstrapped;
  }

  const vendorsInCart = [
    ...new Set(
      Object.entries(loadCart())
        .filter(([, quantity]) => {
          return Number.isInteger(quantity) && quantity > 0;
        })
        .map(([productId]) => {
          return CHECKOUT_PRODUCTS[productId]?.vendorKey;
        })
        .filter(Boolean)
    )
  ];

  if (vendorsInCart.length === 1 && CHECKOUT_THEMES[vendorsInCart[0]]) {
    return vendorsInCart[0];
  }

  if (vendorsInCart.length > 1) {
    return "bloodmarket";
  }

  const params = new URLSearchParams(window.location.search);
  const requested = (params.get("vendor") || "").toLowerCase().trim();

  return CHECKOUT_THEMES[requested]
    ? requested
    : "bloodmarket";
}


const activeThemeKey =
  getActiveThemeKey();

const activeTheme =
  CHECKOUT_THEMES[
    activeThemeKey
  ];


/* =========================================================
   ELEMENTS
   ========================================================= */

const checkoutItems =
  document.getElementById(
    "checkoutItems"
  );

const checkoutItemCount =
  document.getElementById(
    "checkoutItemCount"
  );

const checkoutTotal =
  document.getElementById(
    "checkoutTotal"
  );

const checkoutEmpty =
  document.getElementById(
    "checkoutEmpty"
  );

const payButton =
  document.getElementById(
    "payButton"
  );

const payButtonLabel =
  document.getElementById(
    "payButtonLabel"
  );

const payButtonTotal =
  document.getElementById(
    "payButtonTotal"
  );

const paymentForm =
  document.getElementById(
    "tmnPaymentForm"
  );

const paymentStatus =
  document.getElementById(
    "paymentStatus"
  );

const paymentSuccess =
  document.getElementById(
    "paymentSuccess"
  );

const successMessage =
  document.getElementById(
    "successMessage"
  );

const squareReceiptLink =
  document.getElementById(
    "squareReceiptLink"
  );


let card;
let squareConfig;
let cart =
  loadCart();


/* =========================================================
   APPLY THEME
   ========================================================= */

function setText(
  id,
  text
) {
  const element =
    document.getElementById(
      id
    );

  if (element) {
    element.textContent =
      text;
  }
}


function setLink(
  id,
  text,
  href
) {
  const element =
    document.getElementById(
      id
    );

  if (!element) {
    return;
  }

  element.textContent =
    text;

  element.href =
    href;
}


function applyTheme() {
  document.documentElement.dataset.checkoutTheme =
    activeThemeKey;

  document.body.classList.remove(
    "theme-bloodmarket",
    "theme-munchies",
    "theme-nightware",
    "theme-nightshade"
  );

  document.body.classList.add(
    activeTheme.bodyClass
  );

  document.documentElement.style
    .setProperty(
      "--active-theme",
      activeThemeKey
    );

  const themeMeta =
    document.querySelector(
      'meta[name="theme-color"]'
    );

  if (themeMeta) {
    themeMeta.setAttribute(
      "content",
      activeTheme.metaThemeColor
    );
  }

  setText(
    "checkoutBrandName",
    activeTheme.brandName
  );

  setText(
    "checkoutKicker",
    activeTheme.kicker
  );

  const headline =
    document.getElementById(
      "checkoutHeadline"
    );

  if (headline) {
    headline.innerHTML = `
      ${activeTheme.headlineTop}
      <span>
        ${activeTheme.headlineAccent}
      </span>
    `;
  }

  setText(
    "checkoutIntroCopy",
    activeTheme.intro
  );

  setText(
    "orderPanelCode",
    activeTheme.orderCode
  );

  setText(
    "paymentPanelCode",
    activeTheme.paymentCode
  );

  setText(
    "payButtonLabel",
    activeTheme.payButton
  );

  setText(
    "successCode",
    activeTheme.successCode
  );

  setText(
    "successHeading",
    activeTheme.successHeading
  );

  setText(
    "checkoutFooterBrand",
    activeTheme.footer
  );

  setLink(
    "checkoutEditLink",
    activeTheme.editText,
    activeTheme.editHref
  );

  setLink(
    "checkoutBackLink",
    activeTheme.backText,
    activeTheme.backHref
  );

  setLink(
    "successReturnLink",
    activeTheme.returnText,
    activeTheme.returnHref
  );
}


/* =========================================================
   LOAD CART
   ========================================================= */

function loadCart() {
  try {
    /*
      Nightmare Munchies is currently the live cart.

      Nightware + Nightshade will plug into this same checkout
      later without changing the theme engine.
    */
    const stored =
      localStorage.getItem(
        MUNCHIES_CART_KEY
      );

    if (!stored) {
      return {};
    }

    const parsed =
      JSON.parse(stored);

    return (
      parsed &&
      typeof parsed === "object"
    )
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


/* =========================================================
   CART HELPERS
   ========================================================= */

function getValidCartEntries() {
  return Object
    .entries(cart)
    .filter(
      (
        [
          productId,
          quantity
        ]
      ) =>
        CHECKOUT_PRODUCTS[
          productId
        ] &&
        Number.isInteger(
          quantity
        ) &&
        quantity > 0
    );
}


function getItemCount() {
  return getValidCartEntries()
    .reduce(
      (
        total,
        [, quantity]
      ) =>
        total + quantity,
      0
    );
}


function getSubtotal() {
  return getValidCartEntries()
    .reduce(
      (
        total,
        [
          productId,
          quantity
        ]
      ) => {
        return (
          total +
          CHECKOUT_PRODUCTS[
            productId
          ].price *
          quantity
        );
      },
      0
    );
}


function formatMoney(
  cents
) {
  return new Intl.NumberFormat(
    "en-US",
    {
      style:
        "currency",

      currency:
        "USD"
    }
  ).format(
    cents / 100
  );
}


/* =========================================================
   ORDER RENDER
   ========================================================= */

function renderOrder() {
  const entries =
    getValidCartEntries();

  checkoutItems.innerHTML =
    "";

  const count =
    getItemCount();

  const subtotal =
    getSubtotal();

  checkoutItemCount.textContent =
    `${count} ${
      count === 1
        ? "ITEM"
        : "ITEMS"
    }`;

  checkoutTotal.textContent =
    formatMoney(
      subtotal
    );

  payButtonTotal.textContent =
    formatMoney(
      subtotal
    );

  checkoutEmpty.hidden =
    entries.length > 0;


  entries.forEach(
    (
      [
        productId,
        quantity
      ]
    ) => {

      const product =
        CHECKOUT_PRODUCTS[
          productId
        ];

      const line =
        document.createElement(
          "div"
        );

      line.className =
        "checkout-line-item";

      line.innerHTML = `
        <div class="checkout-line-copy">

          <strong>
            ${product.name}
          </strong>

          <span>
            ${product.vendor}
            // ${quantity}
            × ${formatMoney(product.price)}
          </span>

        </div>

        <span class="checkout-line-total">
          ${formatMoney(
            product.price *
            quantity
          )}
        </span>
      `;

      checkoutItems
        .appendChild(
          line
        );
    }
  );


  if (
    entries.length === 0
  ) {
    payButton.disabled =
      true;

    setStatus(
      "Your cart is empty. Return to the Blood Market to add an item.",
      true
    );
  }
}


/* =========================================================
   STATUS
   ========================================================= */

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


/* =========================================================
   SQUARE CONFIG
   ========================================================= */

async function fetchSquareConfig() {
  const response =
    await fetchFromTmnApi(
      "/config"
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


/* =========================================================
   LOAD SQUARE SDK
   ========================================================= */

function loadSquareSdk(
  environment
) {
  return new Promise(
    (
      resolve,
      reject
    ) => {

      if (
        window.Square
      ) {
        resolve();
        return;
      }

      const script =
        document.createElement(
          "script"
        );

      script.src =
        environment ===
        "production"
          ? "https://web.squarecdn.com/v1/square.js"
          : "https://sandbox.web.squarecdn.com/v1/square.js";

      script.async =
        true;

      script.onload =
        () => resolve();

      script.onerror =
        () =>
          reject(
            new Error(
              "Square's secure payment form could not load."
            )
          );

      document.head
        .appendChild(
          script
        );
    }
  );
}


/* =========================================================
   SQUARE CARD STYLE
   ========================================================= */

function getSquareCardStyle() {
  const theme =
    activeTheme
      .squareCard;

  return {

    ".input-container": {
      borderColor:
        theme.border,

      borderRadius:
        activeThemeKey ===
        "munchies"
          ? "16px"
          : activeThemeKey ===
            "nightshade"
            ? "5px"
            : "0px"
    },


    ".input-container.is-focus": {
      borderColor:
        theme.focus
    },


    ".input-container.is-error": {
      borderColor:
        theme.error
    },


    ".message-text": {
      color:
        theme.placeholder
    },


    ".message-icon": {
      color:
        theme.placeholder
    },


    ".message-text.is-error": {
      color:
        theme.error
    },


    ".message-icon.is-error": {
      color:
        theme.error
    },


    "input": {
      backgroundColor:
        theme.background,

      color:
        theme.text,

      fontFamily:
        "Arial, sans-serif",

      fontSize:
        "16px"
    },


    "input::placeholder": {
      color:
        theme.placeholder
    },


    "input.is-error": {
      color:
        theme.error
    }

  };
}


/* =========================================================
   INITIALIZE SQUARE CARD
   ========================================================= */

async function initializeSquareCard() {
  squareConfig =
    await fetchSquareConfig();

  await loadSquareSdk(
    squareConfig.environment
  );

  if (
    !window.Square
  ) {
    throw new Error(
      "Square Web Payments SDK is unavailable."
    );
  }

  const payments =
    window.Square.payments(
      squareConfig.applicationId,
      squareConfig.locationId
    );

  card =
    await payments.card({
      style:
        getSquareCardStyle()
    });

  await card.attach(
    "#card-container"
  );

  if (
    getItemCount() > 0
  ) {
    payButton.disabled =
      false;
  }

  setStatus("");
}


/* =========================================================
   BUYER DETAILS
   ========================================================= */

function validateBuyerFields() {
  const firstName =
    document
      .getElementById(
        "firstName"
      )
      .value
      .trim();

  const lastName =
    document
      .getElementById(
        "lastName"
      )
      .value
      .trim();

  const email =
    document
      .getElementById(
        "email"
      )
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


/* =========================================================
   VERIFICATION DETAILS
   ========================================================= */

function buildVerificationDetails(
  buyer
) {
  return {

    amount:
      (
        getSubtotal() /
        100
      ).toFixed(2),

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


/* =========================================================
   CREATE PAYMENT
   ========================================================= */

async function createPayment(
  sourceId,
  buyer
) {
  const items =
    getValidCartEntries()
      .map(
        (
          [
            id,
            quantity
          ]
        ) => ({
          id,
          quantity
        })
      );


  const response =
    await fetchFromTmnApi(
      "/create-payment",
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


/* =========================================================
   SUCCESS
   ========================================================= */

function showPaymentSuccess(
  result
) {
  paymentForm.hidden =
    true;

  paymentSuccess.hidden =
    false;


  const paymentId =
    result.paymentId ||
    "";


  successMessage.textContent =
    paymentId
      ? `Payment complete. Square payment ${paymentId} was accepted.`
      : "Payment complete.";


  if (
    result.receiptUrl
  ) {
    squareReceiptLink.href =
      result.receiptUrl;

    squareReceiptLink.hidden =
      false;
  }


  /*
    Current live storefront:
    Nightmare Munchies
  */
  localStorage.removeItem(
    MUNCHIES_CART_KEY
  );

  cart = {};
}


/* =========================================================
   SUBMIT PAYMENT
   ========================================================= */

paymentForm.addEventListener(
  "submit",
  async (
    event
  ) => {

    event.preventDefault();


    if (!card) {
      setStatus(
        "The secure card form is still loading.",
        true
      );

      return;
    }


    if (
      getItemCount() < 1
    ) {
      setStatus(
        "Your cart is empty.",
        true
      );

      return;
    }


    payButton.disabled =
      true;


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
        tokenResult.status !==
        "OK"
      ) {
        console.error(
          "Square tokenization error:",
          tokenResult.errors
        );

        throw new Error(
          tokenResult
            .errors?.[0]
            ?.message ||
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


      payButton.disabled =
        false;
    }
  }
);


/* =========================================================
   START CHECKOUT
   ========================================================= */

async function startCheckout() {
  applyTheme();

  renderOrder();


  if (
    getItemCount() < 1
  ) {
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
