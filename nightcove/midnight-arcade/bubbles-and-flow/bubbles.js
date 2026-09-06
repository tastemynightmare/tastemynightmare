document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =====================================================
     HELPERS
  ====================================================== */

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  function openModal(modal) {
    if (!modal) return;

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const focusTarget =
      $(".modal__close", modal) ||
      $("a, button, [tabindex]:not([tabindex='-1'])", modal);

    if (focusTarget) {
      requestAnimationFrame(() => focusTarget.focus());
    }
  }

  function closeModal(modal) {
    if (!modal) return;

    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");

    if ($$(".modal:not([hidden])").length === 0) {
      document.body.classList.remove("modal-open");
    }
  }

  /* =====================================================
     FLOATING STARFIELD
  ====================================================== */

  const starfield = $("#starfield");

  if (starfield) {
    const starCount = window.innerWidth < 700 ? 45 : 80;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i += 1) {
      const star = document.createElement("span");

      if (i % 8 === 0) {
        star.className = "star star--sparkle";
      } else if (i % 5 === 0) {
        star.className = "star star--pink";
      } else if (i % 3 === 0) {
        star.className = "star star--blue";
      } else {
        star.className = "star";
      }

      const size =
        i % 8 === 0
          ? Math.random() * 5 + 5
          : Math.random() * 2.4 + 1.2;

      star.style.setProperty("--x", `${Math.random() * 100}%`);
      star.style.setProperty("--y", `${Math.random() * 120}%`);
      star.style.setProperty("--size", `${size.toFixed(2)}px`);
      star.style.setProperty("--duration", `${(Math.random() * 24 + 24).toFixed(2)}s`);
      star.style.setProperty("--delay", `${(Math.random() * -40).toFixed(2)}s`);
      star.style.setProperty("--twinkle", `${(Math.random() * 2 + 1.3).toFixed(2)}s`);
      star.style.setProperty("--twinkle-delay", `${(Math.random() * -3).toFixed(2)}s`);
      star.style.setProperty("--opacity", `${(Math.random() * 0.45 + 0.5).toFixed(2)}`);
      star.style.setProperty("--drift-x", `${(Math.random() * 110 - 55).toFixed(0)}px`);

      fragment.appendChild(star);
    }

    starfield.appendChild(fragment);
  }

  /* =====================================================
     TRANSMISSION PREVIEW DATA
  ====================================================== */

  const previews = {
    "princess-red": {
      title: "PRINCESS RED",
      route: "SAVE ME!",
      zone: "THE DOLLHOUSE DISTRICT",
      copy:
        "Four false Reds are wandering a nightmare made from judgment, self-doubt, corruption, and exhaustion. Find the real one before the wrong version takes the stage.",
      href: "princess-red/index.html",
      locked: false
    },

    ram: {
      title: "RAM THE PHARAOH",
      route: "THE MISSING SLAB",
      zone: "NEW JERSEY // 3000 B.C.",
      copy:
        "Somebody stole Ram's slab and reality responded by turning Jersey into a cursed Egypt-coded fever dream. Get the slab back without giving away the thing that made him Pharaoh.",
      href: "ram/index.html",
      locked: false
    },

    jilli: {
      title: "JILLIAN!",
      route: "SLAYYY OR BE SLAYED",
      zone: "HEARTBREAK FAIRYLAND",
      copy:
        "Jilli sang one song and accidentally enchanted the entire crowd into permanent devotion. Break the spell without killing the connection.",
      href: "jilli/index.html",
      locked: false
    },

    m1h1: {
      title: "M1H1",
      route: "RAGE FOREVER",
      zone: "THE NEVERENDING MOSHPIT",
      copy:
        "The show will not end. Every exit loops back to the pit. The only way out may be to push the venue harder than it can contain.",
      href: "m1h1/index.html",
      locked: false
    },

    "red-babies": {
      title: "RED BABIES",
      route: "THE BOY BENEATH THE STATIC",
      zone: "DEAD AIR",
      copy:
        "Old recordings, discarded lyrics, unfinished ideas, and a shadow dog made of TV static are waiting in the rooms he thought he left behind.",
      href: "red-babies/index.html",
      locked: false
    },

    "ashelic-rose": {
      title: "ASHELIC ROSE",
      route: "BLOOD RITE",
      zone: "THE BLOOD GARDEN",
      copy:
        "The final transmission has been detected inside Night Cove, but access has not been authorized yet.",
      href: "",
      locked: true
    }
  };

  /* =====================================================
     PREVIEW MODAL
  ====================================================== */

  const previewModal = $("#previewModal");
  const previewTitle = $("#previewTitle");
  const previewRoute = $("#previewRoute");
  const previewZone = $("#previewZone");
  const previewCopy = $("#previewCopy");
  const previewPlayLink = $("#previewPlayLink");

  $$(".preview-link").forEach((button) => {
    button.addEventListener("click", () => {
      const artistId = button.dataset.preview;
      const data = previews[artistId];

      if (
        !data ||
        !previewModal ||
        !previewTitle ||
        !previewRoute ||
        !previewZone ||
        !previewCopy ||
        !previewPlayLink
      ) {
        console.warn("Preview modal is missing required markup.", { artistId });
        return;
      }

      previewModal.dataset.artist = artistId;
      previewTitle.textContent = data.title;
      previewRoute.textContent = data.route;
      previewZone.textContent = data.zone;
      previewCopy.textContent = data.copy;

      if (data.locked) {
        previewPlayLink.removeAttribute("href");
        previewPlayLink.setAttribute("aria-disabled", "true");
        previewPlayLink.classList.add("is-disabled");
        previewPlayLink.innerHTML = 'TRANSMISSION LOCKED <span>X</span>';
      } else {
        previewPlayLink.href = data.href;
        previewPlayLink.removeAttribute("aria-disabled");
        previewPlayLink.classList.remove("is-disabled");
        previewPlayLink.innerHTML = 'ENTER TRANSMISSION <span>&gt;</span>';
      }

      openModal(previewModal);
    });
  });

  $$("[data-close-preview]").forEach((control) => {
    control.addEventListener("click", () => closeModal(previewModal));
  });

  /* =====================================================
     SYSTEM FILE / LORE MODAL
  ====================================================== */

  const loreButton = $("#loreButton");
  const loreModal = $("#loreModal");

  if (loreButton && loreModal) {
    loreButton.addEventListener("click", () => openModal(loreModal));
  }

  $$("[data-close-lore]").forEach((control) => {
    control.addEventListener("click", (event) => {
      closeModal(loreModal);

      if (control.matches("a[href^='#']")) {
        const target = $(control.getAttribute("href"));
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  /* =====================================================
     KEYBOARD MODAL CONTROL
  ====================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    if (previewModal && !previewModal.hidden) {
      closeModal(previewModal);
    }

    if (loreModal && !loreModal.hidden) {
      closeModal(loreModal);
    }
  });

  /* =====================================================
     FRAGMENT PROGRESS
  ====================================================== */

  const STORAGE_KEY = "tmn_bubbles_flow_fragments";

  const fragmentIds = [
    "princess-red",
    "ram",
    "jilli",
    "m1h1",
    "red-babies"
  ];

  function readProgress() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));

      if (!Array.isArray(stored)) {
        return [];
      }

      return stored.filter((id) => fragmentIds.includes(id));
    } catch (error) {
      console.warn("Could not read fragment progress.", error);
      return [];
    }
  }

  function writeProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.warn("Could not save fragment progress.", error);
    }
  }

  function markCompletedFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const completed = params.get("completed");

    if (!completed || !fragmentIds.includes(completed)) {
      return;
    }

    const progress = readProgress();

    if (!progress.includes(completed)) {
      progress.push(completed);
      writeProgress(progress);
    }

    params.delete("completed");

    const cleanQuery = params.toString();
    const cleanUrl =
      window.location.pathname +
      (cleanQuery ? `?${cleanQuery}` : "") +
      window.location.hash;

    window.history.replaceState({}, "", cleanUrl);
  }

  function renderProgress() {
    const progress = readProgress();
    const fragmentCount = $("#fragmentCount");
    const fragmentStatus = $("#fragmentStatus");

    if (fragmentCount) {
      fragmentCount.textContent = String(progress.length);
    }

    $$("[data-fragment]").forEach((item) => {
      item.classList.toggle(
        "is-recovered",
        progress.includes(item.dataset.fragment)
      );
    });

    $$("[data-character]").forEach((card) => {
      const id = card.dataset.character;
      const status = $(".card-status", card);

      if (!status || !progress.includes(id)) {
        return;
      }

      const number = $("span", status);
      const numberText = number ? number.outerHTML : "";

      status.innerHTML = `${numberText} FRAGMENT RECOVERED`;
    });

    if (!fragmentStatus) return;

    const missing = fragmentIds.length - progress.length;

    if (progress.length === 0) {
      fragmentStatus.textContent = "SIGNAL INCOMPLETE.";
    } else if (missing > 0) {
      fragmentStatus.textContent =
        `${missing} FRAGMENT${missing === 1 ? "" : "S"} STILL MISSING.`;
    } else {
      fragmentStatus.textContent =
        "FIVE FRAGMENTS RECOVERED. FINAL SIGNAL REMAINS LOCKED.";
    }
  }

  markCompletedFromQuery();
  renderProgress();

  /* =====================================================
     AMBIENT AUDIO
  ====================================================== */

  const soundToggle = $("#soundToggle");
  const ambientAudio = $("#ambientAudio");
  let soundOn = false;

  if (soundToggle && ambientAudio) {
    soundToggle.addEventListener("click", async () => {
      if (soundOn) {
        ambientAudio.pause();
        soundOn = false;
        soundToggle.textContent = "SOUND: OFF";
        return;
      }

      ambientAudio.volume = 0.24;

      try {
        await ambientAudio.play();
        soundOn = true;
        soundToggle.textContent = "SOUND: ON";
      } catch (error) {
        console.warn(
          "Ambient audio could not play. Check assets/audio/bubbles-flow-loop.mp3",
          error
        );
      }
    });
  }

  /* =====================================================
     ROTATING SYSTEM MESSAGE
  ====================================================== */

  const signalMessage = $("#signalMessage");

  const messages = [
    "Five nightmares are currently broadcasting...",
    "The final transmission remains locked...",
    "Bubbles & Flow signal detected inside Night Cove...",
    "Fragments may persist between sessions...",
    "Unknown signal repeats: SAY A PRAYER TO SHEEEEEE"
  ];

  if (signalMessage) {
    let messageIndex = 0;

    window.setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      signalMessage.textContent = messages[messageIndex];
    }, 5200);
  }

  console.log("BUBBLES & FLOW: ONLINE");
});