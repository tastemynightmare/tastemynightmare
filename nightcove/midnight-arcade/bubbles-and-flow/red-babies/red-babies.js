const CONFIG = {
  ticketUrl: "https://shotgun.live/en/festivals/bubbles-flow-music-festival",
  redBabiesPageUrl: "../../artists/red-babies/",
  musicEnabled: true
};

const ASSETS = {
  characters: {
    redBabiesNeutral: "assets/characters/red-babies-neutral.png",
    redBabiesTired: "assets/characters/red-babies-tired.png",
    redBabiesPerformance: "assets/characters/red-babies-performance.png",
    underdog: "assets/characters/red-babies-underdog.png"
  },

  backgrounds: {
    transmission: "assets/backgrounds/transmission-room.webp",
    deadAir: "assets/backgrounds/dead-air.webp",
    abandonedRoom: "assets/backgrounds/abandoned-room.webp",
    tapeRoom: "assets/backgrounds/tape-room.webp",
    stage: "assets/backgrounds/red-babies-stage.webp"
  },

  audio: {
    ambient: "assets/audio/dead-air-loop.mp3",
    click: "assets/audio/ui-click.mp3",
    glitch: "assets/audio/glitch.mp3",
    fragment: "assets/audio/fragment-unlock.mp3"
  }
};

const story = {
  intro: {
    speaker: "Red Babies",
    text: "You hear that?",
    sprite: "redBabiesNeutral",
    background: "transmission",
    objective: "Answer the transmission.",
    choices: [
      { text: "Hear what?", next: "static" },
      { text: "Mostly static.", next: "static" }
    ]
  },

  static: {
    speaker: "Red Babies",
    text: "Exactly. It's been doing that all night. Every time I get close to finishing something, the signal eats it.",
    sprite: "redBabiesTired",
    background: "transmission",
    objective: "Find what's buried in the signal.",
    choices: [
      { text: "Where are you?", next: "deadAir" }
    ]
  },

  deadAir: {
    speaker: "MIDNIGHT ARCADE",
    text: "LOCATION IDENTIFIED: DEAD AIR.",
    sprite: null,
    background: "deadAir",
    objective: "Enter the abandoned frequency.",
    glitchText: "THE BOY BENEATH THE STATIC",
    choices: [
      { text: "ENTER DEAD AIR", next: "abandoned" }
    ]
  },

  abandoned: {
    speaker: "MIDNIGHT ARCADE",
    text: "Empty rooms. Dead amps. Half-finished posters. Cigarette burns. Pink paint over black walls. Every abandoned idea Red Babies ever walked away from is still here.",
    sprite: null,
    background: "abandonedRoom",
    objective: "Search the abandoned rooms.",
    choices: [
      { text: "LOOK FOR RED BABIES", next: "findRed" }
    ]
  },

  findRed: {
    speaker: "Red Babies",
    text: "I been here before.",
    sprite: "redBabiesTired",
    background: "abandonedRoom",
    objective: "Figure out why the room feels familiar.",
    choices: [
      { text: "You built this place?", next: "familiar" },
      { text: "Then why come back?", next: "familiar" }
    ]
  },

  familiar: {
    speaker: "Red Babies",
    text: "Nah. I left it. That's different.",
    sprite: "redBabiesTired",
    background: "abandonedRoom",
    objective: "Follow what was left behind.",
    choices: [
      { text: "What's moving behind you?", next: "underdogAppears" }
    ]
  },

  underdogAppears: {
    speaker: "MIDNIGHT ARCADE",
    text: "A black dog-shaped shadow crawls out from under a busted couch. Its fur is made of television static. Paper hangs from its mouth.",
    sprite: "underdog",
    background: "abandonedRoom",
    objective: "Follow the Underdog.",
    choices: [
      { text: "Take the paper.", next: "lyrics" }
    ]
  },

  lyrics: {
    speaker: "Red Babies",
    text: "...That's mine.",
    sprite: "redBabiesNeutral",
    background: "abandonedRoom",
    objective: "Read what the Underdog carried back.",
    choices: [
      { text: "Old lyrics?", next: "discarded" }
    ]
  },

  discarded: {
    speaker: "Red Babies",
    text: "Old lyrics. Old ideas. Old versions. Stuff I thought wasn't good enough, or wasn't worth finishing.",
    sprite: "redBabiesTired",
    background: "abandonedRoom",
    objective: "Follow the Underdog deeper.",
    choices: [
      { text: "It kept all of it.", next: "tapeRoom" }
    ]
  },

  tapeRoom: {
    speaker: "MIDNIGHT ARCADE",
    text: "The Underdog leads you into a room full of tapes. Every one is labeled with something Red Babies abandoned.",
    sprite: "underdog",
    background: "tapeRoom",
    objective: "Choose what to do with the archive.",
    choices: [
      { text: "BURN IT ALL", next: "burn" },
      { text: "PLAY THE TAPE", next: "playTape" }
    ]
  },

  burn: {
    speaker: "Red Babies",
    text: "Maybe that's cleaner.",
    sprite: "redBabiesNeutral",
    background: "tapeRoom",
    objective: "Watch what the fire takes.",
    choices: [
      { text: "LIGHT IT", next: "badEnding" }
    ]
  },

  badEnding: {
    speaker: "MIDNIGHT ARCADE",
    text: "The room catches fast. The static goes silent. So does everything else.",
    sprite: null,
    background: "deadAir",
    objective: "Silence isn't the same as release.",
    glitchText: "NOTHING LEFT TO TRANSMUTE",
    choices: [
      { text: "RUN IT BACK", next: "tapeRoom" }
    ]
  },

  playTape: {
    speaker: "MIDNIGHT ARCADE",
    text: "The tape clicks into place. At first: hiss. Then a guitar. Then a voice that sounds unfinished, tired, ugly, alive.",
    sprite: null,
    background: "tapeRoom",
    objective: "Let the abandoned thing play.",
    choices: [
      { text: "DON'T TURN IT OFF", next: "songForms" }
    ]
  },

  songForms: {
    speaker: "Red Babies",
    text: "I would've deleted this.",
    sprite: "redBabiesNeutral",
    background: "tapeRoom",
    objective: "Stay with the unfinished song.",
    choices: [
      { text: "Good thing you didn't.", next: "transmute" },
      { text: "Finish it now.", next: "transmute" }
    ]
  },

  transmute: {
    speaker: "MIDNIGHT ARCADE",
    text: "The bad recording doesn't become pretty. It becomes useful. The static turns into distortion. The discarded lyrics become a hook. The room starts sounding like a song.",
    sprite: "redBabiesPerformance",
    background: "stage",
    objective: "Turn memory into sound.",
    choices: [
      { text: "PLAY IT LOUDER", next: "underdogReturns" }
    ]
  },

  underdogReturns: {
    speaker: "MIDNIGHT ARCADE",
    text: "The Underdog drops the last scrap of paper at Red Babies' feet, then dissolves into the speakers.",
    sprite: "underdog",
    background: "stage",
    objective: "Read the final message.",
    choices: [
      { text: "PICK IT UP", next: "backwardVoice" }
    ]
  },

  backwardVoice: {
    speaker: "???",
    text: "BRING ME BACK TO ME.",
    sprite: null,
    background: "stage",
    objective: "Complete the transmission.",
    effect: "glitch",
    glitchText: "BRING ME BACK TO ME",
    choices: [
      { text: "KEEP THE TAPE", next: "fragment" }
    ]
  },

  fragment: {
    type: "fragment"
  },

  shee: {
    speaker: "???",
    text: "WHAT WAS DISCARDED STILL REMEMBERS.",
    sprite: null,
    background: "stage",
    objective: "Follow the signal.",
    effect: "glitch",
    glitchText: "SHEE HEARD YOU.",
    choices: [
      { text: "ENTER BUBBLES & FLOW", next: "festival" }
    ]
  },

  festival: {
    type: "festival"
  }
};

const gameState = {
  currentScene: "intro",
  soundOn: true,
  scenesVisited: 0
};

document.addEventListener("DOMContentLoaded", () => {
  const backgroundEl = document.getElementById("sceneBackground");
  const spriteEl = document.getElementById("characterSprite");
  const speakerEl = document.getElementById("speakerName");
  const dialogueEl = document.getElementById("dialogueText");
  const choicesEl = document.getElementById("choices");
  const objectiveEl = document.getElementById("objectiveText");
  const sceneCounterEl = document.getElementById("sceneCounter");
  const glitchMessageEl = document.getElementById("glitchMessage");
  const fragmentScreenEl = document.getElementById("fragmentScreen");
  const festivalScreenEl = document.getElementById("festivalScreen");
  const fragmentContinueBtn = document.getElementById("fragmentContinue");
  const soundToggleBtn = document.getElementById("soundToggle");
  const musicPlayer = document.getElementById("musicPlayer");
  const sfxPlayer = document.getElementById("sfxPlayer");
  const ticketLink = document.getElementById("ticketLink");
  const pageLink = document.getElementById("page-link");

  const requiredElements = {
    backgroundEl,
    spriteEl,
    speakerEl,
    dialogueEl,
    choicesEl,
    objectiveEl,
    sceneCounterEl,
    glitchMessageEl,
    fragmentScreenEl,
    festivalScreenEl,
    fragmentContinueBtn,
    soundToggleBtn,
    musicPlayer,
    sfxPlayer,
    ticketLink,
    pageLink
  };

  const missingElements = Object.entries(requiredElements)
    .filter(([, element]) => !element)
    .map(([name]) => name);

  if (missingElements.length > 0) {
    console.error("RED BABIES GAME: missing required elements:", missingElements);
    return;
  }

  ticketLink.href = CONFIG.ticketUrl;
  pageLink.href = CONFIG.redBabiesPageUrl;

  let typewriterTimer = null;
  let glitchTimer = null;

  function asset(group, key) {
    return ASSETS[group]?.[key] || "";
  }

  function playSfx(key) {
    if (!gameState.soundOn) return;

    const src = asset("audio", key);
    if (!src) return;

    sfxPlayer.src = src;
    sfxPlayer.currentTime = 0;
    sfxPlayer.play().catch(() => {});
  }

  function startAmbient() {
    if (!gameState.soundOn || !CONFIG.musicEnabled) return;

    const src = asset("audio", "ambient");
    if (!src) return;

    if (musicPlayer.getAttribute("src") !== src) {
      musicPlayer.src = src;
    }

    musicPlayer.volume = 0.35;
    musicPlayer.play().catch(() => {});
  }

  function toggleSound() {
    gameState.soundOn = !gameState.soundOn;

    if (gameState.soundOn) {
      soundToggleBtn.textContent = "SOUND: ON";
      startAmbient();
    } else {
      soundToggleBtn.textContent = "SOUND: OFF";
      musicPlayer.pause();
      sfxPlayer.pause();
    }
  }

  function setBackground(key) {
    const src = asset("backgrounds", key);

    if (!src) {
      backgroundEl.style.backgroundImage = "";
      return;
    }

    backgroundEl.style.backgroundImage =
      `linear-gradient(rgba(10,9,11,.06), rgba(10,9,11,.34)), url("${src}")`;
  }

  function setSprite(key, effect) {
    spriteEl.className = "character-sprite";

    if (!key) {
      spriteEl.hidden = true;
      spriteEl.removeAttribute("src");
      spriteEl.alt = "";
      return;
    }

    const src = asset("characters", key);

    if (!src) {
      spriteEl.hidden = true;
      spriteEl.removeAttribute("src");
      spriteEl.alt = "";
      console.warn(`Missing character asset for "${key}".`);
      return;
    }

    spriteEl.src = src;
    spriteEl.alt = key.replace(/([A-Z])/g, " $1").trim();
    spriteEl.hidden = false;

    requestAnimationFrame(() => {
      spriteEl.classList.add("enter");

      if (effect === "shake") {
        spriteEl.classList.add("shake");
      }

      if (effect === "glitch") {
        spriteEl.classList.add("glitch");
      }
    });
  }

  function typeText(text, onComplete) {
    if (typewriterTimer) {
      clearTimeout(typewriterTimer);
      typewriterTimer = null;
    }

    dialogueEl.textContent = "";
    let index = 0;
    const speed = 12;

    function typeNext() {
      if (index >= text.length) {
        typewriterTimer = null;
        onComplete?.();
        return;
      }

      dialogueEl.textContent += text[index];
      index += 1;
      typewriterTimer = setTimeout(typeNext, speed);
    }

    typeNext();
  }

  function showGlitchMessage(text) {
    if (!text) return;

    if (glitchTimer) {
      clearTimeout(glitchTimer);
    }

    glitchMessageEl.textContent = text;
    glitchMessageEl.hidden = false;
    document.body.classList.add("corrupted");
    playSfx("glitch");

    glitchTimer = setTimeout(() => {
      glitchMessageEl.hidden = true;
      document.body.classList.remove("corrupted");
      glitchTimer = null;
    }, 850);
  }

  function renderChoices(choices = []) {
    choicesEl.innerHTML = "";

    choices.forEach((choice) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "choice-button";
      button.textContent = choice.text;

      button.addEventListener("click", () => {
        playSfx("click");
        goToScene(choice.next);
      });

      choicesEl.appendChild(button);
    });
  }

  function hideOverlays() {
    fragmentScreenEl.hidden = true;
    festivalScreenEl.hidden = true;
  }

  function showFragment() {
    festivalScreenEl.hidden = true;
    fragmentScreenEl.hidden = false;
    fragmentContinueBtn.disabled = false;
    playSfx("fragment");

    requestAnimationFrame(() => {
      fragmentContinueBtn.focus();
    });
  }

  function showFestival() {
    fragmentScreenEl.hidden = true;
    festivalScreenEl.hidden = false;
    musicPlayer.pause();
  }

  function renderScene(sceneId) {
    const scene = story[sceneId];

    if (!scene) {
      console.error(`Scene "${sceneId}" does not exist.`);
      return;
    }

    gameState.currentScene = sceneId;
    gameState.scenesVisited += 1;

    if (scene.type === "fragment") {
      showFragment();
      return;
    }

    if (scene.type === "festival") {
      showFestival();
      return;
    }

    hideOverlays();

    speakerEl.textContent = scene.speaker || "MIDNIGHT ARCADE";
    objectiveEl.textContent = scene.objective || "Follow the transmission.";
    sceneCounterEl.textContent = String(gameState.scenesVisited).padStart(2, "0");

    setBackground(scene.background);
    setSprite(scene.sprite, scene.effect);

    choicesEl.innerHTML = "";

    typeText(scene.text || "", () => {
      renderChoices(scene.choices || []);
    });

    if (scene.glitchText) {
      showGlitchMessage(scene.glitchText);
    }

    startAmbient();
  }

  function goToScene(sceneId) {
    renderScene(sceneId);
  }

  fragmentContinueBtn.addEventListener("click", () => {
    fragmentContinueBtn.disabled = true;
    fragmentScreenEl.hidden = true;

    requestAnimationFrame(() => {
      goToScene("shee");
    });
  });

  soundToggleBtn.addEventListener("click", toggleSound);

  document.addEventListener(
    "click",
    () => {
      startAmbient();
    },
    { once: true }
  );

  renderScene("intro");
});