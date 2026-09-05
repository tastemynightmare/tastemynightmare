document.addEventListener("DOMContentLoaded", () => {

  const soundToggle =
    document.getElementById("soundToggle");

  const ambientAudio =
    document.getElementById("ambientAudio");

  const aboutGameButton =
    document.getElementById("aboutGameButton");

  const gameModal =
    document.getElementById("gameModal");

  const modalCloseButtons =
    document.querySelectorAll("[data-close-modal]");

  const systemMessageText =
    document.getElementById("systemMessageText");

  const heroMachine =
    document.querySelector(".machine-shell");


  let soundEnabled = false;
  let systemTypeTimer = null;
  let messageIndex = 0;


  /* =========================================================
     SOUND
  ========================================================= */

  if (soundToggle && ambientAudio) {

    soundToggle.addEventListener("click", async () => {

      soundEnabled = !soundEnabled;

      if (soundEnabled) {

        soundToggle.textContent = "SOUND: ON";
        ambientAudio.volume = 0.25;

        try {

          await ambientAudio.play();

        } catch (error) {

          console.warn(
            "Midnight Arcade ambient audio could not play. " +
            "If you have not added the MP3 yet, this is expected.",
            error
          );

          soundEnabled = false;
          soundToggle.textContent = "SOUND: OFF";

        }

      } else {

        soundToggle.textContent = "SOUND: OFF";
        ambientAudio.pause();

      }

    });

  }


  /* =========================================================
     GAME FILE MODAL
  ========================================================= */

  
  function openModal() {

    if (!gameModal) return;

    gameModal.hidden = false;
    document.body.style.overflow = "hidden";

  }


  function closeModal() {

    if (!gameModal) return;

    gameModal.hidden = true;
    document.body.style.overflow = "";

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
      event.key === "Escape" &&
      gameModal &&
      !gameModal.hidden
    ) {

      closeModal();

    }

  });


  /* =========================================================
     SYSTEM MESSAGE ROTATOR
  ========================================================= */

  const systemMessages = [

    "Some machines are still waking up.",

    "Six fragments detected inside CARTRIDGE_001.",

    "Night Cove Files are accepting new evidence.",

    "Character Lab access denied. Assembly chamber incomplete.",

    "Do not unplug a machine while it is remembering you.",

    "Unknown player profile detected.",

    "Midnight Arcade closes when it decides to."

  ];


  function typeSystemMessage(text) {

    if (!systemMessageText) return;

    if (systemTypeTimer) {

      clearTimeout(systemTypeTimer);

    }

    systemMessageText.textContent = "";

    let index = 0;


    function typeNext() {

      if (index >= text.length) {

        systemTypeTimer = null;
        return;

      }

      systemMessageText.textContent += text[index];

      index += 1;

      systemTypeTimer =
        setTimeout(
          typeNext,
          28
        );

    }


    typeNext();

  }


  if (systemMessageText) {

    setInterval(() => {

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
  ========================================================= */

  if (
    heroMachine &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    document.addEventListener("mousemove", event => {

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

    });

  }


  console.log("MIDNIGHT ARCADE SYSTEM: ONLINE");

});