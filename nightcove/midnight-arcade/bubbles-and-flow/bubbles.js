document.addEventListener("DOMContentLoaded", () => {

  const STORAGE_KEY =
    "tmn_bubbles_flow_fragments";

  const fragmentIds = [
    "princess-red",
    "ram",
    "jilli",
    "m1h1",
    "red-babies",
    "ashelic-rose"
  ];

  const previews = {

    "princess-red": {
      title: "PRINCESS RED",
      route: "SAVE ME!",
      zone: "THE DOLLHOUSE DISTRICT",
      copy:
        "Four false Reds are wandering a pastel nightmare made from judgment, self-doubt, corruption, and exhaustion. Find the real one before the wrong version takes the stage.",
      href: "../princess-red/"
    },

    "ram": {
      title: "RAM THE PHARAOH",
      route: "THE MISSING SLAB",
      zone: "NEW JERSEY // 3000 B.C.",
      copy:
        "Somebody stole Ram's slab and reality responded by turning Jersey into a cursed Egypt-coded fever dream. Get the slab back without giving away the thing that made him Pharaoh.",
      href: "../ram/"
    },

    "jilli": {
      title: "JILLI",
      route: "SLAY OR BE SLAYED",
      zone: "HEARTBREAK FAIRYLAND",
      copy:
        "Jilli sang one song and accidentally enchanted the entire crowd into permanent devotion. Break the spell without killing the connection.",
      href: "../jilli/"
    },

    "m1h1": {
      title: "M1H1",
      route: "RAGE FOREVER",
      zone: "THE NEVERENDING MOSHPIT",
      copy:
        "The show will not end. Every exit loops back to the pit. The only way out may be to push the venue harder than it can contain.",
      href: "../m1h1/"
    },

    "red-babies": {
      title: "RED BABIES",
      route: "THE BOY BENEATH THE STATIC",
      zone: "DEAD AIR",
      copy:
        "Old recordings, discarded lyrics, unfinished ideas, and a shadow dog made of TV static are waiting in the rooms he thought he left behind.",
      href: "../red-babies/"
    },

    "ashelic-rose": {
      title: "ASHELIC ROSE",
      route: "BLOOD RITE",
      zone: "THE BLOOD GARDEN",
      copy:
        "The wounds are still alive. The hunger still knows their names. Ashelic has to decide whether pain is the source of her power or merely the thing she learned to feed on.",
      href: "../ashelic-rose/"
    }

  };


  /* =====================================================
     PROGRESS
  ====================================================== */

  function readProgress() {

    try {

      const stored =
        JSON.parse(
          localStorage.getItem(
            STORAGE_KEY
          )
        );

      if (!Array.isArray(stored)) {
        return [];
      }

      return stored.filter(
        id =>
          fragmentIds.includes(id)
      );

    } catch (error) {

      console.warn(
        "Could not read fragment progress.",
        error
      );

      return [];

    }

  }


  function writeProgress(progress) {

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(progress)
      );

    } catch (error) {

      console.warn(
        "Could not save fragment progress.",
        error
      );

    }

  }


  function markCompletedFromQuery() {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const completed =
      params.get("completed");

    if (
      !completed ||
      !fragmentIds.includes(completed)
    ) {
      return;
    }

    const progress =
      readProgress();

    if (
      !progress.includes(completed)
    ) {

      progress.push(completed);
      writeProgress(progress);

    }

    params.delete("completed");

    const cleanQuery =
      params.toString();

    const cleanUrl =
      window.location.pathname +
      (cleanQuery ? `?${cleanQuery}` : "") +
      window.location.hash;

    window.history.replaceState(
      {},
      "",
      cleanUrl
    );

  }


  function renderProgress() {

    const progress =
      readProgress();

    const fragmentCount =
      document.getElementById(
        "fragmentCount"
      );

    const fragmentStatus =
      document.getElementById(
        "fragmentStatus"
      );


    if (fragmentCount) {

      fragmentCount.textContent =
        String(progress.length);

    }


    document
      .querySelectorAll(
        "[data-fragment]"
      )
      .forEach(item => {

        const id =
          item.dataset.fragment;

        item.classList.toggle(
          "is-recovered",
          progress.includes(id)
        );

      });


    document
      .querySelectorAll(
        "[data-character]"
      )
      .forEach(card => {

        const id =
          card.dataset.character;

        if (
          progress.includes(id)
        ) {

          const status =
            card.querySelector(
              ".card-status"
            );

          if (status) {

            const number =
              status.querySelector(
                "span"
              );

            const numberText =
              number
                ? number.outerHTML
                : "";

            status.innerHTML =
              `${numberText} FRAGMENT RECOVERED`;

          }

        }

      });


    if (fragmentStatus) {

      if (progress.length === 0) {

        fragmentStatus.textContent =
          "SIGNAL INCOMPLETE.";

      } else if (
        progress.length < 6
      ) {

        fragmentStatus.textContent =
          `${6 - progress.length} FRAGMENT${
            6 - progress.length === 1
              ? ""
              : "S"
          } STILL MISSING.`;

      } else {

        fragmentStatus.textContent =
          "ALL FRAGMENTS RECOVERED. SOMETHING IS WAKING UP.";

      }

    }

  }


  markCompletedFromQuery();
  renderProgress();


  /* =====================================================
     PREVIEW MODAL
  ====================================================== */

  const previewModal =
    document.getElementById(
      "previewModal"
    );

  const previewTitle =
    document.getElementById(
      "previewTitle"
    );

  const previewRoute =
    document.getElementById(
      "previewRoute"
    );

  const previewZone =
    document.getElementById(
      "previewZone"
    );

  const previewCopy =
    document.getElementById(
      "previewCopy"
    );

  const previewPlayLink =
    document.getElementById(
      "previewPlayLink"
    );


  function openPreview(id) {

    const data =
      previews[id];

    if (
      !previewModal ||
      !data
    ) {
      return;
    }

    previewTitle.textContent =
      data.title;

    previewRoute.textContent =
      data.route;

    previewZone.textContent =
      data.zone;

    previewCopy.textContent =
      data.copy;

    previewPlayLink.href =
      data.href;

    previewModal.hidden =
      false;

    document.body.style.overflow =
      "hidden";

  }


  function closePreview() {

    if (!previewModal) {
      return;
    }

    previewModal.hidden =
      true;

    document.body.style.overflow =
      "";

  }


  document
    .querySelectorAll(
      "[data-preview]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          openPreview(
            button.dataset.preview
          );

        }
      );

    });


  document
    .querySelectorAll(
      "[data-close-preview]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        closePreview
      );

    });


  /* =====================================================
     LORE MODAL
  ====================================================== */

  const loreButton =
    document.getElementById(
      "loreButton"
    );

  const loreModal =
    document.getElementById(
      "loreModal"
    );


  function openLore() {

    if (!loreModal) {
      return;
    }

    loreModal.hidden =
      false;

    document.body.style.overflow =
      "hidden";

  }


  function closeLore() {

    if (!loreModal) {
      return;
    }

    loreModal.hidden =
      true;

    document.body.style.overflow =
      "";

  }


  if (loreButton) {

    loreButton.addEventListener(
      "click",
      openLore
    );

  }


  document
    .querySelectorAll(
      "[data-close-lore]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        closeLore
      );

    });


  document.addEventListener(
    "keydown",
    event => {

      if (event.key !== "Escape") {
        return;
      }

      closePreview();
      closeLore();

    }
  );


  /* =====================================================
     AMBIENT AUDIO
  ====================================================== */

  const soundToggle =
    document.getElementById(
      "soundToggle"
    );

  const ambientAudio =
    document.getElementById(
      "ambientAudio"
    );

  let soundOn = false;


  if (
    soundToggle &&
    ambientAudio
  ) {

    soundToggle.addEventListener(
      "click",
      async () => {

        soundOn =
          !soundOn;

        if (soundOn) {

          ambientAudio.volume =
            .24;

          try {

            await ambientAudio.play();

            soundToggle.textContent =
              "SOUND: ON";

          } catch (error) {

            console.warn(
              "Ambient audio did not play. Add assets/audio/bubbles-flow-loop.mp3 if it is missing.",
              error
            );

            soundOn =
              false;

            soundToggle.textContent =
              "SOUND: OFF";

          }

        } else {

          ambientAudio.pause();

          soundToggle.textContent =
            "SOUND: OFF";

        }

      }
    );

  }


  /* =====================================================
     SIGNAL MESSAGE
  ====================================================== */

  const signalMessage =
    document.getElementById(
      "signalMessage"
    );

  const messages = [
    "Six nightmares are currently broadcasting.",
    "Do not answer a transmission you are not prepared to finish.",
    "Bubbles & Flow signal detected inside Night Cove.",
    "Fragments may persist between sessions.",
    "Unknown signal repeats: SAY A PRAYER TO SHEE.",
    "The final cartridge is already listening."
  ];

  let messageIndex = 0;
  let messageTimer = null;


  function typeMessage(text) {

    if (!signalMessage) {
      return;
    }

    if (messageTimer) {
      clearTimeout(messageTimer);
    }

    signalMessage.textContent =
      "";

    let index =
      0;


    function nextCharacter() {

      if (
        index >= text.length
      ) {

        messageTimer =
          null;

        return;

      }

      signalMessage.textContent +=
        text[index];

      index +=
        1;

      messageTimer =
        setTimeout(
          nextCharacter,
          24
        );

    }


    nextCharacter();

  }


  if (signalMessage) {

    setInterval(
      () => {

        messageIndex =
          (
            messageIndex + 1
          ) %
          messages.length;

        typeMessage(
          messages[messageIndex]
        );

      },
      5200
    );

  }


  console.log(
    "BUBBLES & FLOW CARTRIDGE: ONLINE"
  );

});