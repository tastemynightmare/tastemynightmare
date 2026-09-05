const CONFIG = {
  ticketUrl: "https://shotgun.live/en/festivals/bubbles-flow-music-festival",
  princessRedPageUrl: "../../artists/princess-red/",
  musicEnabled: true
};

const ASSETS = {
  characters: {
    redWorried: "assets/characters/princess-red-worried.webp",
    redNeutral: "assets/characters/princess-red-neutral.webp",
    redPerformance: "assets/characters/princess-red-performance.webp",
    judge: "assets/characters/the-judge.webp",
    destroyer: "assets/characters/the-destroyer.webp",
    demon: "assets/characters/the-demon.webp",
    empty: "assets/characters/empty-red.webp",
    bitty: "assets/characters/bitty.webp"
  },

  backgrounds: {
    transmission: "assets/backgrounds/transmission-room.webp",
    district: "assets/backgrounds/dollhouse-district.webp",
    street: "assets/backgrounds/dollhouse-street.webp",
    backstage: "assets/backgrounds/backstage.webp",
    stage: "assets/backgrounds/princess-red-stage.webp"
  },

  audio: {
    ambient: "assets/audio/dollhouse-loop.mp3",
    click: "assets/audio/ui-click.mp3",
    glitch: "assets/audio/glitch.mp3",
    fragment: "assets/audio/fragment-unlock.mp3"
  }
};

const story = {
  intro: {
    speaker: "Princess Red",
    text: "OMGGGG YOU ANSWERED 😭💗 Okay sooooo... tiny problem. I think I lost myself.",
    sprite: "redWorried",
    background: "transmission",
    objective: "Figure out what happened to Princess Red.",
    choices: [
      { text: "What does that mean?", next: "introExplain" },
      { text: "Girl WHAT did you do?", next: "introExplain" }
    ]
  },

  introExplain: {
    speaker: "Princess Red",
    text: "I was getting ready for Bubbles & Flow when somebody outside started singing in MY voice. Then another one showed up. Then another...",
    sprite: "redWorried",
    background: "transmission",
    objective: "Listen to Red's transmission.",
    choices: [
      { text: "So there are copies of you?", next: "warning" }
    ]
  },

  warning: {
    speaker: "??? RED",
    text: "Don't listen to her.",
    sprite: "redNeutral",
    background: "transmission",
    objective: "Enter the Dollhouse District.",
    effect: "glitch",
    glitchText: "WHICH RED IS REAL?",
    choices: [
      { text: "ENTER THE DOLLHOUSE DISTRICT", next: "district" }
    ]
  },

  district: {
    speaker: "Bitty",
    text: "Welcome to the Dollhouse District, Nightshade. Four Reds are loose. Only one can take the stage.",
    sprite: "bitty",
    background: "district",
    objective: "Find the four false Reds.",
    choices: [
      { text: "Start searching", next: "judge" }
    ]
  },

  judge: {
    speaker: "The Judge",
    text: "Shhh. Everybody's watching her. Somebody has to make sure she doesn't embarrass herself.",
    sprite: "judge",
    background: "street",
    objective: "Question The Judge.",
    choices: [
      { text: "You're not protecting her.", next: "judgeReply" },
      { text: "Who are you afraid of?", next: "judgeReply" }
    ]
  },

  judgeReply: {
    speaker: "The Judge",
    text: "Afraid? I'm the only reason they still like her.",
    sprite: "judge",
    background: "street",
    objective: "Find the next Red.",
    choices: [
      { text: "Keep searching", next: "destroyer" }
    ]
  },

  destroyer: {
    speaker: "The Destroyer",
    text: "You want Princess Red? I know every single thing she hates about herself. Wanna hear?",
    sprite: "destroyer",
    background: "street",
    objective: "Don't let The Destroyer distract you.",
    choices: [
      { text: "No. Where is she?", next: "destroyerReply" },
      { text: "You're using her own thoughts against her.", next: "destroyerReply" }
    ]
  },

  destroyerReply: {
    speaker: "The Destroyer",
    text: "Of course I am. Nobody knows how to hurt you like you do.",
    sprite: "destroyer",
    background: "street",
    objective: "Find the next Red.",
    choices: [
      { text: "Leave", next: "demon" }
    ]
  },

  demon: {
    speaker: "The Demon",
    text: "Everybody acts like I'm the bad one. I'm trying to help. You can't get hurt if you stop caring.",
    sprite: "demon",
    background: "street",
    objective: "Reject The Demon's shortcut.",
    choices: [
      { text: "That's not freedom.", next: "demonReply" },
      { text: "And what happens when she stops feeling everything?", next: "demonReply" }
    ]
  },

  demonReply: {
    speaker: "The Demon",
    text: "See? Now you're overthinking too. Cute.",
    sprite: "demon",
    background: "street",
    objective: "Find the final false Red.",
    choices: [
      { text: "Keep moving", next: "empty" }
    ]
  },

  empty: {
    speaker: "Empty Red",
    text: "...",
    sprite: "empty",
    background: "street",
    objective: "Talk to Empty Red.",
    choices: [
      { text: "Red?", next: "emptyReply" }
    ]
  },

  emptyReply: {
    speaker: "Empty Red",
    text: "Doesn't matter.",
    sprite: "empty",
    background: "street",
    objective: "Decide who the real Princess Red is.",
    choices: [
      { text: "What doesn't?", next: "guess" }
    ]
  },

  guess: {
    speaker: "Bitty",
    text: "You've met them all. Which one is the REAL Princess Red?",
    sprite: "bitty",
    background: "district",
    objective: "Choose carefully.",
    choices: [
      { text: "The Judge", next: "wrong" },
      { text: "The Destroyer", next: "wrong" },
      { text: "The Demon", next: "wrong" },
      { text: "Empty Red", next: "wrong" },
      { text: "None of them.", next: "backstage" }
    ]
  },

  wrong: {
    speaker: "??? Red",
    text: "You chose me! Don't worry. I'll take it from here. :)",
    sprite: "redNeutral",
    background: "stage",
    objective: "You chose the wrong Red.",
    effect: "glitch",
    glitchText: "PRINCESS RED WAS NOT FOUND",
    choices: [
      { text: "WAIT... TRY AGAIN", next: "guess" }
    ]
  },

  backstage: {
    speaker: "Princess Red",
    text: "I don't trust any of them.",
    sprite: "redWorried",
    background: "backstage",
    objective: "Help Red face what followed her here.",
    choices: [
      { text: "They're you.", next: "realization" }
    ]
  },

  realization: {
    speaker: "Princess Red",
    text: "Exactly.",
    sprite: "redWorried",
    background: "backstage",
    objective: "Choose how Red responds.",
    choices: [
      { text: "Destroy them.", next: "fight" },
      { text: "Let them in.", next: "mic" }
    ]
  },

  fight: {
    speaker: "Princess Red",
    text: "WHY DO THEY KEEP COMING BACK?!",
    sprite: "redWorried",
    background: "stage",
    objective: "Change the strategy.",
    effect: "shake",
    choices: [
      { text: "You can't kill pieces of yourself. Take the mic.", next: "mic" }
    ]
  },

  mic: {
    speaker: "Princess Red",
    text: "Can y'all shut the fuck up?",
    sprite: "redPerformance",
    background: "stage",
    objective: "Let Princess Red take the stage.",
    choices: [
      { text: "🎤 TURN IT UP", next: "integration" }
    ]
  },

  integration: {
    speaker: "MIDNIGHT ARCADE",
    text: "The voices don't disappear. They fall back into place. Judgment becomes awareness. Destruction becomes honesty. Corruption becomes instinct. Emptiness becomes rest.",
    sprite: "redPerformance",
    background: "stage",
    objective: "Witness the transformation.",
    choices: [
      { text: "CONTINUE", next: "fragment" }
    ]
  },

  fragment: {
    type: "fragment"
  },

  shee: {
    speaker: "???",
    text: "SHEE HEARD YOU.",
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

const sceneEl = document.getElementById("scene");
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
document.getElementById("songLink").href = CONFIG.artistPageUrl;

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
    `linear-gradient(rgba(9,0,15,0.05), rgba(9,0,15,0.3)), url("${src}")`;
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

function typeText(text) {
  dialogueEl.textContent = "";
  let i = 0;

  const speed = 12;

  function typeNext() {
    if (i >= text.length) return;
    dialogueEl.textContent += text[i];
    i += 1;
    setTimeout(typeNext, speed);
  }

  typeNext();
}

function showGlitchMessage(text) {
  if (!text) return;

  glitchMessageEl.textContent = text;
  glitchMessageEl.hidden = false;
  document.body.classList.add("corrupted");
  playSfx("glitch");

  setTimeout(() => {
    glitchMessageEl.hidden = true;
    document.body.classList.remove("corrupted");
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

  speakerEl.textContent = scene.speaker || "MIDNIGHT ARCADE";
  objectiveEl.textContent = scene.objective || "Follow the transmission.";
  sceneCounterEl.textContent = String(gameState.scenesVisited).padStart(2, "0");

  setBackground(scene.background);
  setSprite(scene.sprite, scene.effect);
  typeText(scene.text || "");
  renderChoices(scene.choices);

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
  goToScene("shee");
});

soundToggleBtn.addEventListener("click", toggleSound);

document.addEventListener("click", () => {
  startAmbient();
}, { once: true });

renderScene("intro");