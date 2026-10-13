"use strict";

const printButton = document.querySelector("#print-process");
const moodButtons = [...document.querySelectorAll("[data-mood]")];
const moodStatus = document.querySelector("#mood-status");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const DEFAULT_MOOD_LABEL = "That’s my mood ♡";
const SELECTED_MOOD_LABEL = "My sweet mood! ✦";

const moods = [
  { name: "Classic Paris", message: "You’re giving classic sweetheart. Strawberries, smiles & a little chocolate magic.", color: "#FF9AAE" },
  { name: "Cookies & Dream", message: "Cozy daydream activated. Cookie crumbs, soft blankets & absolutely no rushing.", color: "#64B4E3" },
  { name: "Berry Bliss", message: "Berry bubbly looks good on you. A little sparkle, a little sweetness, a lot of joy.", color: "#C9AEFF" },
  { name: "Caramel Apple", message: "Comfort craving unlocked. Warm caramel hugs & cinnamon-sweet little moments.", color: "#F7BB55" },
  { name: "Midnight Chocolate", message: "After-dark mischief is your mood. Extra chocolate. Extra personality.", color: "#B41831" },
  { name: "Tropical Paradise", message: "Sunshine state of mind. Mango dreams, golden afternoons & tiny tropical escapes.", color: "#B8E981" },
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
  if (!mood || !moodStatus) return;
  moodButtons.forEach((button) => {
    const isSelected = button === selectedButton;
    button.setAttribute("aria-pressed", String(isSelected));
    button.textContent = isSelected ? SELECTED_MOOD_LABEL : DEFAULT_MOOD_LABEL;
    button.closest(".flavor-card")?.classList.toggle("is-selected", isSelected);
  });
  moodStatus.textContent = `${mood.name} ♡ ${mood.message}`;
  moodStatus.style.setProperty("--mood-color", mood.color);
  sprinkle(selectedButton.closest(".flavor-card"));
}

if (printButton) printButton.addEventListener("click", () => window.print());
if (moodStatus) {
  moodButtons.forEach((button) => {
    if (!moods[Number(button.dataset.mood)]) return;
    button.hidden = false;
    button.addEventListener("click", () => selectMood(button));
  });
}

const ribbon = document.querySelector(".sweet-ribbon");
const ribbonControl = document.querySelector(".ribbon-control");
const ribbonGroups = [...document.querySelectorAll(".ribbon-group")];

if (ribbon && ribbonControl && ribbonGroups.length === 2) {
  const originalSpan = ribbonGroups[0].firstElementChild.cloneNode(true);

  function fillRibbon() {
    ribbonGroups[0].replaceChildren(originalSpan.cloneNode(true));
    const unitWidth = ribbonGroups[0].firstElementChild.getBoundingClientRect().width;
    if (!unitWidth) return;
    const copies = Math.max(1, Math.ceil(ribbon.clientWidth / unitWidth));
    for (let index = 1; index < copies; index += 1) {
      ribbonGroups[0].append(originalSpan.cloneNode(true));
    }
    ribbonGroups[1].replaceChildren(...[...ribbonGroups[0].children].map((span) => span.cloneNode(true)));
  }

  fillRibbon();
  if ("ResizeObserver" in window) new ResizeObserver(fillRibbon).observe(ribbon);
  else window.addEventListener("resize", fillRibbon);
  if (document.fonts) document.fonts.ready.then(fillRibbon);

  ribbonControl.hidden = false;
  ribbonControl.addEventListener("click", () => {
    const paused = ribbonControl.getAttribute("aria-pressed") !== "true";
    ribbon.classList.toggle("is-paused", paused);
    ribbonControl.setAttribute("aria-pressed", String(paused));
    ribbonControl.setAttribute("aria-label", paused ? "Resume scrolling ribbon" : "Pause scrolling ribbon");
    ribbonControl.textContent = paused ? "Play" : "Pause";
  });
}
