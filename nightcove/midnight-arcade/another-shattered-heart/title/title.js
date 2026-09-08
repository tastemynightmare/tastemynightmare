const newGame = document.getElementById("newGame");
const continueGame = document.getElementById("continueGame");
const storyButton = document.getElementById("storyButton");
const extrasButton = document.getElementById("extrasButton");
const storyModal = document.getElementById("storyModal");
const extrasModal = document.getElementById("extrasModal");
const fragmentName = document.getElementById("fragmentName");
const handCount = document.getElementById("handCount");
const flash = document.getElementById("flash");
const emberContainer = document.getElementById("embers");
const title = document.querySelector(".game-title");

/* NEW GAME */

newGame.addEventListener("click", startGame);

function startGame() {
  document.body.classList.add("starting");

  flash.style.transition = "opacity .12s";
  flash.style.opacity = ".75";

  setTimeout(() => {
    flash.style.opacity = "0";
  }, 120);

  setTimeout(() => {
    window.location.href = "game.html";
  }, 700);
}

/* CONTINUE */

continueGame.addEventListener("click", () => {
  const save = localStorage.getItem("ashGameSave");

  if (save) {
    window.location.href = "game.html";
    return;
  }

  fragmentName.textContent = "NO MEMORY FOUND.";
  continueGame.classList.add("glitching");

  setTimeout(() => {
    continueGame.classList.remove("glitching");
  }, 700);
});

/* MODALS */

storyButton.addEventListener("click", () => {
  storyModal.showModal();
});

extrasButton.addEventListener("click", () => {
  extrasModal.showModal();
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});

/* FRAGMENT LABELS */

document.querySelectorAll(".fragment").forEach((fragment) => {
  fragment.addEventListener("mouseenter", () => {
    fragmentName.textContent = fragment.dataset.name;
  });

  fragment.addEventListener("mouseleave", () => {
    fragmentName.textContent = "ONE MORE HAND.";
  });
});

/* EMBERS */

function createEmber() {
  const ember = document.createElement("span");

  ember.classList.add("ember");
  ember.style.left = Math.random() * 100 + "vw";
  ember.style.animationDuration = (4 + Math.random() * 7) + "s";
  ember.style.opacity = Math.random();

  const size = 1 + Math.random() * 4;

  ember.style.width = size + "px";
  ember.style.height = size + "px";

  emberContainer.appendChild(ember);

  setTimeout(() => {
    ember.remove();
  }, 12000);
}

setInterval(createEmber, 180);

/* RANDOM TITLE GLITCH */

function randomGlitch() {
  title.classList.add("glitching");

  setTimeout(() => {
    title.classList.remove("glitching");
  }, 500);

  const next = 3500 + Math.random() * 7000;
  setTimeout(randomGlitch, next);
}

setTimeout(randomGlitch, 2500);

/* 26TH HAND EASTER EGG */

let secretClicks = 0;

handCount.addEventListener("click", () => {
  secretClicks++;

  if (secretClicks === 1) {
    handCount.textContent = "25 / 26";
  }

  if (secretClicks === 2) {
    handCount.textContent = "25 / 26";
    fragmentName.textContent = "ONE IS MISSING.";
  }

  if (secretClicks >= 3) {
    handCount.textContent = "26 / 26";
    fragmentName.textContent = "YOU SHOULDN'T HAVE DONE THAT.";

    document.body.classList.add("glitching");
    flash.style.opacity = ".5";

    setTimeout(() => {
      flash.style.opacity = "0";
      document.body.classList.remove("glitching");
      handCount.textContent = "-- / 26";
    }, 500);

    secretClicks = 0;
  }
});