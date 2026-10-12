"use strict";

const printButton = document.querySelector("#print-process");
const moodButtons = [...document.querySelectorAll("[data-mood]")];
const moodStatus = document.querySelector("#mood-status");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const DEFAULT_MOOD_LABEL = "That’s my mood ♡";
const SELECTED_MOOD_LABEL = "My sweet mood! ✦";

const moods = [
  {
    name: "Classic Paris",
    message: "You’re giving classic sweetheart. Strawberries, smiles & a little chocolate magic.",
    color: "#FF9AAE",
  },
  {
    name: "Cookies & Dream",
    message: "Cozy daydream activated. Cookie crumbs, soft blankets & absolutely no rushing.",
    color: "#64B4E3",
  },
  {
    name: "Berry Bliss",
    message: "Berry bubbly looks good on you. A little sparkle, a little sweetness, a lot of joy.",
    color: "#C9AEFF",
  },
  {
    name: "Caramel Apple",
    message: "Comfort craving unlocked. Warm caramel hugs & cinnamon-sweet little moments.",
    color: "#F7BB55",
  },
  {
    name: "Midnight Chocolate",
    message: "After-dark mischief is your mood. Extra chocolate. Extra personality.",
    color: "#B41831",
  },
  {
    name: "Tropical Paradise",
    message: "Sunshine state of mind. Mango dreams, golden afternoons & tiny tropical escapes.",
    color: "#B8E981",
  },
];

function sprinkle(card) {
  if (!card || reduceMotion.matches) return;

  for (let index = 0; index < 7; index += 1) {
    const sparkle = document.createElement("span");

    sparkle.className = "mood-sparkle";
    sparkle.textContent = index % 2 ? "♡" : "✦";
    sparkle.setAttribute("aria-hidden", "true");
    sparkle.style.setProperty("--spark-x", `${(index - 3) * 35}px`);
    sparkle.style.setProperty("--spark-y", `${-90 - (index % 3) * 25}px`);

    card.append(sparkle);
    sparkle.addEventListener("animationend", () => sparkle.remove(), { once: true });
    window.setTimeout(() => sparkle.remove(), 1400);
  }
}

function selectMood(selectedButton) {
  const mood = moods[Number(selectedButton.dataset.mood)];
  const selectedCard = selectedButton.closest(".flavor-card");

  if (!mood || !moodStatus) return;

  moodButtons.forEach((button) => {
    const isSelected = button === selectedButton;
    const card = button.closest(".flavor-card");

    button.setAttribute("aria-pressed", String(isSelected));
    button.textContent = isSelected ? SELECTED_MOOD_LABEL : DEFAULT_MOOD_LABEL;
    card?.classList.toggle("is-selected", isSelected);
  });

  moodStatus.textContent = `${mood.name} ♡ ${mood.message}`;
  moodStatus.style.setProperty("--mood-color", mood.color);
  sprinkle(selectedCard);
}

if (printButton) {
  printButton.addEventListener("click", () => window.print());
}

// Keep the content readable without JavaScript; reveal interactivity only when ready.
moodButtons.forEach((button) => {
  button.hidden = false;
  button.addEventListener("click", () => selectMood(button));
});