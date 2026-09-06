const CONFIG = {
  ticketUrl: "https://shotgun.live/en/festivals/bubbles-flow-music-festival",
  princessRedPageUrl: "../../artists/princess-red/",
  musicEnabled: true
};

const ASSETS = {
  characters: {
    redWorried: "assets/characters/princess-red-sad.png",
    redNeutral: "assets/characters/princess-red-neutral.png",
    redPerformance: "assets/characters/princess-red-performance.png",
    judge: "assets/characters/judge.png",
    destroyer: "assets/characters/destroyer.png",
    demon: "assets/characters/demon.png",
    empty: "assets/characters/empty-red.png",
    bitty: "assets/characters/bitty.png"
  },

  backgrounds: {
    transmission: "assets/backgrounds/pr-bgr.png",
    district: "assets/backgrounds/dollhouse-district.png",
    street: "assets/backgrounds/dollhouse-street.png",
    backstage: "assets/backgrounds/backstage.png",
    stage: "assets/backgrounds/princess-red-stage.png"
  },

  audio: {
    ambient: "assets/audio/princess-red-song.mp3",
    click: "assets/audio/ui-click.mp3",
    glitch: "assets/audio/glitch.wav",
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
      { text: "What does that mean?", next: "introExplain1" },
      { text: "Girl WHAT did you do?", next: "introExplain2" }
    ]
  },

  introExplain1: {
    speaker: "Princess Red",
    text: "I was getting ready for Bubbles & Flow when somebody outside started singing in MY voice. Then another one showed up. Then another...",
    sprite: "redWorried",
    background: "transmission",
    objective: "Listen to Red's transmission.",
    choices: [
      { text: "So there are copies of you?", next: "warning" }
    ]
  },

  introExplain2: {
    speaker: "Princess Red",
    text: "Girl iddkkk *sighs*. I was getting ready for Bubbles & Flow when somebody outside started singing in MY voice. Then another one showed up. Then another...",
    sprite: "redWorried",
    background: "transmission",
    objective: "Listen to Red's transmission.",
    choices: [
      { text: "So there are copies of you?", next: "warning" }
    ]
  },

  warning: {
    speaker: "??? RED",
    text: "Don't listen to her!! I'm the real Princess RED",
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
      { text: "You're not protecting her.", next: "judgeReply1" },
      { text: "Who are you afraid of?", next: "judgeReply2" }
    ]
  },

  judgeReply1: {
    speaker: "The Judge",
    text: "Protect her for what? Isn't she a BIG girl now?",
    sprite: "judge",
    background: "street",
    objective: "Find the next Red.",
    choices: [
      { text: "Keep searching", next: "destroyer" }
    ]
  },

  judgeReply2: {
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
      { text: "No. Where is she?", next: "destroyerReply1" },
      { text: "You're using her own thoughts against her.", next: "destroyerReply2" }
    ]
  },

  destroyerReply1: {
    speaker: "The Destroyer",
    text: "No.. NO!?! WHO DO YOU THINK YOU ARE?!?",
    sprite: "destroyer",
    background: "street",
    objective: "Find the next Red.",
    choices: [
      { text: "Leave", next: "demon" }
    ]
  },

  destroyerReply2: {
    speaker: "The Destroyer",
    text: "Of course I am. Nobody knows how to hurt her like I do!",
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
      { text: "That's not freedom.", next: "demonReply1" },
      { text: "And what happens when she stops feeling everything?", next: "demonReply2" }
    ]
  },

  demonReply1: {
    speaker: "The Demon",
    text: "Freedom? Freedom would be the sweet release of *Blurb* *Blurb*",
    sprite: "demon",
    background: "street",
    objective: "Find the final false Red.",
    choices: [
      { text: "Keep moving", next: "empty" }
    ]
  },

    demonReply2: {
    speaker: "The Demon",
    text: "See? Now you're overthinking too. Cute! I love it! Keep going..",
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
document.getElementById("page-link").href = CONFIG.princessRedPageUrl;

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

let typewriterTimer = null;

function typeText(text) {
  if (typewriterTimer) {
    clearTimeout(typewriterTimer);
  }

  dialogueEl.textContent = "";
  let i = 0;

  const speed = 12;

  function typeNext() {
    if (i >= text.length) {
      typewriterTimer = null;
      return;
    }

    dialogueEl.textContent += text[i];
    i += 1;
    typewriterTimer = setTimeout(typeNext, speed);
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