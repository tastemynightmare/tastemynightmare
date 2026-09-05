const CONFIG = {
  ticketUrl: "https://shotgun.live/en/festivals/bubbles-flow-music-festival",
  m1h1PageUrl: "../../artists/m1h1/",
  musicEnabled: true
};

const ASSETS = {
  characters: {
    m1h1Neutral: "assets/characters/m1h1-neutral.webp",
    m1h1Rage: "assets/characters/m1h1-rage.webp",
    m1h1Performance: "assets/characters/m1h1-performance.webp",
    pitZombie: "assets/characters/pit-zombie.webp"
  },

  backgrounds: {
    transmission: "assets/backgrounds/transmission-room.webp",
    venue: "assets/backgrounds/neverending-venue.webp",
    hallway: "assets/backgrounds/looping-hallway.webp",
    pit: "assets/backgrounds/moshpit.webp",
    overload: "assets/backgrounds/overload-stage.webp"
  },

  audio: {
    ambient: "assets/audio/rage-loop.mp3",
    click: "assets/audio/ui-click.mp3",
    glitch: "assets/audio/glitch.mp3",
    fragment: "assets/audio/fragment-unlock.mp3"
  }
};

const story = {

  intro: {
    speaker: "M1H1",
    text: "YO. THIS SHOW WON'T END. I GOTTA MAKE IT TO MY NEXT SET!",
    sprite: "m1h1Rage",
    background: "transmission",
    objective: "Answer M1H1's transmission.",
    choices: [
      { text: "What do you mean won't end?", next: "problem" },
      { text: "That sounds like a good problem for you.", next: "problem" }
    ]
  },

  problem: {
    speaker: "M1H1",
    text: "Nah. I mean literally. Every time I finish the set, the first song starts again.",
    sprite: "m1h1Neutral",
    background: "transmission",
    objective: "Find the loop.",
    choices: [
      { text: "Where's the exit?", next: "exit" }
    ]
  },

  exit: {
    speaker: "M1H1",
    text: "Tried it. Door takes me right back to the pit.",
    sprite: "m1h1Neutral",
    background: "transmission",
    objective: "Enter the venue.",
    choices: [
      { text: "Send the location.", next: "arrival" }
    ]
  },

  arrival: {
    speaker: "MIDNIGHT ARCADE",
    text: "LOCATION IDENTIFIED: THE NEVERENDING MOSHPIT.",
    sprite: null,
    background: "venue",
    objective: "Enter the loop.",
    glitchText: "RAGE FOREVER",
    choices: [
      { text: "ENTER THE VENUE", next: "pit" }
    ]
  },

  pit: {
    speaker: "MIDNIGHT ARCADE",
    text: "The room is packed. Green lights flash. The same breakdown hits again. Nobody looks tired. Nobody can stop moving.",
    sprite: "pitZombie",
    background: "pit",
    objective: "Figure out what feeds the venue.",
    choices: [
      { text: "Try the exit.", next: "hallway" }
    ]
  },

  hallway: {
    speaker: "MIDNIGHT ARCADE",
    text: "EXIT → HALLWAY → EXIT → HALLWAY → PIT. Every door returns you to the same drop.",
    sprite: null,
    background: "hallway",
    objective: "Break the loop.",
    glitchText: "NO EXIT // KEEP MOVING",
    choices: [
      { text: "Go back to M1H1.", next: "findM1" }
    ]
  },

  findM1: {
    speaker: "M1H1",
    text: "I tried cutting the music. Crowd started chanting until the power came back.",
    sprite: "m1h1Neutral",
    background: "pit",
    objective: "Understand the venue.",
    choices: [
      { text: "Maybe it feeds on energy.", next: "feeds" },
      { text: "What if everybody calms down?", next: "calmIdea" }
    ]
  },

  calmIdea: {
    speaker: "M1H1",
    text: "You want me to tell THIS room to calm down?",
    sprite: "m1h1Rage",
    background: "pit",
    objective: "Test the wrong solution.",
    choices: [
      { text: "Fair. Never mind.", next: "feeds" },
      { text: "Try it anyway.", next: "calmFail" }
    ]
  },

  calmFail: {
    speaker: "MIDNIGHT ARCADE",
    text: "The beat softens. The crowd slows. The walls brighten like the venue is feeding.",
    sprite: null,
    background: "pit",
    objective: "Stop feeding the loop.",
    glitchText: "ENERGY STABILIZED // LOOP RESET",
    choices: [
      { text: "NOPE. TURN IT BACK UP.", next: "feeds" }
    ]
  },

  feeds: {
    speaker: "MIDNIGHT ARCADE",
    text: "The venue doesn't feed on chaos. It feeds on CONTROLLED chaos — just enough energy to keep the same night repeating forever.",
    sprite: null,
    background: "pit",
    objective: "Push the room beyond what it can recycle.",
    choices: [
      { text: "So don't calm it down. Overload it.", next: "m1GetsIt" }
    ]
  },

  m1GetsIt: {
    speaker: "M1H1",
    text: "Oh. We break the whole damn thing.",
    sprite: "m1h1Rage",
    background: "pit",
    objective: "Overload the venue.",
    choices: [
      { text: "RAGE HARDER", next: "overloadChoice" }
    ]
  },

  overloadChoice: {
    speaker: "MIDNIGHT ARCADE",
    text: "The venue starts compensating. More lights. More volume. More bodies. It wants the energy back inside the loop.",
    sprite: null,
    background: "pit",
    objective: "Choose how to push past the limit.",
    choices: [
      { text: "CUT THE SET SHORT AND RUN", next: "badEnding" },
      { text: "MAKE THE CROWD GO EVEN HARDER", next: "overload" }
    ]
  },

  badEnding: {
    speaker: "MIDNIGHT ARCADE",
    text: "M1H1 reaches the exit. The door opens onto the first song.",
    sprite: "m1h1Neutral",
    background: "hallway",
    objective: "Running is still part of the loop.",
    glitchText: "SET RESTARTING",
    choices: [
      { text: "RUN IT BACK", next: "overloadChoice" }
    ]
  },

  overload: {
    speaker: "M1H1",
    text: "OPEN THIS SHIT UP.",
    sprite: "m1h1Performance",
    background: "overload",
    objective: "Push the room past capacity.",
    effect: "shake",
    choices: [
      { text: "OPEN THE PIT", next: "systemFail" }
    ]
  },

  systemFail: {
    speaker: "MIDNIGHT ARCADE",
    text: "The crowd surges. The lights blow one by one. The speakers clip. The venue tries to restart the song and fails.",
    sprite: "m1h1Performance",
    background: "overload",
    objective: "Keep moving forward.",
    glitchText: "LOOP CAPACITY EXCEEDED",
    choices: [
      { text: "DON'T STOP", next: "breakthrough" }
    ]
  },

  breakthrough: {
    speaker: "MIDNIGHT ARCADE",
    text: "For the first time all night, the next sound isn't the first song. It's silence from somewhere outside.",
    sprite: null,
    background: "overload",
    objective: "Find the real exit.",
    choices: [
      { text: "MOVE TOWARD IT", next: "realExit" }
    ]
  },

  realExit: {
    speaker: "M1H1",
    text: "There it is.",
    sprite: "m1h1Neutral",
    background: "hallway",
    objective: "Leave the loop behind.",
    choices: [
      { text: "KEEP GOING", next: "fragment" }
    ]
  },

  fragment: {
    type: "fragment"
  },

  shee: {
    speaker: "???",
    text: "WHAT MOVES FORWARD CANNOT BE KEPT IN A LOOP.",
    sprite: null,
    background: "overload",
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

document.getElementById("ticketLink").href = CONFIG.ticketUrl;
document.getElementById("page-link").href = CONFIG.m1h1PageUrl;

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
  if (!gameState.soundOn) return;
  if (!CONFIG.musicEnabled) return;

  const src = asset("audio", "ambient");
  if (!src) return;

  if (!musicPlayer.src.endsWith(src)) {
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
    `linear-gradient(rgba(7,9,8,.05), rgba(7,9,8,.32)), url("${src}")`;
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

  spriteEl.src = src;
  spriteEl.alt = key.replace(/([A-Z])/g, " $1").trim();
  spriteEl.hidden = false;

  requestAnimationFrame(() => {
    spriteEl.classList.add("enter");

    if (effect === "shake") spriteEl.classList.add("shake");
    if (effect === "glitch") spriteEl.classList.add("glitch");
  });
}

let typewriterTimer = null;
let renderToken = 0;

function typeText(text, onComplete) {
  if (typewriterTimer) {
    clearTimeout(typewriterTimer);
    typewriterTimer = null;
  }

  dialogueEl.textContent = "";
  let i = 0;
  const speed = 12;

  function typeNext() {
    if (i >= text.length) {
      typewriterTimer = null;
      if (onComplete) onComplete();
      return;
    }

    dialogueEl.textContent += text[i];
    i += 1;
    typewriterTimer = setTimeout(typeNext, speed);
  }

  typeNext();
}

let glitchTimer = null;

function showGlitchMessage(text) {
  if (!text) return;

  if (glitchTimer) clearTimeout(glitchTimer);

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

  choices.forEach(choice => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "choice-button";
    button.textContent = choice.text;

    button.addEventListener("click", () => {
      // Prevent double-clicks and remove the old choice UI immediately.
      Array.from(choicesEl.children).forEach(choiceButton => {
        choiceButton.disabled = true;
      });

      choicesEl.classList.add("choices--leaving");

      playSfx("click");

      requestAnimationFrame(() => {
        choicesEl.innerHTML = "";
        choicesEl.classList.remove("choices--leaving");
        goToScene(choice.next);
      });
    });

    choicesEl.appendChild(button);
  });
}

function showFragment() {
  fragmentScreenEl.hidden = false;
  playSfx("fragment");
}

function showFestival() {
  festivalScreenEl.hidden = false;
  musicPlayer.pause();
}

function renderScene(sceneId) {
  const scene = story[sceneId];

  if (!scene) {
    console.error(`Scene "${sceneId}" does not exist.`);
    return;
  }

  const thisRender = ++renderToken;

  gameState.currentScene = sceneId;
  gameState.scenesVisited += 1;

  // Clear the previous interface BEFORE drawing the next scene.
  choicesEl.innerHTML = "";
  glitchMessageEl.hidden = true;
  document.body.classList.remove("corrupted");

  if (scene.type === "fragment") {
    showFragment();
    return;
  }

  if (scene.type === "festival") {
    showFestival();
    return;
  }

  speakerEl.textContent = scene.speaker || "MIDNIGHT ARCADE";
  objectiveEl.textContent = scene.objective || "Follow the transmission.";
  sceneCounterEl.textContent = String(gameState.scenesVisited).padStart(2, "0");

  setBackground(scene.background);
  setSprite(scene.sprite, scene.effect);

  typeText(scene.text || "", () => {
    // Prevent a finished OLD typewriter callback from resurrecting old choices.
    if (
      thisRender !== renderToken ||
      gameState.currentScene !== sceneId
    ) {
      return;
    }

    renderChoices(scene.choices);
  });

  if (scene.glitchText) {
    showGlitchMessage(scene.glitchText);
  }

  startAmbient();
}

function goToScene(sceneId) {
  // Kill anything visually left over from the previous choice immediately.
  renderToken += 1;

  if (typewriterTimer) {
    clearTimeout(typewriterTimer);
    typewriterTimer = null;
  }

  if (typeof glitchTimer !== "undefined" && glitchTimer) {
    clearTimeout(glitchTimer);
    glitchTimer = null;
  }

  choicesEl.innerHTML = "";
  glitchMessageEl.hidden = true;
  document.body.classList.remove("corrupted");

  renderScene(sceneId);
}

fragmentContinueBtn.addEventListener("click", () => {
  fragmentScreenEl.hidden = true;
  goToScene("shee");
});

soundToggleBtn.addEventListener("click", toggleSound);

document.addEventListener("click", () => {
  startAmbient();
}, { once: true });

renderScene("intro");