const CONFIG = {
  ticketUrl: "https://shotgun.live/en/festivals/bubbles-flow-music-festival",
  jilliPageUrl: "../../artists/jilli/",
  musicEnabled: true
};

const ASSETS = {

  characters: {
    jilliNeutral: "assets/characters/jilli-neutral.png",
    jilliWorried: "assets/characters/jilli-worried.png",
    jilliSiren: "assets/characters/jilli-siren.png",
    jilliPerformance: "assets/characters/jilli-performance.png",
    enchantedFan: "assets/characters/enchanted-fan.png",
    fairyDouble: "assets/characters/fairy-double.png"
  },

  backgrounds: {
    transmission: "assets/backgrounds/transmission-room.webp",
    fairyland: "assets/backgrounds/heartbreak-fairyland.webp",
    loveGarden: "assets/backgrounds/love-garden.webp",
    mirrorStage: "assets/backgrounds/mirror-stage.webp",
    stage: "assets/backgrounds/jilli-stage.webp"
  },

  audio: {
    ambient: "assets/audio/jilli-loop.mp3",
    click: "assets/audio/ui-click.mp3",
    glitch: "assets/audio/glitch.mp3",
    fragment: "assets/audio/fragment-unlock.mp3"
  }

};

const story = {

  intro: {
    speaker: "Jillian!",
    text: "Slayyy. Oh! Haay I have a tiny emergency.",
    sprite: "jilliNeutral",
    background: "transmission",
    objective: "Answer Jilli's transmission.",
    choices: [
      {
        text: "How tiny?",
        next: "problem"
      },
      {
        text: "Define tiny..",
        next: "problem2"
      }
    ]
  },

  problem2: {
    speaker: "Jillian!",
    text: "Weeeelll.. I sang one song and now everybody here is obsessed with me. Like... not normal obsessed. Fairy curse obsessed.",
    sprite: "jilliWorried",
    background: "transmission",
    objective: "Figure out what Jilli's song did.",
    choices: [
      {
        text: "What happens if you stop singing?",
        next: "stopSinging"
      }
    ]
  },

  problem: {
    speaker: "Jillian!",
    text: "GIGANTIC!! I sang one song and now everybody here is obsessed with me. Like... not normal obsessed. Fairy curse obsessed.",
    sprite: "jilliWorried",
    background: "transmission",
    objective: "Figure out what Jilli's song did.",
    choices: [
      {
        text: "What happens if you stop singing?",
        next: "stopSinging"
      }
    ]
  },

  stopSinging: {
    speaker: "Jillian!",
    text: "They start crying. Then they beg me to sing again. Then the flowers start screaming. The World has an apocalypse.. It's a lot.",
    sprite: "jilliWorried",
    background: "transmission",
    objective: "Enter Heartbreak Fairyland.",
    choices: [
      {
        text: "WOW..Okay. I'm coming in.",
        next: "arrival"
      }
    ]
  },

  arrival: {
    speaker: "MIDNIGHT ARCADE",
    text: "LOCATION IDENTIFIED: HEARTBREAK FAIRYLAND.",
    sprite: null,
    background: "fairyland",
    objective: "Find Jilli.",
    glitchText: "SLAYYY OR BE SLAYED",
    choices: [
      {
        text: "ENTER FAIRYLAND",
        next: "fanEncounter"
      }
    ]
  },

  fanEncounter: {
    speaker: "Enchanted Fan",
    text: "JILLI LOVES US!! JILLI NEEDS US!!! JILLI WILL SING FOREVER!!!!",
    sprite: "enchantedFan",
    background: "fairyland",
    objective: "Get through the enchanted crowd.",
    choices: [
      {
        text: "Do you even want to be here?",
        next: "fanAnswer1"
      },
      {
        text: "Where is Jilli?",
        next: "fanAnswer2"
      }
    ]
  },


  fanAnswer1: {
    speaker: "Enchanted Fan",
    text: "Want? We don't need to want. She already chose for us.",
    sprite: "enchantedFan",
    background: "fairyland",
    objective: "Find the source of the spell.",
    glitchText: "CHOICE DISABLED",
    choices: [
      {
        text: "That's the problem.",
        next: "garden"
      }
    ]
  },

  fanAnswer2: {
    speaker: "Enchanted Fan",
    text: "YESS!! JILLIIAAANN!! JILLIAANN WHERE AREE YOUUU OMGGG!!!",
    sprite: "enchantedFan",
    background: "fairyland",
    objective: "Find the source of the spell.",
    glitchText: "CHOICE DISABLED",
    choices: [
      {
        text: "This is such a problem.",
        next: "garden"
      }
    ]
  },


  garden: {
    speaker: "MIDNIGHT ARCADE",
    text: "Every flower in the garden turns toward the same sound. Hearts grow on vines like fruit. None of them can turn away.",
    sprite: null,
    background: "loveGarden",
    objective: "Follow the song.",
    choices: [
      {
        text: "FOLLOW JILLI'S VOICE",
        next: "jilliFound"
      }
    ]
  },


  jilliFound: {
    speaker: "Jillian!",
    text: "Okay, so good news: they love me. Bad news: I think they physically cannot stop loving me.",
    sprite: "jilliSiren",
    background: "loveGarden",
    objective: "Help Jilli understand the curse.",
    choices: [
      {
        text: "That's not love if they can't choose.",
        next: "realization1"
      },
      {
        text: "Can you reverse it?",
        next: "realization2"
      }
    ]
  },


  realization1: {
    speaker: "Jillian!",
    text: "Ohhh. Ewwwee. Yeah, no. I don't want that! Sorry I'm not like these losers in the scene. They can either choose me or GET LOST!!",
    sprite: "jilliWorried",
    background: "loveGarden",
    objective: "Find a way to break the spell.",
    choices: [
      {
        text: "Then stop feeding it.",
        next: "fairyDouble"
      }
    ]
  },

  realization2: {
    speaker: "Jillian!",
    text: "Rever-OHH yeah I could totally reverse it.. I mean I don't want undying love and constant attention.. *sighs*",
    sprite: "jilliWorried",
    background: "loveGarden",
    objective: "Find a way to break the spell.",
    choices: [
      {
        text: "Then stop feeding it and REVERSE IT!!",
        next: "fairyDouble"
      }
    ]
  },


  fairyDouble: {
    speaker: "Fairy Fan",
    text: "Why would you break it? Everyone adores you. Nobody leaves. Nobody rejects you. Nobody says no.",
    sprite: "fairyDouble",
    background: "mirrorStage",
    objective: "Face the spell's temptation.",
    choices: [
      {
        text: "Keep the spell. Never lose anyone.",
        next: "badEnding"
      },
      {
        text: "Break the spell. Let them choose.",
        next: "breakSpell"
      }
    ]
  },


  badEnding: {
    speaker: "MIDNIGHT ARCADE",
    text: "The crowd cheers forever. Nobody leaves. Nobody can. *They chant* WE LOVE JILLI WE LOVE JILLI!!!",
    sprite: "jilliSiren",
    background: "mirrorStage",
    objective: "That isn't connection.",
    glitchText: "LOVE WITHOUT CHOICE IS A CAGE",
    choices: [
      {
        text: "RUN IT BACK",
        next: "fairyDouble"
      }
    ]
  },


  breakSpell: {
    speaker: "Jillian!",
    text: "Okay. If they stay after this, I want it to be because they actually want to.",
    sprite: "jilliNeutral",
    background: "mirrorStage",
    objective: "Break the enchantment.",
    choices: [
      {
        text: "STOP THE SONG",
        next: "silence"
      }
    ]
  },


  silence: {
    speaker: "MIDNIGHT ARCADE",
    text: "The music cuts out. The flowers stop screaming. The hearts on the vines crack open. For the first time, the crowd is quiet.",
    sprite: null,
    background: "mirrorStage",
    objective: "Wait for the crowd to decide.",
    choices: [
      {
        text: "WAIT",
        next: "choiceReturns"
      }
    ]
  },


  choiceReturns: {
    speaker: "Enchanted Fan",
    text: "...I still wanna hear her sing.",
    sprite: "enchantedFan",
    background: "mirrorStage",
    objective: "Let the choice belong to them.",
    choices: [
      {
        text: "Then ask her.",
        next: "askJilli"
      }
    ]
  },


  askJilli: {
    speaker: "Enchanted Fan",
    text: "Jilli... will you sing for us?",
    sprite: "enchantedFan",
    background: "mirrorStage",
    objective: "Let Jilli answer freely too.",
    choices: [
      {
        text: "LOOK AT JILLI",
        next: "jilliChooses"
      }
    ]
  },


  jilliChooses: {
    speaker: "Jillian!",
    text: "Yeah!! Obviously. Slayyyy Queen!!!",
    sprite: "jilliPerformance",
    background: "stage",
    objective: "Return to the stage.",
    choices: [
      {
        text: "LET HER SING",
        next: "truePerformance"
      }
    ]
  },


  truePerformance: {
    speaker: "MIDNIGHT ARCADE",
    text: "The song starts again. This time nobody is trapped. Some dance. Some cry. Some leave. Some stay. The room is finally alive.",
    sprite: "jilliPerformance",
    background: "stage",
    objective: "Complete Jilli's transmission.",
    choices: [
      {
        text: "SLAY",
        next: "fragment"
      }
    ]
  },


  fragment: {
    type: "fragment"
  },


  shee: {
    speaker: "???",
    text: "THE HEART OPENS ONLY WHEN THE DOOR CAN CLOSE.",
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
  CONFIG.jilliPageUrl;


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
    `linear-gradient(rgba(18,11,22,0.05), rgba(18,11,22,0.3)), url("${src}")`;
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

      if (onComplete) {
        onComplete();
      }

      return;
    }

    dialogueEl.textContent += text[i];
    i += 1;

    typewriterTimer =
      setTimeout(
        typeNext,
        speed
      );
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

  choicesEl.innerHTML = "";

  typeText(
    scene.text || "",
    () => {
      renderChoices(scene.choices);
    }
  );

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