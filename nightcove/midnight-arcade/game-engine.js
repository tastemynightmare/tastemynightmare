document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const soundToggle = document.getElementById("soundToggle");
  const ambientAudio = document.getElementById("ambientAudio");

  const aboutGameButton = document.getElementById("aboutGameButton");
  const gameModal = document.getElementById("gameModal");
  const modalCloseButtons = document.querySelectorAll("[data-close-modal]");

  const systemMessageText = document.getElementById("systemMessageText");
  const systemMessageStatus = document.getElementById("systemMessageStatus");

  const heroMachine = document.querySelector(".machine-shell");

  const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const finePointerQuery = window.matchMedia(
    "(pointer: fine)"
  );

  let soundEnabled = false;
  let systemTypeTimer = null;
  let messageIndex = 0;
  let previouslyFocusedElement = null;

  const systemMessages = [
    "Some machines are still waking up...",
    "Six fragments detected inside CARTRIDGE_001...",
    "Night Cove files now accepting new evidence...",
    "Character Lab access denied. Assembly chamber incomplete..",
    "Do not unplug a machine while it is remembering you...",
    "Unknown player profile detected...",
    "Midnight Arcade closes when it decides to..."
  ];

  /* =========================================================
     HELPERS
  ========================================================= */

  function getFocusableElements(container) {
    if (!container) {
      return [];
    }

    return Array.from(
      container.querySelectorAll(
        [
          "a[href]",
          "button:not([disabled])",
          "input:not([disabled])",
          "select:not([disabled])",
          "textarea:not([disabled])",
          '[tabindex]:not([tabindex="-1"])'
        ].join(",")
      )
    ).filter(element => {
      return !element.hasAttribute("hidden");
    });
  }

  function updateSoundToggle() {
    if (!soundToggle) {
      return;
    }

    soundToggle.textContent =
      soundEnabled ? "SOUND: ON" : "SOUND: OFF";

    soundToggle.setAttribute(
      "aria-pressed",
      String(soundEnabled)
    );

    soundToggle.setAttribute(
      "aria-label",
      soundEnabled
        ? "Turn Midnight Arcade ambient sound off"
        : "Turn Midnight Arcade ambient sound on"
    );
  }

  /* =========================================================
     SOUND
  ========================================================= */

  if (soundToggle) {
    soundToggle.setAttribute("aria-pressed", "false");
    updateSoundToggle();
  }

  if (soundToggle && ambientAudio) {
    soundToggle.addEventListener("click", async () => {
      if (soundEnabled) {
        soundEnabled = false;
        ambientAudio.pause();
        updateSoundToggle();
        return;
      }

      ambientAudio.volume = 0.25;

      try {
        await ambientAudio.play();
        soundEnabled = true;
      } catch (error) {
        soundEnabled = false;

        console.warn(
          "MIDNIGHT ARCADE: ambient audio could not play.",
          error
        );
      }

      updateSoundToggle();
    });

    ambientAudio.addEventListener("pause", () => {
      if (!ambientAudio.ended && soundEnabled) {
        soundEnabled = false;
        updateSoundToggle();
      }
    });

    ambientAudio.addEventListener("error", () => {
      soundEnabled = false;
      updateSoundToggle();
    });
  }

  /* =========================================================
     ACCESSIBLE GAME FILE MODAL
  ========================================================= */

  function openModal() {
    if (!gameModal) {
      return;
    }

    previouslyFocusedElement = document.activeElement;

    gameModal.hidden = false;
    gameModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const focusableElements =
      getFocusableElements(gameModal);

    const preferredTarget =
      gameModal.querySelector(".modal-close") ||
      focusableElements[0];

    preferredTarget?.focus();
  }

  function closeModal() {
    if (!gameModal) {
      return;
    }

    gameModal.hidden = true;
    gameModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (
      previouslyFocusedElement &&
      typeof previouslyFocusedElement.focus === "function"
    ) {
      previouslyFocusedElement.focus();
    }

    previouslyFocusedElement = null;
  }

  if (gameModal) {
    gameModal.setAttribute("aria-hidden", "true");
  }

  if (aboutGameButton && gameModal) {
    aboutGameButton.addEventListener(
      "click",
      openModal
    );
  }

  modalCloseButtons.forEach(button => {
    button.addEventListener(
      "click",
      closeModal
    );
  });

  document.addEventListener("keydown", event => {
    if (
      !gameModal ||
      gameModal.hidden
    ) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements =
      getFocusableElements(gameModal);

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement =
      focusableElements[focusableElements.length - 1];

    if (
      event.shiftKey &&
      document.activeElement === firstElement
    ) {
      event.preventDefault();
      lastElement.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === lastElement
    ) {
      event.preventDefault();
      firstElement.focus();
    }
  });

  /* =========================================================
     SYSTEM MESSAGE ROTATOR
  ========================================================= */

  function announceSystemMessage(text) {
    if (!systemMessageStatus) {
      return;
    }

    systemMessageStatus.textContent = text;
  }

  function typeSystemMessage(text) {
    if (!systemMessageText) {
      return;
    }

    if (systemTypeTimer) {
      clearTimeout(systemTypeTimer);
      systemTypeTimer = null;
    }

    announceSystemMessage(text);

    if (reducedMotionQuery.matches) {
      systemMessageText.textContent = text;
      return;
    }

    systemMessageText.textContent = "";

    let characterIndex = 0;

    function typeNextCharacter() {
      if (characterIndex >= text.length) {
        systemTypeTimer = null;
        return;
      }

      systemMessageText.textContent +=
        text[characterIndex];

      characterIndex += 1;

      systemTypeTimer = window.setTimeout(
        typeNextCharacter,
        28
      );
    }

    typeNextCharacter();
  }

  if (systemMessageText) {
    announceSystemMessage(
      systemMessageText.textContent.trim()
    );

    window.setInterval(() => {
      messageIndex =
        (messageIndex + 1) %
        systemMessages.length;

      typeSystemMessage(
        systemMessages[messageIndex]
      );
    }, 5500);
  }

  /* =========================================================
     LIGHT PARALLAX
     Disabled for reduced-motion users and touch/mobile.
  ========================================================= */

  if (
    heroMachine &&
    finePointerQuery.matches &&
    !reducedMotionQuery.matches
  ) {
    document.addEventListener(
      "mousemove",
      event => {
        const x =
          (
            event.clientX /
            window.innerWidth -
            0.5
          ) * 5;

        const y =
          (
            event.clientY /
            window.innerHeight -
            0.5
          ) * -5;

        heroMachine.style.transform =
          `rotateY(${x}deg) rotateX(${y}deg)`;
      },
      { passive: true }
    );

    document.addEventListener(
      "mouseleave",
      () => {
        heroMachine.style.transform = "";
      }
    );
  }

  console.log(
    "MIDNIGHT ARCADE SYSTEM: ONLINE"
  );
});