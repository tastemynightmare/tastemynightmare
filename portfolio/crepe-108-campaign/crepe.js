"use strict";

const printButton = document.querySelector("#print-process");

if (printButton) {
  printButton.addEventListener("click", () => window.print());
}

// Content stays readable without JavaScript. Mood buttons appear when ready.
const moodButtons = [...document.querySelectorAll("[data-mood]")];
const moodStatus = document.querySelector("#mood-status");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const moods = [
  { name: "Classic Paris", message: "You’re giving classic sweetheart. Strawberries, smiles & a little chocolate magic.", color: "#FF9AAE" },
  { name: "Cookies & Dream", message: "Cozy daydream activated. Cookie crumbs, soft blankets & absolutely no rushing.", color: "#64B4E3" },
  { name: "Berry Bliss", message: "Berry bubbly looks good on you. A little sparkle, a little sweetness, a lot of joy.", color: "#C9AEFF" },
  { name: "Caramel Apple", message: "Comfort craving unlocked. Warm caramel hugs & cinnamon-sweet little moments.", color: "#F7BB55" },
  { name: "Midnight Chocolate", message: "After-dark mischief is your mood. Extra chocolate. Extra personality.", color: "#B41831" },
  { name: "Tropical Paradise", message: "Sunshine state of mind. Mango dreams, golden afternoons & tiny tropical escapes.", color: "#B8E981" }
];

function sprinkle(button) {
  if (reduceMotion.matches) return;

  const card = button.closest(".flavor-card");

  for (let index = 0; index < 7; index += 1) {
    const star = document.createElement("span");
    star.className = "mood-sparkle";
    star.textContent = index % 2 ? "♡" : "✦";
    star.setAttribute("aria-hidden", "true");
    star.style.setProperty("--spark-x", `${(index - 3) * 35}px`);
    star.style.setProperty("--spark-y", `${-90 - (index % 3) * 25}px`);
    card.append(star);
    star.addEventListener("animationend", () => star.remove(), { once: true });
    window.setTimeout(() => star.remove(), 1400);
  }
}

moodButtons.forEach((button) => {
  button.hidden = false;
  button.addEventListener("click", () => {
    const mood = moods[Number(button.dataset.mood)];

    moodButtons.forEach((other) => {
      const selected = other === button;
      other.setAttribute("aria-pressed", String(selected));
      other.closest(".flavor-card").classList.toggle("is-selected", selected);
      other.textContent = selected ? "My sweet mood! ✦" : "That’s my mood ♡";
    });

    moodStatus.textContent = `${mood.name} ♡ ${mood.message}`;
    moodStatus.style.setProperty("--mood-color", mood.color);
    sprinkle(button);
  });
});