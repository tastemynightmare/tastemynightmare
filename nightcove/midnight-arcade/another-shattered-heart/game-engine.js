const els = {
  storyText: document.getElementById("storyText"),
  sceneTitle: document.getElementById("sceneTitle"),
  chapterLabel: document.getElementById("chapterLabel"),
  choices: document.getElementById("choices"),
  objective: document.getElementById("objective"),
  message: document.getElementById("message"),
  sceneImage: document.getElementById("sceneImage"),
  nightCode: document.getElementById("nightCode"),
  fragmentCount: document.getElementById("fragmentCount"),
  controlStat: document.getElementById("controlStat"),
  qtePanel: document.getElementById("qtePanel"),
  qteButton: document.getElementById("qteButton"),
  qtePrompt: document.getElementById("qtePrompt"),
  qteFill: document.getElementById("qteFill"),
  modal: document.getElementById("modal"),
  modalContent: document.getElementById("modalContent"),
};

const state = {
  scene: "prologue",
  nightCode: 0,
  control: 50,
  acceptance: 0,
  desire: 0,
  isolation: 0,
  grief: 0,
  fragments: [],
  inventory: [],
  journal: [],
  flags: {},
};

const SCENES = {
  prologue: {
    chapter: "PROLOGUE",
    title: "THE INVITATION",
    image: "assets/images/prologue.jpg",
    objective: "Enter the Night Cove.",
    text: `Three nights before your first performance of the new era, a black envelope appears beneath your door.

No stamp. No return address.

Inside is a single card stamped with a burning rose:

"ONE NIGHT ONLY. THE INFERNO. COME ALONE.
WE CAN GIVE YOU BACK WHAT YOU LOST."

You should throw it away.

Instead, you recognize your own handwriting on the back.`,
    choices: [
      {
        label: "TURN THE CARD OVER",
        hint: "Read what your past self left behind.",
        next: "card"
      },
      {
        label: "BURN IT",
        hint: "Some things deserve fire.",
        effect: () => {
          addControl(8);
          addJournal("You tried to burn the invitation. The writing survived.");
        },
        next: "burnedCard"
      }
    ]
  },

  burnedCard: {
    chapter: "PROLOGUE",
    title: "IT DOESN'T BURN",
    image: "assets/images/prologue.jpg",
    objective: "Read the card.",
    text: `The paper blackens at the edges.

The words don't.

A second line crawls across the card in wet red ink:

"YOU CANNOT DESTROY A VERSION OF YOURSELF BY HATING HER."

Your phone vibrates.

Unknown Number:
11:26 PM. Night Cove bridge. Don't be late.`,
    choices: [
      { label: "GO", next: "arrival" },
      {
        label: "TEXT BACK: WHO IS THIS?",
        effect: () => addJournal("Unknown Number replied with only a motorcycle emoji and a dead rose."),
        next: "arrival"
      }
    ]
  },

  card: {
    chapter: "PROLOGUE",
    title: "YOUR HANDWRITING",
    image: "assets/images/prologue.jpg",
    objective: "Follow the message.",
    text: `"IF YOU EVER BECOME HER, COME GET ME."

Below it:

11:26 PM.
NIGHT COVE.
BRING NOTHING YOU AREN'T WILLING TO LOSE.

You don't remember writing this.

That doesn't mean you didn't.`,
    choices: [
      {
        label: "POCKET THE CARD",
        effect: () => addInventory("The Invitation", "A black card written in your own hand."),
        next: "arrival"
      }
    ]
  },

  arrival: {
    chapter: "ACT I",
    title: "NIGHT COVE",
    image: "assets/images/night-cove.jpg",
    objective: "Find the source of the music.",
    text: `Night Cove hangs over a black ocean like somebody built a city from a half-remembered dream.

The Inferno pulses red on the western island.
The Midnight Arcade flickers beneath it.
The Nightshade Screen is dark.

And parked directly in your path is a motorcycle wrapped in burning roses.

No rider.

The engine is still warm.`,
    choices: [
      {
        label: "TOUCH THE BIKE",
        hint: "Bad idea. Probably.",
        qte: {
          prompt: "PULL AWAY!",
          duration: 1500,
          success: "cinderMark",
          fail: "cinderBurn"
        }
      },
      {
        label: "FOLLOW THE MUSIC",
        next: "infernoDoor"
      },
      {
        label: "CHECK THE ARCADE",
        effect: () => {
          gainCode(25);
          addJournal("An abandoned cabinet printed 25 Night Code and displayed: FIVE PIECES. ONE HAND.");
        },
        next: "infernoDoor"
      }
    ]
  },

  cinderMark: {
    chapter: "ACT I",
    title: "THE CINDER MARK",
    image: "assets/images/cinder-road.jpg",
    objective: "Reach the Inferno.",
    text: `The handlebars ignite.

You jerk your hand away before the flame closes around your wrist.

A voice behind you says:

"Still quicker than you used to be."

You turn.

Nothing.

Only a long road descending into fog.`,
    choices: [
      { label: "ENTER THE INFERNO", next: "infernoDoor" }
    ]
  },

  cinderBurn: {
    chapter: "ACT I",
    title: "THE BIKE REMEMBERS",
    image: "assets/images/cinder-road.jpg",
    objective: "Reach the Inferno.",
    text: `Fire closes around your wrist.

It doesn't burn skin.

It burns a memory.

For half a second you are somewhere else—laughing on the back of a motorcycle, holding somebody you don't know how to name anymore.

Then the vision is gone.

A black infinity mark remains on your glove.`,
    onEnter: () => {
      state.grief += 5;
      addInventory("Cinder Mark", "A scorched infinity symbol left by the rider.");
    },
    choices: [
      { label: "ENTER THE INFERNO", next: "infernoDoor" }
    ]
  },

  infernoDoor: {
    chapter: "ACT II",
    title: "THE INFERNO",
    image: "assets/images/inferno.jpg",
    objective: "Meet the people who invited you.",
    text: `The club should be packed.

Instead, twenty-five people sit at twenty-five tables facing an empty stage.

They are dressed like they're attending a funeral for somebody who hasn't died yet.

A woman in white approaches.

"ASHELIC ROSE," she says. "At last."

Behind her hangs the symbol from your invitation:

a hand with twenty-six fingers.

She smiles.

"We've been waiting for someone untouched by belonging."

You almost laugh.

They didn't invite a virgin.

They invited what they thought was an empty vessel.`,
    choices: [
      {
        label: `"YOU PICKED THE WRONG GIRL."`,
        effect: () => addControl(-6),
        next: "ritual"
      },
      {
        label: `"WHAT DO YOU WANT FROM ME?"`,
        effect: () => addControl(4),
        next: "ritual"
      },
      {
        label: "SCAN THE ROOM",
        effect: () => {
          gainCode(50);
          state.flags.saw26Seats = true;
          addJournal("There are 25 seated guests and one empty place at the center table.");
        },
        next: "ritual"
      }
    ]
  },

  ritual: {
    chapter: "ACT II",
    title: "THE VELVET HAND",
    image: "assets/images/ritual.jpg",
    objective: "Survive the offering.",
    text: `They call themselves THE VELVET HAND.

Artists. Promoters. Patrons. People who built careers from other people's hunger.

Once every generation, they sacrifice an "unclaimed" woman and pour her possibility into the Hand.

They chose you because your public life looked isolated.
Because you move alone.
Because you learned not to need witnesses.

They mistook hyper-independence for emptiness.

The woman in white raises a blade.

"Give us the girl you were before anyone touched her."

Something inside you starts laughing.`,
    choices: [
      {
        label: "LET THEM BEGIN",
        hint: "You need to know what they think they summoned.",
        next: "shatter"
      },
      {
        label: "RUN",
        qte: {
          prompt: "BREAK THE CIRCLE!",
          duration: 1800,
          success: "shatter",
          fail: "shatter"
        }
      }
    ]
  },

  shatter: {
    chapter: "ACT III",
    title: "THE SHATTERING",
    image: "assets/images/shatter.jpg",
    objective: "Recover the five fragments.",
    text: `The blade touches your chest.

The ritual asks for one untouched self.

It finds five.

The room detonates.

Mirrors burst.
The club lights die.
Something howls beneath the floor.

Five versions of you tear out of the ritual and disappear into Night Cove.

THE WOUNDED.
FALSE ROSE.
THE VAMPIRE.
THE SUCCUBUS.
THE QUEEN.

The Velvet Hand screams.

A motorcycle engine starts somewhere outside.

Your HUD flickers alive:

FRAGMENTS: 0/5

A sixth line appears underneath.

HAND: 25/26.`,
    onEnter: () => addJournal("The ritual failed because there was no single 'original' Ashelic to sacrifice."),
    choices: [
      { label: "FOLLOW THE CRYING", next: "wounded" },
      { label: "FOLLOW THE MIRRORS", next: "falseRose" },
      { label: "FOLLOW THE MUSIC", next: "succubus" }
    ]
  },

  wounded: {
    chapter: "FRAGMENT I",
    title: "THE WOUNDED",
    image: "assets/images/wounded.jpg",
    objective: "Do not abandon her.",
    text: `You find her in a bedroom assembled from places you've lived before.

She isn't weak.

She's furious.

"You let everybody turn me into a lesson," she says.
"You made me useful so you wouldn't have to admit I was hurt."

Three doors appear behind you.

LEAVE.
FIX HER.
STAY.`,
    choices: [
      {
        label: "LEAVE",
        effect: () => { state.grief += 8; addControl(8); },
        next: "woundedLoop"
      },
      {
        label: "TELL HER HOW TO FIX IT",
        effect: () => { addControl(10); },
        next: "woundedLoop"
      },
      {
        label: "SIT WITH HER",
        effect: () => {
          recoverFragment("The Wounded");
          state.acceptance += 12;
          state.grief -= 3;
        },
        next: "hubAfterWounded"
      }
    ]
  },

  woundedLoop: {
    chapter: "FRAGMENT I",
    title: "YOU CAME BACK",
    image: "assets/images/wounded.jpg",
    objective: "Do not abandon her.",
    text: `You step through the door.

You are back in the bedroom.

She looks at you.

"See?"

The game will not let you abandon her.`,
    choices: [
      {
        label: "SIT WITH HER",
        effect: () => {
          recoverFragment("The Wounded");
          state.acceptance += 8;
        },
        next: "hubAfterWounded"
      }
    ]
  },

  hubAfterWounded: {
    chapter: "NIGHT COVE",
    title: "ONE OF FIVE",
    image: "assets/images/night-cove.jpg",
    objective: "Find another fragment.",
    text: `The bedroom collapses into rose petals.

A piece of the song returns with you.

Not vocals.

A heartbeat.`,
    choices: [
      { label: "ENTER THE MIRROR HOUSE", next: "falseRose" },
      { label: "DESCEND TO THE EMPTY CLUB", next: "succubus" },
      { label: "TAKE THE ROAD OUT OF TOWN", next: "vampire" }
    ]
  },

  falseRose: {
    chapter: "FRAGMENT II",
    title: "FALSE ROSE",
    image: "assets/images/false-rose.jpg",
    objective: "Find the mirror that reflects you.",
    text: `Every mirror shows a better version of you.

Richer.
Thinner.
More adored.
Never tired.
Never rejected.
Never caught wanting.

FALSE ROSE walks between the reflections.

"You don't hate me," she says.
"You hate that you couldn't become me fast enough."

One mirror is cracked and ugly.

It is the only one showing the player.`,
    choices: [
      {
        label: "BREAK THE PERFECT MIRROR",
        effect: () => addControl(7),
        next: "falseRoseWrong"
      },
      {
        label: "TOUCH THE CRACKED MIRROR",
        effect: () => {
          recoverFragment("False Rose");
          state.acceptance += 10;
        },
        next: "hub2"
      }
    ]
  },

  falseRoseWrong: {
    chapter: "FRAGMENT II",
    title: "SHE MULTIPLIES",
    image: "assets/images/false-rose.jpg",
    objective: "Stop fighting the reflection.",
    text: `The mirror breaks.

Every shard grows another False Rose.

She smiles.

"That's the problem. You still think destroying the projection destroys the need underneath it."`,
    choices: [
      {
        label: "TOUCH THE CRACKED MIRROR",
        effect: () => {
          recoverFragment("False Rose");
          state.acceptance += 7;
        },
        next: "hub2"
      }
    ]
  },

  succubus: {
    chapter: "FRAGMENT III",
    title: "THE SUCCUBUS",
    image: "assets/images/succubus.jpg",
    objective: "Find desire without an audience.",
    text: `The Inferno is full now.

Thousands of bodies.
Phones raised.
Everybody wants her.

The Succubus performs your song from behind a glass stage.

Each scream from the crowd makes the glass thicker.

She looks directly at you.

"Turn them off."

The audience boos when you approach the power console.`,
    choices: [
      {
        label: "GIVE THEM A BIGGER SHOW",
        effect: () => { state.desire += 8; addControl(6); gainCode(75); },
        next: "succubusLoop"
      },
      {
        label: "CUT THE POWER",
        effect: () => {
          recoverFragment("The Succubus");
          state.desire += 10;
          state.acceptance += 8;
        },
        next: "hub2"
      }
    ]
  },

  succubusLoop: {
    chapter: "FRAGMENT III",
    title: "ENCORE",
    image: "assets/images/succubus.jpg",
    objective: "End the performance.",
    text: `The crowd gets louder.

The Succubus gets smaller behind the glass.

She mouths:

"I said turn them off."`,
    choices: [
      {
        label: "CUT THE POWER",
        effect: () => {
          recoverFragment("The Succubus");
          state.acceptance += 6;
          state.desire += 5;
        },
        next: "hub2"
      }
    ]
  },

  vampire: {
    chapter: "FRAGMENT IV",
    title: "THE VAMPIRE",
    image: "assets/images/vampire.jpg",
    objective: "Leave the safest place in the world.",
    text: `Her mansion has everything.

A studio.
A kitchen that refills itself.
Money in every drawer.
A bed nobody can enter without permission.

No emergencies.
No disappointment.
No dependency.

The Vampire sits at the window.

"Stay," she says. "Nobody can abandon us here."`,
    choices: [
      {
        label: "STAY A WHILE",
        effect: () => { state.isolation += 10; addControl(10); gainCode(100); },
        next: "vampireStay"
      },
      {
        label: "OPEN THE FRONT DOOR",
        effect: () => {
          recoverFragment("The Vampire");
          state.acceptance += 10;
          state.isolation -= 4;
        },
        next: "hub2"
      }
    ]
  },

  vampireStay: {
    chapter: "FRAGMENT IV",
    title: "DAY 1,927",
    image: "assets/images/vampire.jpg",
    objective: "Leave.",
    text: `Nothing hurts.

Nothing happens.

Your Night Code rises automatically.

Your inventory fills.

The date counter spins.

DAY 18.
DAY 400.
DAY 1,927.

The game has become perfectly safe.

It has also stopped.`,
    choices: [
      {
        label: "OPEN THE FRONT DOOR",
        effect: () => {
          recoverFragment("The Vampire");
          state.acceptance += 7;
        },
        next: "hub2"
      }
    ]
  },

  hub2: {
    chapter: "NIGHT COVE",
    title: "THE CITY CHANGES",
    image: "assets/images/night-cove.jpg",
    objective: "Recover all five fragments.",
    text: `Each fragment restores another stem of Another Shattered Heart.

The Cove is beginning to sing with you.

But every fragment recovered also lights another finger on the symbol above the Inferno.`,
    dynamicChoices: () => {
      const options = [];
      if (!state.fragments.includes("The Wounded")) options.push({ label: "FIND THE WOUNDED", next: "wounded" });
      if (!state.fragments.includes("False Rose")) options.push({ label: "ENTER THE MIRROR HOUSE", next: "falseRose" });
      if (!state.fragments.includes("The Succubus")) options.push({ label: "RETURN TO THE INFERNO", next: "succubus" });
      if (!state.fragments.includes("The Vampire")) options.push({ label: "ENTER THE MANSION", next: "vampire" });

      if (state.fragments.length >= 4 && !state.fragments.includes("The Queen")) {
        options.push({ label: "ASCEND TO THE SPIRE", next: "queen" });
      }
      if (state.fragments.length === 5) {
        options.push({ label: "RETURN TO THE INFERNO", next: "finale" });
      }
      return options;
    }
  },

  queen: {
    chapter: "FRAGMENT V",
    title: "THE QUEEN",
    image: "assets/images/queen.jpg",
    objective: "Choose sovereignty.",
    text: `She is waiting in a throne room above Night Cove.

No monster.
No trap.

Just you—finished.

The Queen studies you.

"What did you think becoming me would solve?"

You look at the crown.

For the first time, you understand that integration isn't becoming one perfect version.

It's letting every version belong without letting any one of them rule alone.`,
    choices: [
      {
        label: `"I THOUGHT POWER WOULD MAKE ME SAFE."`,
        effect: () => { addControl(-8); state.acceptance += 12; recoverFragment("The Queen"); },
        next: "hub2"
      },
      {
        label: `"I DON'T NEED TO BE SAFE TO BE WHOLE."`,
        effect: () => { addControl(-12); state.acceptance += 15; recoverFragment("The Queen"); },
        next: "hub2"
      }
    ]
  },

  finale: {
    chapter: "FINALE",
    title: "SET ABLAZE",
    image: "assets/images/finale-stage.jpg",
    objective: "Perform.",
    text: `The Inferno is empty again.

No audience.

No cult.

No mirrors.

Just a microphone.

The five fragments stand in the dark around the stage.

The Wounded.
False Rose.
The Vampire.
The Succubus.
The Queen.

The opening note of Another Shattered Heart plays.

Then another.

Then another.

Every recovered piece has been rebuilding the song.

You step into the light.

This time, nobody is asking you to perform femininity correctly.

Nobody is asking you to be untouched.

Nobody is asking you to become less dangerous.

You sing because you choose to.`,
    choices: [
      {
        label: "BEGIN THE PERFORMANCE",
        qte: {
          prompt: "SET IT ABLAZE",
          duration: 2200,
          success: "twist",
          fail: "twist"
        }
      }
    ]
  },

  twist: {
    chapter: "???",
    title: "ASSEMBLY COMPLETE",
    image: "assets/images/hand.jpg",
    objective: "???",
    text: `5/5 FRAGMENTS RECOVERED.

ASHLIK: WHOLE.

...

The words glitch.

ASHLIK: ~~WHOLE~~

VESSEL STATUS: COMPLETE.

HAND: 25/26.

A chair scrapes across the floor behind you.

The Cinder Rider stands in the doorway.

For the first time, he removes his helmet.

You never see the face.

He looks past you toward the twenty-five empty tables.

"They weren't trying to sacrifice you," he says.

"They were trying to see what would answer."

A twenty-sixth chair appears.

Something knocks from the other side of the screen.

THE 26TH HAND IS WAITING.`,
    choices: [
      {
        label: "END TRANSMISSION",
        effect: () => {
          gainCode(260);
          addInventory("26th Hand Key", "A key that does not belong to any door currently in Night Cove.");
        },
        next: "credits"
      }
    ]
  },

  credits: {
    chapter: "END",
    title: "PRELUDE COMPLETE",
    image: "assets/images/credits.jpg",
    objective: "Return when the Hand opens.",
    text: `ANOTHER SHATTERED HEART: SET ABLAZE

A Taste My Nightmare Game
Developed under NIGHTWARE

ENDING UNLOCKED:
THE GIRL WHO ANSWERED HERSELF

Night Code carried forward.

The 26th Hand remembers what you chose.`,
    choices: [
      { label: "PLAY AGAIN", effect: resetGame, next: "prologue" }
    ]
  }
};

function addControl(amount) {
  state.control = Math.max(0, Math.min(100, state.control + amount));
}

function gainCode(amount) {
  state.nightCode += amount;
  flashMessage(`+${amount} NIGHT CODE`);
}

function recoverFragment(name) {
  if (!state.fragments.includes(name)) {
    state.fragments.push(name);
    gainCode(50);
    flashMessage(`FRAGMENT RECOVERED: ${name.toUpperCase()}`);
  }
}

function addInventory(name, description) {
  if (!state.inventory.some(item => item.name === name)) {
    state.inventory.push({ name, description });
  }
}

function addJournal(text) {
  state.journal.push(text);
}

function flashMessage(text) {
  els.message.textContent = text;
  clearTimeout(flashMessage.timer);
  flashMessage.timer = setTimeout(() => els.message.textContent = "", 2200);
}

function updateHUD() {
  els.nightCode.textContent = String(state.nightCode).padStart(3, "0");
  els.fragmentCount.textContent = `${state.fragments.length}/5`;
  els.controlStat.textContent = state.control;
}

function renderScene(sceneId) {
  const scene = SCENES[sceneId];
  if (!scene) return;

  state.scene = sceneId;

  if (scene.onEnter && !state.flags[`entered_${sceneId}`]) {
    scene.onEnter();
    state.flags[`entered_${sceneId}`] = true;
  }

  els.chapterLabel.textContent = scene.chapter || "";
  els.sceneTitle.textContent = scene.title || "";
  els.storyText.textContent = scene.text || "";
  els.objective.textContent = `OBJECTIVE: ${scene.objective || "Survive."}`;

  if (scene.image) {
    els.sceneImage.style.backgroundImage = `
      linear-gradient(to top, rgba(3,2,6,.38), rgba(3,2,6,.08)),
      url("${scene.image}")
    `;
  }

  const choices = scene.dynamicChoices ? scene.dynamicChoices() : (scene.choices || []);
  renderChoices(choices);
  updateHUD();
}

function renderChoices(choices) {
  els.choices.innerHTML = "";

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerHTML = `${choice.label}${choice.hint ? `<small>${choice.hint}</small>` : ""}`;

    btn.addEventListener("click", () => {
      if (choice.effect) choice.effect();

      if (choice.qte) {
        runQTE(choice.qte);
        return;
      }

      if (choice.next) renderScene(choice.next);
    });

    els.choices.appendChild(btn);
  });
}

function runQTE(config) {
  els.qtePanel.classList.remove("hidden");
  els.qtePrompt.textContent = config.prompt || "ACT!";
  els.qteFill.style.transition = "none";
  els.qteFill.style.transform = "scaleX(1)";

  // Force reflow
  void els.qteFill.offsetWidth;

  els.qteFill.style.transition = `transform ${config.duration}ms linear`;
  els.qteFill.style.transform = "scaleX(0)";

  let finished = false;

  const finish = (won) => {
    if (finished) return;
    finished = true;
    clearTimeout(timeout);
    els.qtePanel.classList.add("hidden");
    els.qteButton.onclick = null;
    renderScene(won ? config.success : config.fail);
  };

  els.qteButton.onclick = () => finish(true);
  const timeout = setTimeout(() => finish(false), config.duration);
}

function openModal(title, html) {
  els.modalContent.innerHTML = `<h2 class="modal-title">${title}</h2>${html}`;
  els.modal.showModal();
}

document.getElementById("inventoryBtn").addEventListener("click", () => {
  const content = state.inventory.length
    ? `<div class="inventory-grid">${state.inventory.map(i =>
        `<div class="inventory-item"><strong>${i.name}</strong><p>${i.description}</p></div>`
      ).join("")}</div>`
    : "<p>Your inventory is empty.</p>";

  openModal("INVENTORY", content);
});

document.getElementById("journalBtn").addEventListener("click", () => {
  const content = state.journal.length
    ? `<ol>${state.journal.map(entry => `<li>${entry}</li>`).join("")}</ol>`
    : "<p>No entries yet.</p>";

  openModal("JOURNAL", content);
});

document.getElementById("saveBtn").addEventListener("click", () => {
  localStorage.setItem("ashGameSave", JSON.stringify(state));
  flashMessage("GAME SAVED");
});

document.getElementById("resetBtn").addEventListener("click", () => {
  if (confirm("Reset all progress?")) {
    resetGame();
    renderScene("prologue");
  }
});

document.getElementById("closeModal").addEventListener("click", () => {
  els.modal.close();
});

function resetGame() {
  state.scene = "prologue";
  state.nightCode = 0;
  state.control = 50;
  state.acceptance = 0;
  state.desire = 0;
  state.isolation = 0;
  state.grief = 0;
  state.fragments = [];
  state.inventory = [];
  state.journal = [];
  state.flags = {};
  localStorage.removeItem("ashGameSave");
}

function loadGame() {
  const save = localStorage.getItem("ashGameSave");
  if (!save) {
    renderScene("prologue");
    return;
  }

  Object.assign(state, JSON.parse(save));
  renderScene(state.scene || "prologue");
}

loadGame();