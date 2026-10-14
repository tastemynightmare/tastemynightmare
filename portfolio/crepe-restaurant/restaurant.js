"use strict";

// Prices and ingredients follow the supplied campaign menu. Amounts are cents.
const menu = [
  { id: "classic", category: "signature", name: "Classic Paris", price: 1250, color: "#ff9aae", description: "Strawberries, banana, chocolate chunks, vanilla ice cream, strawberry syrup, and whipped cream." },
  { id: "cookies", category: "signature", name: "Cookies & Dream", price: 1250, color: "#64b4e3", description: "Chocolate cookies, vanilla ice cream, chocolate syrup, and whipped cream." },
  { id: "berry", category: "signature", name: "Berry Bliss Explosion", price: 1250, color: "#c9aeff", description: "Blueberries, raspberries, strawberries, vanilla ice cream, and blueberry syrup." },
  { id: "apple", category: "signature", name: "Caramel Apple Delight", price: 1250, color: "#f7bb55", description: "Apple slices, caramel chunks, vanilla ice cream, caramel syrup, and whipped cream." },
  { id: "midnight", category: "signature", name: "Midnight Chocolate", price: 1250, color: "#b41831", description: "Brownie chunks, chocolate chunks, vanilla ice cream, chocolate syrup, and whipped cream." },
  { id: "tropical", category: "signature", name: "Tropical Paradise", price: 1250, color: "#b8e981", description: "Pineapple chunks, mango chunks, vanilla ice cream, mango syrup, and whipped cream." },
  { id: "cheesecake", category: "folded", name: "Strawberry Cheesecake Crêpe", price: 850, color: "#ff9aae", description: "Strawberry slices, cheesecake bites, strawberry syrup, and whipped cream." },
  { id: "smores", category: "folded", name: "S’mores Crepe Dream", price: 850, color: "#d19745", description: "Chocolate chunks, marshmallows, graham cracker crumbles, chocolate syrup, and whipped cream." },
  { id: "banana", category: "folded", name: "Banana Cream Crepe", price: 850, color: "#f7bb55", description: "Banana slices, cheesecake bites, caramel syrup, and whipped cream." },
  { id: "blueberry", category: "folded", name: "Blueberry Cheesecake Crepe", price: 850, color: "#c9aeff", description: "Blueberry slices, cheesecake bites, blueberry syrup, and whipped cream." },
  { id: "mini", category: "bites", name: "Mini Crepe Bites", price: 625, color: "#d19745", description: "A little bite of the Crêpe menu." },
  { id: "fries", category: "bites", name: "Cinnamon Sugar Fries", price: 425, color: "#f7bb55", description: "The cinnamon-sweet side of your dessert break." },
  { id: "fruit", category: "bites", name: "Fruit Cup Starter", price: 650, color: "#ff9aae", description: "A fruity little start to your sweet mood." },
  { id: "strawberries", category: "bites", name: "Chocolate Dipped Strawberries", price: 675, color: "#b41831", description: "Strawberries meet chocolate. A classic little pairing." },
  { id: "icecream", category: "extras", name: "Vanilla Ice Cream Scoops (2)", price: 625, color: "#f7bb55", description: "Two scoops of vanilla ice cream." },
  { id: "cream", category: "extras", name: "Whipped Cream Cup", price: 225, color: "#ff9aae", description: "A little extra whipped cream." },
  { id: "granola", category: "extras", name: "Granola Crunch Topping", price: 125, color: "#d19745", description: "Add a little crunch to your sample order." },
];

const categoryLabels = {
  signature: "Signature crêpes",
  folded: "Folded favorites",
  bites: "Little bites",
  extras: "Extra toppings",
};
const money = cents => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
const products = new Map(menu.map(item => [item.id, item]));
const bag = new Map();
const grid = document.querySelector("#menu-grid");
const bagDialog = document.querySelector("#bag-dialog");
const checkoutDialog = document.querySelector("#checkout-dialog");
const completeDialog = document.querySelector("#complete-dialog");
const bagItems = document.querySelector("#bag-items");
const bagStatus = document.querySelector("#bag-status");
const checkoutButton = document.querySelector("#checkout-button");
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderMenu(category) {
  const items = menu.filter(item => item.category === category);
  const cards = items.map((item, index) => {
    const card = element("article", "menu-card");
    card.style.setProperty("--flavor", item.color);
    const top = element("div", "card-top");
    const dot = element("span", "card-dot");
    dot.setAttribute("aria-hidden", "true");
    top.append(element("span", "", `${String(index + 1).padStart(2, "0")} / ${categoryLabels[category]}`), dot);
    const bottom = element("div", "card-bottom");
    const add = element("button", "add-button", "Add to bag +");
    add.type = "button";
    add.setAttribute("aria-label", `Add ${item.name} to your bag`);
    add.addEventListener("click", () => {
      const quantity = bag.get(item.id) || 0;
      if (quantity >= 20) {
        bagStatus.textContent = `The demo allows up to 20 of each item. ${item.name} is already at the limit.`;
        return;
      }
      bag.set(item.id, quantity + 1);
      updateBag();
      bagStatus.textContent = `${item.name} added. Your bag has ${itemCount()} ${itemCount() === 1 ? "item" : "items"}.`;
    });
    bottom.append(element("strong", "", money(item.price)), add);
    card.append(top, element("h3", "", item.name), element("p", "", item.description), bottom);
    return card;
  });
  grid.replaceChildren(...cards);
  document.querySelector("#menu-status").textContent = `${items.length} ${categoryLabels[category].toLowerCase()} shown.`;
}

function subtotal() {
  return [...bag].reduce((sum, [id, quantity]) => sum + products.get(id).price * quantity, 0);
}

function itemCount() {
  return [...bag.values()].reduce((sum, quantity) => sum + quantity, 0);
}

function updateBag() {
  const count = itemCount();
  document.querySelectorAll(".bag-count").forEach(node => { node.textContent = count; });
  document.querySelector("[data-open-bag]").setAttribute("aria-label", `Open your bag, ${count} ${count === 1 ? "item" : "items"}`);
  document.querySelector("#bag-total").textContent = money(subtotal());
  document.querySelector("#checkout-total").textContent = money(subtotal());
  checkoutButton.disabled = count === 0;
}

function renderBag(focusId, focusAction) {
  if (!bag.size) {
    bagItems.replaceChildren(element("p", "", "Your bag is waiting for a little joy. Explore the menu to add your first sweet pick."));
    if (focusId) checkoutButton.nextElementSibling.focus();
    return;
  }
  const rows = [...bag].map(([id, quantity]) => {
    const item = products.get(id);
    const row = element("div", "bag-line");
    const info = element("div");
    info.append(element("h3", "", item.name), element("p", "", `${money(item.price)} each · ${money(item.price * quantity)}`));
    const controls = element("div", "quantity");
    const output = element("output", "", quantity);
    output.setAttribute("aria-label", `Quantity of ${item.name}`);
    ["decrease", "increase"].forEach(action => {
      const button = element("button", "", action === "decrease" ? "−" : "+");
      button.type = "button";
      button.dataset.id = id;
      button.dataset.action = action;
      button.setAttribute("aria-label", `${action === "decrease" ? "Decrease" : "Increase"} ${item.name} quantity`);
      button.disabled = action === "increase" && quantity >= 20;
      button.addEventListener("click", () => {
        const next = quantity + (action === "decrease" ? -1 : 1);
        if (next <= 0) bag.delete(id);
        else bag.set(id, next);
        updateBag();
        renderBag(id, action);
        bagStatus.textContent = `${item.name} ${next ? `quantity ${next}` : "removed"}. Subtotal ${money(subtotal())}.`;
      });
      controls.append(button);
      if (action === "decrease") controls.append(output);
    });
    const remove = element("button", "remove", "Remove");
    remove.type = "button";
    remove.dataset.id = id;
    remove.dataset.action = "remove";
    remove.setAttribute("aria-label", `Remove ${item.name} from your bag`);
    remove.addEventListener("click", () => {
      bag.delete(id);
      updateBag();
      renderBag(id, "remove");
      bagStatus.textContent = `${item.name} removed. Subtotal ${money(subtotal())}.`;
    });
    row.append(info, controls, remove);
    return row;
  });
  bagItems.replaceChildren(...rows);
  if (focusId) {
    const candidates = [...bagItems.querySelectorAll("button")];
    const exact = candidates.find(button => button.dataset.id === focusId && button.dataset.action === focusAction && !button.disabled);
    (exact || candidates.find(button => !button.disabled) || checkoutButton).focus();
  }
}

function setNav(open) {
  toggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("open", open);
}

toggle.addEventListener("click", () => setNav(toggle.getAttribute("aria-expanded") !== "true"));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setNav(false)));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
    setNav(false);
    toggle.focus();
  }
});
window.matchMedia("(min-width: 761px)").addEventListener("change", event => {
  if (event.matches) setNav(false);
});

document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-category]").forEach(other => other.setAttribute("aria-pressed", String(other === button)));
    renderMenu(button.dataset.category);
  });
});
document.querySelector(".filters").hidden = false;
document.querySelector("[data-open-bag]").addEventListener("click", () => {
  renderBag();
  bagDialog.showModal();
});
document.querySelectorAll("[data-close-dialog]").forEach(button => {
  button.addEventListener("click", () => button.closest("dialog").close());
});
checkoutButton.addEventListener("click", () => {
  if (!bag.size) return;
  bagDialog.close();
  checkoutDialog.showModal();
});
document.querySelector("#checkout-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity() || !bag.size) return;
  const name = form.elements.name.value.trim();
  if (!name) {
    form.elements.name.setCustomValidity("Enter a first name or nickname for this demo.");
    form.elements.name.reportValidity();
    return;
  }
  document.querySelector("#complete-summary").textContent = `${name}, you tried a sample bag of ${itemCount()} ${itemCount() === 1 ? "item" : "items"} for ${money(subtotal())}, with an example pickup ${form.elements.time.value.toLowerCase()}.`;
  checkoutDialog.close();
  completeDialog.showModal();
});
document.querySelector("#pickup-name").addEventListener("input", event => event.target.setCustomValidity(""));
// Native dialogs trap focus, support Escape, and return focus to their opener.
// For the multi-dialog flow, restore the persistent bag opener at the end.
[checkoutDialog, completeDialog].forEach(dialog => {
  dialog.addEventListener("close", () => {
    if (!document.querySelector("dialog[open]")) document.querySelector("[data-open-bag]").focus();
  });
});

renderMenu("signature");
updateBag();
