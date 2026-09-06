const CONFIG = {
  ticketUrl: "https://shotgun.live/en/festivals/bubbles-flow-music-festival",
  ramPageUrl: "../../artists/ram/",
  musicEnabled: true
};


const ASSETS = {

  characters: {
    ramNeutral: "assets/characters/ram-neutral.png",
    ramConcerned: "assets/characters/ram-concerned.png",
    ramPerformance: "assets/characters/ram-performance.png",
    stanOfRa: "assets/characters/stan-of-ra.png",
    slabThief: "assets/characters/slab-thief.png"
  },

  backgrounds: {
    transmission: "assets/backgrounds/transmission-room.webp",
    jerseyEgypt: "assets/backgrounds/jersey-egypt.webp",
    templeExterior: "assets/backgrounds/temple-exterior.webp",
    templeInterior: "assets/backgrounds/temple-interior.webp",
    stage: "assets/backgrounds/ram-stage.webp"
  },

  audio: {
    ambient: "assets/audio/ram-loop.mp3",
    click: "assets/audio/ui-click.mp3",
    glitch: "assets/audio/glitch.mp3",
    fragment: "assets/audio/fragment-unlock.mp3"
  }

};


const story = {

  intro: {
    speaker: "Ram",
    text: "Yooo! You free? I got a situation!",
    sprite: "ramNeutral",
    background: "transmission",
    objective: "Answer Ram's transmission.",
    choices: [
      {
        text: "What happened?",
        next: "slabGone"
      },
      {
        text: "Why do I feel like this situation is already cursed?",
        next: "slabGone"
      }
    ]
  },


  slabGone: {
    speaker: "Ram",
    text: "Look bruh.. Somebody stole my slab!",
    sprite: "ramConcerned",
    background: "transmission",
    objective: "Figure out what was taken.",
    choices: [
      {
        text: "Your... slab???",
        next: "slabExplain"
      }
    ]
  },


  slabExplain: {
    speaker: "Ram",
    text: "Yeah. My slab. Had my name carved in it, bars on the back, whole thing. I turned around for TWO seconds and now the sky is green!!",
    sprite: "ramConcerned",
    background: "transmission",
    objective: "Locate the missing slab.",
    choices: [
      {
        text: "Okay. Where are you?",
        next: "location"
      }
    ]
  },


  location: {
    speaker: "MIDNIGHT ARCADE",
    text: "SIGNAL LOCKED.",
    sprite: null,
    background: "jerseyEgypt",
    objective: "Enter the corrupted zone.",
    glitchText: "NEW JERSEY // 3000 B.C.",
    choices: [
      {
        text: "ENTER JERSEY-EGYPT",
        next: "curseStarts"
      }
    ]
  },


  curseStarts: {
    speaker: "Ram",
    text: "See what I'm saying? That pyramid was NOT there before.",
    sprite: "ramConcerned",
    background: "jerseyEgypt",
    objective: "Find the source of the curse.",
    choices: [
      {
        text: "What's with the giant speakers?",
        next: "speakers"
      },
      {
        text: "Please tell me that's not your slab glowing up there.",
        next: "speakers"
      }
    ]
  },


  speakers: {
    speaker: "MIDNIGHT ARCADE",
    text: "Every bass hit shakes the sand. Ancient symbols flicker across busted Jersey street signs. A voice loops through the speakers: REAL NAME RAM... PEOPLE CALLING ME THE PHARAOH.",
    sprite: "ramNeutral",
    background: "jerseyEgypt",
    objective: "Follow Ram's voice through the curse.",
    choices: [
      {
        text: "Follow the loop",
        next: "stanEntrance"
      }
    ]
  },


  stanEntrance: {
    speaker: "Stan of Ra",
    text: "HALT!! No one enters the Temple of the Missing Slab without proving they know the power of the word.",
    sprite: "stanOfRa",
    background: "templeExterior",
    objective: "Get past Stan of Ra.",
    choices: [
      {
        text: "We're just here for Ram's slab.",
        next: "stanQuestion"
      },
      {
        text: "Who even are you?",
        next: "stanQuestion"
      }
    ]
  },


  stanQuestion: {
    speaker: "Stan of Ra",
    text: "A name is not decoration. A title is not costume. If he calls himself Pharaoh, then tell me: what makes the title real?",
    sprite: "stanOfRa",
    background: "templeExterior",
    objective: "Answer Stan of Ra.",
    choices: [
      {
        text: "What people call him.",
        next: "wrongTitle"
      },
      {
        text: "What he says and stands on.",
        next: "correctTitle"
      },
      {
        text: "The jewelry probably helps.",
        next: "wrongTitle"
      }
    ]
  },


  wrongTitle: {
    speaker: "Stan of Ra",
    text: "Wrong. A title borrowed from the crowd disappears when the crowd leaves.",
    sprite: "stanOfRa",
    background: "templeExterior",
    objective: "Think about what makes Ram's voice his.",
    choices: [
      {
        text: "Try again",
        next: "stanQuestion"
      }
    ]
  },


  correctTitle: {
    speaker: "Stan of Ra",
    text: "Then enter. But know this: the curse steals whatever you let speak for you.",
    sprite: "stanOfRa",
    background: "templeExterior",
    objective: "Enter the temple.",
    choices: [
      {
        text: "ENTER THE TEMPLE",
        next: "temple"
      }
    ]
  },


  temple: {
    speaker: "Ram",
    text: "There it is.",
    sprite: "ramConcerned",
    background: "templeInterior",
    objective: "Recover the slab.",
    choices: [
      {
        text: "Grab it.",
        next: "trap"
      }
    ]
  },


  trap: {
    speaker: "Slab Thief",
    text: "You can take the slab. Just leave the voice.",
    sprite: "slabThief",
    background: "templeInterior",
    objective: "Refuse the thief's bargain.",
    effect: "glitch",
    glitchText: "SPEAK FOR YOURSELF",
    choices: [
      {
        text: "What does that even mean?",
        next: "bargain"
      }
    ]
  },


  bargain: {
    speaker: "Slab Thief",
    text: "The bars. The name. The sound. Give me those, and the stone is yours.",
    sprite: "slabThief",
    background: "templeInterior",
    objective: "Choose what matters more.",
    choices: [
      {
        text: "Take the slab and give up the voice.",
        next: "badEnding"
      },
      {
        text: "Keep the voice. Make the slab answer to it.",
        next: "goldenMic"
      }
    ]
  },


  badEnding: {
    speaker: "MIDNIGHT ARCADE",
    text: "Ram gets the slab back. The carving is blank.",
    sprite: "ramNeutral",
    background: "templeInterior",
    objective: "That wasn't the real win.",
    glitchText: "THE WORD WAS LOST",
    choices: [
      {
        text: "RUN IT BACK",
        next: "bargain"
      }
    ]
  },


  goldenMic: {
    speaker: "MIDNIGHT ARCADE",
    text: "A gold microphone rises from the floor. Ancient letters ignite across the handle.",
    sprite: null,
    background: "templeInterior",
    objective: "Use the Golden Mic.",
    choices: [
      {
        text: "HAND RAM THE MIC",
        next: "ramSpeaks"
      }
    ]
  },


  ramSpeaks: {
    speaker: "Ram",
    text: "Real name Ram. People calling me the Pharaoh. Step up to the plate!",
    sprite: "ramPerformance",
    background: "stage",
    objective: "Break the curse with Ram's own words.",
    choices: [
      {
        text: "KEEP GOING",
        next: "curseBreaks"
      }
    ]
  },


  curseBreaks: {
    speaker: "MIDNIGHT ARCADE",
    text: "The temple shakes. The stolen bars burn back into the slab. The curse starts collapsing around the sound of his own voice.",
    sprite: "ramPerformance",
    background: "stage",
    objective: "Finish the ritual.",
    choices: [
      {
        text: "SAY A PRAYER TO SHEE",
        next: "prayer"
      },
      {
        text: "TAKE THE SLAB AND RUN",
        next: "almost"
      }
    ]
  },


  almost: {
    speaker: "Ram",
    text: "Nah. Something still ain't right.",
    sprite: "ramConcerned",
    background: "stage",
    objective: "The curse is still holding on.",
    choices: [
      {
        text: "SAY A PRAYER TO SHEE",
        next: "prayer"
      }
    ]
  },


  prayer: {
    speaker: "???",
    text: "WORD RECEIVED.",
    sprite: null,
    background: "stage",
    objective: "Witness the return.",
    effect: "glitch",
    glitchText: "SAY A PRAYER TO SHEE",
    choices: [
      {
        text: "CONTINUE",
        next: "returnSlab"
      }
    ]
  },


  returnSlab: {
    speaker: "Ram",
    text: "There we go. Knew I wasn't leaving without that.",
    sprite: "ramPerformance",
    background: "stage",
    objective: "Complete Ram's transmission.",
    choices: [
      {
        text: "STEP UP TO THE PLATE",
        next: "fragment"
      }
    ]
  },


  fragment: {
    type: "fragment"
  },


  shee: {
    speaker: "???",
    text: "THE WORD REMEMBERS WHO SPOKE IT.",
    sprite: null,
    background: "stage",
    objective: "Follow the signal.",
    effect: "glitch",
    glitchText: "SHEE HEARD YOU.",
    choices: [
      {
        text: "ENTER BUBBLES & FLOW",
        next: "festival"
      }
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


const backgroundEl =
  document.getElementById("sceneBackground");

const spriteEl =
  document.getElementById("characterSprite");

const speakerEl =
  document.getElementById("speakerName");

const dialogueEl =
  document.getElementById("dialogueText");

const choicesEl =
  document.getElementById("choices");

const objectiveEl =
  document.getElementById("objectiveText");

const sceneCounterEl =
  document.getElementById("sceneCounter");

const glitchMessageEl =
  document.getElementById("glitchMessage");

const fragmentScreenEl =
  document.getElementById("fragmentScreen");

const festivalScreenEl =
  document.getElementById("festivalScreen");

const fragmentContinueBtn =
  document.getElementById("fragmentContinue");

const soundToggleBtn =
  document.getElementById("soundToggle");

const musicPlayer =
  document.getElementById("musicPlayer");

const sfxPlayer =
  document.getElementById("sfxPlayer");


document.getElementById("ticketLink").href =
  CONFIG.ticketUrl;

document.getElementById("page-link").href =
  CONFIG.ramPageUrl;


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
    `linear-gradient(rgba(11,10,8,0.05), rgba(11,10,8,0.3)), url("${src}")`;
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

    if (effect === "shake") {
      spriteEl.classList.add("shake");
    }

    if (effect === "glitch") {
      spriteEl.classList.add("glitch");
    }
  });
}


let typewriterTimer = null;


function typeText(text) {

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
      return;

    }

    dialogueEl.textContent += text[i];
    i += 1;

    typewriterTimer = setTimeout(
      typeNext,
      speed
    );
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

    const button =
      document.createElement("button");

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

    console.error(
      `Scene "${sceneId}" does not exist.`
    );

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

  speakerEl.textContent =
    scene.speaker || "MIDNIGHT ARCADE";

  objectiveEl.textContent =
    scene.objective || "Follow the transmission.";

  sceneCounterEl.textContent =
    String(gameState.scenesVisited).padStart(2, "0");

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


fragmentContinueBtn.addEventListener(
  "click",
  () => {

    fragmentScreenEl.hidden = true;
    goToScene("shee");

  }
);


soundToggleBtn.addEventListener(
  "click",
  toggleSound
);


document.addEventListener(
  "click",
  () => {
    startAmbient();
  },
  {
    once: true
  }
);


renderScene("intro");