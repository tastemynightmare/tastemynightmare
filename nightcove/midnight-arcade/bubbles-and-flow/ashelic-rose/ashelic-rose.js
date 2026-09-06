const CONFIG = {
  ashelicPageUrl: "../../artists/ashelic-rose/",
  musicEnabled: true
};

const ASSETS = {

  characters: {
    ashelicSweet: "assets/characters/ashelic-sweet.png",
    ashelicHungry: "assets/characters/ashelic-hungry.png",
    ashelicWounded: "assets/characters/ashelic-wounded.png",
    ashelicQueen: "assets/characters/ashelic-queen.png",
    falseRose: "assets/characters/ashelic-dark.png",
    hunger: "assets/characters/the-hunger.png"
  },

  backgrounds: {
    transmission: "assets/backgrounds/transmission-room.webp",
    bloodGarden: "assets/backgrounds/blood-garden.webp",
    mirrorHall: "assets/backgrounds/mirror-hall.webp",
    feedingRoom: "assets/backgrounds/feeding-room.webp",
    throneRoom: "assets/backgrounds/throne-room.webp",
    threshold: "assets/backgrounds/threshold.webp"
  },

  audio: {
    ambient: "assets/audio/ashelic-loop.mp3",
    click: "assets/audio/ui-click.mp3",
    glitch: "assets/audio/glitch.mp3",
    fragment: "assets/audio/fragment-unlock.mp3",
    rise: "assets/audio/rise.mp3"
  }
};

const story = {

  intro: {
    speaker: "Ashelic Rose",
    text: "Come closer.",
    sprite: "ashelicSweet",
    background: "transmission",
    objective: "Answer the final transmission.",
    choices: [
      { text: "That sounds suspicious.", next: "lure" },
      { text: "I'm listening.", next: "lure" }
    ]
  },

  lure: {
    speaker: "Ashelic Rose",
    text: "Good. I need someone who can tell the difference between hunger and power.",
    sprite: "ashelicSweet",
    background: "transmission",
    objective: "Find out what Ashelic is feeding on.",
    choices: [
      { text: "Aren't those the same thing for you?", next: "difference" }
    ]
  },

  difference: {
    speaker: "Ashelic Rose",
    text: "That's what I thought too.",
    sprite: "ashelicHungry",
    background: "transmission",
    objective: "Enter Ashelic's corrupted domain.",
    glitchText: "FINAL CARTRIDGE DETECTED",
    choices: [
      { text: "ENTER", next: "bloodGarden" }
    ]
  },

  bloodGarden: {
    speaker: "MIDNIGHT ARCADE",
    text: "The garden is beautiful because everything in it grew around a wound. Red roses climb black iron. Every thorn has a name.",
    sprite: null,
    background: "bloodGarden",
    objective: "Follow the roses.",
    choices: [
      { text: "READ THE NAMES", next: "names" }
    ]
  },

  names: {
    speaker: "MIDNIGHT ARCADE",
    text: "REJECTION. SHAME. DESIRE. HUMILIATION. ABANDONMENT. RAGE. WANT. Every word glows like something still feeding.",
    sprite: null,
    background: "bloodGarden",
    objective: "Find Ashelic beneath the glamour.",
    choices: [
      { text: "KEEP WALKING", next: "mirrorHall" }
    ]
  },

  mirrorHall: {
    speaker: "False Rose",
    text: "There she is.",
    sprite: "falseRose",
    background: "mirrorHall",
    objective: "Identify the version in the mirror.",
    choices: [
      { text: "Who are you?", next: "falseRoseAnswer" }
    ]
  },

  falseRoseAnswer: {
    speaker: "False Rose",
    text: "I'm the version everybody wanted. Sweet enough to approach. Dangerous enough to desire. Hurt enough to keep proving it.",
    sprite: "falseRose",
    background: "mirrorHall",
    objective: "Separate performance from self.",
    choices: [
      { text: "And what does Ashelic want?", next: "crack" }
    ]
  },

  crack: {
    speaker: "False Rose",
    text: "...",
    sprite: "falseRose",
    background: "mirrorHall",
    objective: "Break the mirror.",
    glitchText: "QUESTION NOT RECOGNIZED",
    choices: [
      { text: "ASK AGAIN", next: "ashelicAppears" }
    ]
  },

  ashelicAppears: {
    speaker: "Ashelic Rose",
    text: "I don't know.",
    sprite: "ashelicWounded",
    background: "mirrorHall",
    objective: "Stay with the answer.",
    choices: [
      { text: "Then start there.", next: "feedingRoom" }
    ]
  },

  feedingRoom: {
    speaker: "MIDNIGHT ARCADE",
    text: "Behind the mirrors is a locked room. Every old wound is connected to a red tube leading into a single black heart.",
    sprite: null,
    background: "feedingRoom",
    objective: "Find the source of the hunger.",
    choices: [
      { text: "OPEN THE ROOM", next: "hungerAppears" }
    ]
  },

  hungerAppears: {
    speaker: "The Hunger",
    text: "Don't touch that.",
    sprite: "hunger",
    background: "feedingRoom",
    objective: "Face the thing feeding on the wounds.",
    choices: [
      { text: "What are you?", next: "hungerAnswer" }
    ]
  },

  hungerAnswer: {
    speaker: "The Hunger",
    text: "I'm what kept her moving. Wanting. Taking. Proving. If I stop, who is she?",
    sprite: "hunger",
    background: "feedingRoom",
    objective: "Decide what Ashelic keeps.",
    choices: [
      { text: "Keep feeding. Pain made her powerful.", next: "badEnding" },
      { text: "Take the power. Stop feeding the wound.", next: "transmute" }
    ]
  },

  badEnding: {
    speaker: "Ashelic Rose",
    text: "Then I guess I stay hungry.",
    sprite: "ashelicHungry",
    background: "feedingRoom",
    objective: "Hunger is not dominion.",
    glitchText: "APPETITE IS NOT AUTHORITY",
    choices: [
      { text: "RUN IT BACK", next: "hungerAnswer" }
    ]
  },

  transmute: {
    speaker: "Ashelic Rose",
    text: "So I don't have to forgive it. I don't have to forget it. I just don't have to keep eating from it.",
    sprite: "ashelicWounded",
    background: "feedingRoom",
    objective: "Separate memory from fuel.",
    choices: [
      { text: "Exactly.", next: "cutTubes" }
    ]
  },

  cutTubes: {
    speaker: "MIDNIGHT ARCADE",
    text: "One by one, the tubes snap. The wounds remain. The heart keeps beating.",
    sprite: null,
    background: "feedingRoom",
    objective: "See what remains without the feeding.",
    choices: [
      { text: "LOOK AT ASHELIC", next: "withoutHunger" }
    ]
  },

  withoutHunger: {
    speaker: "Ashelic Rose",
    text: "...I'm still here.",
    sprite: "ashelicSweet",
    background: "feedingRoom",
    objective: "Let Ashelic choose herself.",
    choices: [
      { text: "What do you want now?", next: "want" }
    ]
  },

  want: {
    speaker: "Ashelic Rose",
    text: "Everything.",
    sprite: "ashelicSweet",
    background: "feedingRoom",
    objective: "Define the desire.",
    choices: [
      { text: "Because you're starving?", next: "clarify" },
      { text: "Because it's yours to pursue?", next: "clarify" }
    ]
  },

  clarify: {
    speaker: "Ashelic Rose",
    text: "Because I choose it.",
    sprite: "ashelicQueen",
    background: "throneRoom",
    objective: "Take the throne.",
    choices: [
      { text: "THEN TAKE IT", next: "throne" }
    ]
  },

  throne: {
    speaker: "MIDNIGHT ARCADE",
    text: "The glamour changes. No longer bait. No longer armor. A crown can still be beautiful without asking permission to exist.",
    sprite: "ashelicQueen",
    background: "throneRoom",
    objective: "Claim dominion.",
    choices: [
      { text: "SIT", next: "fragmentsCall" }
    ]
  },

  fragmentsCall: {
    speaker: "MIDNIGHT ARCADE",
    text: "Five signals answer from somewhere beyond the room.",
    sprite: null,
    background: "throneRoom",
    objective: "Receive the other fragments.",
    glitchText: "HEART // WORD // CHOICE // WILL // MEMORY",
    choices: [
      { text: "CALL THEM HOME", next: "integration" }
    ]
  },

  integration: {
    speaker: "Ashelic Rose",
    text: "None of them made me whole. They reminded me I already was.",
    sprite: "ashelicQueen",
    background: "throneRoom",
    objective: "Complete Ashelic's transmission.",
    choices: [
      { text: "CLAIM THE SELF", next: "fragment" }
    ]
  },

  fragment: {
    type: "fragment"
  },

  threshold: {
    speaker: "???",
    text: "IDENTITY STABLE.",
    sprite: null,
    background: "threshold",
    objective: "Approach the threshold.",
    effect: "glitch",
    glitchText: "A NEW PROGRAM IS WAITING.",
    choices: [
      { text: "OPEN THE DOOR", next: "final" }
    ]
  },

  final: {
    type: "final"
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
const finalScreenEl = document.getElementById("finalScreen");
const festivalScreenEl = document.getElementById("festivalScreen");
const fragmentContinueBtn = document.getElementById("fragmentContinue");
const riseButton = document.getElementById("riseButton");
const soundToggleBtn = document.getElementById("soundToggle");
const musicPlayer = document.getElementById("musicPlayer");
const sfxPlayer = document.getElementById("sfxPlayer");

document.getElementById("page-link").href = CONFIG.ashelicPageUrl;

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
    `linear-gradient(rgba(10,0,4,.05), rgba(10,0,4,.34)), url("${src}")`;
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

  choices.forEach(choice => {
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

function showFragment() {
  fragmentScreenEl.hidden = false;
  playSfx("fragment");
}

function showFinal() {
  finalScreenEl.hidden = false;
  musicPlayer.pause();
}

function showFestival() {
  festivalScreenEl.hidden = false;
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

  if (scene.type === "final") {
    showFinal();
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

  choicesEl.innerHTML = "";

  typeText(scene.text || "", () => {
    renderChoices(scene.choices);
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
  fragmentScreenEl.hidden = true;
  goToScene("threshold");
});

riseButton.addEventListener("click", () => {
  playSfx("rise");

  document.body.classList.add("risen");

  document.getElementById("finalStatus").textContent =
    "STATUS: RISEN";

  document.getElementById("finalTitle").textContent =
    "SHEE";

  riseButton.textContent =
    "CONTINUE";

  riseButton.onclick = () => {
    finalScreenEl.hidden = true;
    festivalScreenEl.hidden = false;
  };
});

soundToggleBtn.addEventListener("click", toggleSound);

document.addEventListener("click", () => {
  startAmbient();
}, { once: true });

renderScene("intro");