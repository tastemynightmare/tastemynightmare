document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    window.JAMES_GAME_BOOTED = true;

    const CONFIG = {
        ticketUrl: "https://shotgun.live/en/festivals/bubbles-flow-music-festival",
        jamesPageUrl: "../../artists/dj-james-roll-up/index.html",
        musicEnabled: true
    };

    const ASSETS = {
        characters: {
            jamesPerformance: "assets/characters/james-performance.png",
            jamesHype: "assets/characters/james-hype.png",
            jamesMoney: "assets/characters/james-money.png",
            jamesRollup: "assets/characters/james-rollup.png",
            jamesShocked: "assets/characters/james-shocked.png",
            bagMan: "assets/characters/bag-man.png",
            vibeKiller: "assets/characters/vibe-killer.png",
            goldenBooty: "assets/characters/golden-booty.png"
        },

        backgrounds: {
            transmission: "assets/backgrounds/james-transmission.png",
            parish: "assets/backgrounds/rollup-parish.png",
            deadFunction: "assets/backgrounds/dead-function.png",
            hourglass: "assets/backgrounds/hourglass-incident.png",
            cashout: "assets/backgrounds/cashout-demon.png",
            weedDimension: "assets/backgrounds/weed-dimension.png",
            vibeKiller: "assets/backgrounds/vibe-killer_bgr.png",
            finalParty: "assets/backgrounds/final-party.png"
        },

        audio: {
            ambient: "assets/audio/james-rollup-song.mp3",
            click: "assets/audio/ui-click.mp3",
            glitch: "assets/audio/glitch.wav",
            fragment: "assets/audio/fragment-unlock.mp3",
            bass: "assets/audio/bass-hit.mp3",
            fail: "assets/audio/qte-fail.mp3",
            success: "assets/audio/qte-success.mp3"
        }
    };

    const story = {
        intro: {
            speaker: "MIDNIGHT ARCADE",
            text:
                "SIGNAL 007 FOUND.\n\n" +
                "LOCATION: ROLL UP PARISH, LOUISIANA.\n" +
                "BOOTY CORE MASS: 1.7 LB.\n" +
                "OUTPUT: 17 GIGAWATTS.\n\n" +
                "PARTY DEATH IMMINENT.",
            sprite: "jamesPerformance",
            background: "transmission",
            objective: "Answer Signal 007.",
            effect: "glitch",
            glitchText: "THE TEN-POUND BOOTY PROTOCOL",
            mass: 1.7,
            choices: [
                {
                    text: "ANSWER THE TRANSMISSION",
                    next: "wakeUp"
                }
            ]
        },

        wakeUp: {
            speaker: "DJ James Roll Up",
            text:
                "...Where the fuck everybody at?\n\n" +
                "James looks over the booth. Hundreds of people are standing " +
                "completely still beneath a glowing green Louisiana sky.\n\n" +
                "Above them floats a tiny translucent blue-green ass.\n\n" +
                "It opens one eye.",
            sprite: "jamesShocked",
            background: "parish",
            booty: "idle",
            objective: "Figure out why the party is dying.",
            choices: [
                {
                    text: "Did that ass just look at you?",
                    next: "systemExplains"
                },
                {
                    text: "Maybe don't ask questions. What is the meter saying?",
                    next: "systemExplains"
                }
            ]
        },

        systemExplains: {
            speaker: "MIDNIGHT ARCADE",
            text:
                "THE BOOTY CORE POWERS EVERY FUNCTION IN ROLL UP PARISH.\n\n" +
                "REQUIRED MASS: 10.0 LB.\n" +
                "REQUIRED OUTPUT: 100 GIGAWATTS.\n\n" +
                "IF THE CROWD STOPS MOVING, THE CORE LOSES MASS.\n" +
                "IF THE CORE HITS ZERO, THE FUNCTION DIES.",
            sprite: "jamesHype",
            background: "deadFunction",
            booty: "idle",
            objective: "Wake the crowd before the function collapses.",
            choices: [
                {
                    text: "THROW MONEY AT THEM",
                    next: "moneyFail"
                },
                {
                    text: "ASK WHO READY TO TURN THE FUCK UP",
                    next: "wakeCorrect"
                },
                {
                    text: "ROLL UP AND WAIT",
                    next: "rollFail"
                }
            ]
        },

        moneyFail: {
            speaker: "MIDNIGHT ARCADE",
            text:
                "James throws money into the crowd.\n\n" +
                "Nobody dances.\n\n" +
                "One person calmly bends down, picks up a twenty, and leaves.\n\n" +
                "CASH INCENTIVE INSUFFICIENT.\n" +
                "THEY CAME TO SHAKE ASS, NOT FILE TAXES.",
            sprite: "jamesMoney",
            background: "deadFunction",
            objective: "Try a better crowd-control strategy.",
            mass: 1.5,
            effect: "glitch",
            glitchText: "CASH INCENTIVE FAILED",
            choices: [
                {
                    text: "Okay. That was embarrassing. Try again.",
                    next: "systemExplains"
                }
            ]
        },

        rollFail: {
            speaker: "DJ James Roll Up",
            text:
                "James lights up and waits.\n\n" +
                "The crowd continues staring.\n" +
                "The Booty Core visibly deflates.\n\n" +
                "James: Damn, this shit good though.\n\n" +
                "MIDNIGHT ARCADE: EXCELLENT WEED. TERRIBLE CROWD CONTROL.",
            sprite: "jamesRollup",
            background: "deadFunction",
            objective: "Try a better crowd-control strategy.",
            mass: 1.2,
            effect: "glitch",
            glitchText: "PARTY POWER DROPPING",
            choices: [
                {
                    text: "Put that shit down for five seconds.",
                    next: "systemExplains"
                }
            ]
        },

        wakeCorrect: {
            speaker: "DJ James Roll Up",
            text:
                "AYE! WHO THE FUCK CAME OUT HERE TO STAND AROUND?!\n\n" +
                "One person starts bouncing.\n" +
                "Then ten.\n" +
                "Then fifty.\n\n" +
                "The speakers wake up. Streetlights flash blue and green. " +
                "The Booty Core inflates.\n\n" +
                "James: There we go.",
            sprite: "jamesHype",
            background: "deadFunction",
            booty: "pulse",
            objective: "Generate enough shake pressure to stabilize the Booty Core.",
            mass: 3.0,
            choices: [
                {
                    text: "RUN SHAKE PRESSURE TEST 001",
                    next: "shakeQte"
                }
            ]
        },

        shakeQte: {
            type: "qte",
            qte: "shake"
        },

        shakeSuccess: {
            speaker: "MIDNIGHT ARCADE",
            text:
                "CHEEKS SYNCHRONIZED.\n" +
                "SHAKE PRESSURE: ACCEPTABLE.\n\n" +
                "The Booty Core expands to 4.8 pounds.\n" +
                "Tiny floating booties appear across the skyline like satellites.\n\n" +
                "James: NOW y'all acting right.",
            sprite: "jamesHype",
            background: "parish",
            booty: "pulse",
            objective: "Keep the crowd moving.",
            mass: 4.8,
            choices: [
                {
                    text: "CONTINUE",
                    next: "hourglass"
                }
            ]
        },

        shakeFail: {
            speaker: "MIDNIGHT ARCADE",
            text:
                "INSUFFICIENT CHEEK VELOCITY.\n\n" +
                "The Booty Core deflates with a sad electronic squeak.\n\n" +
                "James: Y'all embarrassing me.",
            sprite: "jamesShocked",
            background: "deadFunction",
            objective: "Retry the Shake Pressure test.",
            effect: "glitch",
            glitchText: "ASS FAILURE",
            choices: [
                {
                    text: "RUN THAT SHIT BACK",
                    next: "shakeQte"
                }
            ]
        },

        hourglass: {
            speaker: "DJ James Roll Up",
            text:
                "The beat suddenly cuts.\n\n" +
                "A gigantic hourglass descends from the sky. Tiny glowing booties " +
                "are falling through it instead of sand.\n\n" +
                "James: Man what the FUCK—\n\n" +
                "MIDNIGHT ARCADE: LYRICAL ACCESS REQUIRED. COMPLETE THE TRIGGER PHRASE.",
            sprite: "jamesShocked",
            background: "hourglass",
            objective: "Use a lyric the crowd recognizes.",
            choices: [
                {
                    text: "“SHAWTY FINE LIKE AN HOURGLASS…”",
                    next: "hourglassCorrect"
                },
                {
                    text: "EVERYBODY PLEASE REMAIN CALM.",
                    next: "hourglassCalmFail"
                },
                {
                    text: "I HAVE A VALID DRIVER'S LICENSE.",
                    next: "hourglassLicenseFail"
                }
            ]
        },

        hourglassCalmFail: {
            speaker: "MIDNIGHT ARCADE",
            text:
                "James politely asks the function to remain calm.\n\n" +
                "Three people leave immediately.\n\n" +
                "WRONG GENRE OF CROWD CONTROL.",
            sprite: "jamesShocked",
            background: "hourglass",
            objective: "Use a lyric the crowd actually recognizes.",
            effect: "glitch",
            glitchText: "WRONG GENRE OF CROWD CONTROL",
            choices: [
                {
                    text: "Okay, absolutely not. Try again.",
                    next: "hourglass"
                }
            ]
        },

        hourglassLicenseFail: {
            speaker: "MIDNIGHT ARCADE",
            text:
                "James announces that he has a valid driver's license.\n\n" +
                "Nobody understands why.\n" +
                "Not even James.\n\n" +
                "DMV INFORMATION REJECTED.",
            sprite: "jamesShocked",
            background: "hourglass",
            objective: "Use a lyric the crowd actually recognizes.",
            effect: "glitch",
            glitchText: "DMV INFORMATION REJECTED",
            choices: [
                {
                    text: "Why would you even say that?",
                    next: "hourglass"
                }
            ]
        },

        hourglassCorrect: {
            speaker: "DJ James Roll Up",
            text:
                "SHAWTY FINE LIKE AN HOURGLASS…\n\n" +
                "The entire parish screams the rest back.\n\n" +
                "The hourglass explodes. Tiny glowing booties rain from heaven.\n\n" +
                "MIDNIGHT ARCADE: LYRIC RECOGNITION CONFIRMED.\n" +
                "CROWD KNOWS THAT SHIT.",
            sprite: "jamesHype",
            background: "hourglass",
            objective: "Follow the sudden money signal.",
            mass: 6.1,
            effect: "shake",
            choices: [
                {
                    text: "FOLLOW THE MONEY",
                    next: "bagMan"
                }
            ]
        },

        bagMan: {
            speaker: "THE BAG MAN",
            text:
                "A gold slot machine tears through the dance floor.\n\n" +
                "AVAILABLE BALANCE: $69,420.\n\n" +
                "A sentient money bag in sunglasses crawls out of it.\n\n" +
                "Bag Man: James. My boy. Forget these people. Take the money.",
            sprite: "bagMan",
            background: "cashout",
            objective: "Decide whether to cash out or protect the function.",
            choices: [
                {
                    text: "TAKE $69,420",
                    next: "cashFail"
                },
                {
                    text: "DOUBLE IT",
                    next: "doubleFail"
                },
                {
                    text: "KEEP DJING",
                    next: "bagCorrect"
                }
            ]
        },

        cashFail: {
            speaker: "MIDNIGHT ARCADE",
            text:
                "James hits CASH OUT.\n\n" +
                "The music stops.\n" +
                "Everybody leaves.\n" +
                "The Bag Man runs away with the ATM.\n\n" +
                "James: WAIT WAIT WAIT WAIT WAIT—\n\n" +
                "YOU SOLD THE FUNCTION.\n" +
                "THERE IS NO FUNCTION NOW.",
            sprite: "jamesShocked",
            background: "cashout",
            objective: "Rewind the cash-out event.",
            mass: 2.6,
            effect: "glitch",
            glitchText: "FUNCTION SOLD",
            choices: [
                {
                    text: "REWIND BEFORE EVERYBODY GOES HOME",
                    next: "bagRewind"
                }
            ]
        },

        doubleFail: {
            speaker: "THE BAG MAN",
            text:
                "James hits DOUBLE IT.\n\n" +
                "The machine spins.\n\n" +
                "NEW BALANCE: -$69,420.\n\n" +
                "James: NIGGA WHAT?!\n\n" +
                "The Bag Man disappears before anybody can ask questions.",
            sprite: "jamesShocked",
            background: "cashout",
            objective: "Rewind the terrible financial decision.",
            effect: "glitch",
            glitchText: "BAD BUSINESS DETECTED",
            choices: [
                {
                    text: "REWIND THIS STUPID SHIT",
                    next: "bagRewind"
                }
            ]
        },

        bagRewind: {
            speaker: "MIDNIGHT ARCADE",
            text:
                "CASHOUT EVENT REWOUND.\n\n" +
                "BOOTY CORE RESTORED TO PREVIOUS MASS.\n\n" +
                "Please stop gambling with municipal ass infrastructure.",
            sprite: "jamesMoney",
            background: "cashout",
            objective: "Protect the function.",
            mass: 6.1,
            choices: [
                {
                    text: "KEEP DJING",
                    next: "bagCorrect"
                }
            ]
        },

        bagCorrect: {
            speaker: "DJ James Roll Up",
            text:
                "If I keep this bitch jumping, the money gon' come anyway.\n\n" +
                "The bass hits so hard the Bag Man starts dancing against his will.\n" +
                "Money spills out of him and rains over the crowd.\n\n" +
                "MIDNIGHT ARCADE: PROFIT GENERATED THROUGH VIBES.",
            sprite: "jamesMoney",
            background: "cashout",
            objective: "Keep the party alive.",
            mass: 7.2,
            effect: "shake",
            choices: [
                {
                    text: "LIGHT IT UP",
                    next: "weedDimension"
                }
            ]
        },

        weedDimension: {
            speaker: "DJ James Roll Up",
            text:
                "James finally takes a hit.\n\n" +
                "Green smoke pours into the mixer.\n" +
                "The sound system inhales.\n\n" +
                "James: ...Oh.\n\n" +
                "The speakers exhale.\n\n" +
                "Gravity turns off.\n" +
                "People float. Cars float. Dollar bills float.\n" +
                "The Bag Man flies past screaming.\n\n" +
                "The Booty Core begins floating into space.",
            sprite: "jamesRollup",
            background: "weedDimension",
            objective: "Use the bass to restore gravity.",
            glitchText: "BOOTY CORE LEAVING EARTH",
            effect: "glitch",
            choices: [
                {
                    text: "ACTIVATE BASS GRAVITY",
                    next: "bassQte"
                }
            ]
        },

        bassQte: {
            type: "qte",
            qte: "bass"
        },

        bassSuccess: {
            speaker: "MIDNIGHT ARCADE",
            text:
                "BASS GRAVITY RESTORED.\n\n" +
                "First drop: the people descend.\n" +
                "Second drop: the cars slam back down.\n" +
                "Third drop: the cosmic booty rockets back toward Louisiana.\n\n" +
                "James: See? Physics.",
            sprite: "jamesHype",
            background: "weedDimension",
            objective: "Investigate the power drain.",
            mass: 8.8,
            choices: [
                {
                    text: "WAIT... WHY ARE THE LIGHTS GOING OUT?",
                    next: "vibeKiller"
                }
            ]
        },

        bassFail: {
            speaker: "DJ James Roll Up",
            text:
                "The bass drops miss.\n\n" +
                "The Booty Core continues floating toward low orbit.\n\n" +
                "James: GET THAT ASS BACK DOWN HERE!",
            sprite: "jamesShocked",
            background: "weedDimension",
            objective: "Retry Bass Gravity.",
            effect: "glitch",
            glitchText: "BOOTY CORE LEAVING EARTH",
            choices: [
                {
                    text: "RECALIBRATE BASS GRAVITY",
                    next: "bassQte"
                }
            ]
        },

        vibeKiller: {
            speaker: "MIDNIGHT ARCADE",
            text:
                "Streetlights shut off one block at a time.\n\n" +
                "A massive creature rises behind the buildings, made from dead flyers, " +
                "empty VIP sections, broken microphones, unplugged aux cords, dusty wristbands, " +
                "and unpaid invoices.\n\n" +
                "ENTITY IDENTIFIED: THE VIBE KILLER.",
            sprite: "vibeKiller",
            background: "vibeKiller",
            objective: "Stop the Vibe Killer from draining the crowd.",
            mass: 7.0,
            glitchText: "THE VIBE KILLER",
            effect: "glitch",
            choices: [
                {
                    text: "WHO THE FUCK IS THAT?",
                    next: "vibeTalks"
                }
            ]
        },

        vibeTalks: {
            speaker: "THE VIBE KILLER",
            text:
                "Nobody wants to hear that.\n" +
                "Turn it down.\n" +
                "People are going home.\n" +
                "They're tired.\n" +
                "It's over.\n\n" +
                "James: Oh, you one of THEM niggas.",
            sprite: "vibeKiller",
            background: "vibeKiller",
            objective: "Retake control of the crowd.",
            choices: [
                {
                    text: "DEFEND THE FUNCTION",
                    next: "crowdQte"
                }
            ]
        },

        crowdQte: {
            type: "qte",
            qte: "crowd"
        },

        crowdSuccess: {
            speaker: "DJ James Roll Up",
            text:
                "LEFT SIDE. CENTER. RIGHT SIDE.\n\n" +
                "James commands every section until the entire parish is moving like one organism.\n\n" +
                "Vibe Killer: STOP HAVING FUN!\n\n" +
                "James: MAKE ME!",
            sprite: "jamesHype",
            background: "finalParty",
            objective: "Reach ten pounds before the Vibe Killer destroys the booth.",
            mass: 9.4,
            effect: "shake",
            choices: [
                {
                    text: "KEEP THAT SHIT GOING",
                    next: "finalIntro"
                }
            ]
        },

        crowdFail: {
            speaker: "MIDNIGHT ARCADE",
            text:
                "THE VIBE KILLER ATE THE FUNCTION.\n\n" +
                "Too many sections went quiet. The Vibe Killer gets visibly fatter " +
                "from stolen party energy.\n\n" +
                "James: Nah. Run that back.",
            sprite: "jamesShocked",
            background: "vibeKiller",
            objective: "Retake the crowd.",
            effect: "glitch",
            glitchText: "VIBE KILLER FED",
            choices: [
                {
                    text: "RUN THE CROWD CONTROL TEST AGAIN",
                    next: "crowdQte"
                }
            ]
        },

        finalIntro: {
            speaker: "THE VIBE KILLER",
            text:
                "The Booty Core reaches 9.4 pounds.\n\n" +
                "Then the Vibe Killer destroys the entire DJ booth.\n\n" +
                "No mixer.\n" +
                "No turntables.\n" +
                "No speakers.\n\n" +
                "Vibe Killer: No music. No party.",
            sprite: "vibeKiller",
            background: "finalParty",
            objective: "Find another way to generate the final 0.6 pounds.",
            choices: [
                {
                    text: "JAMES... YOU STILL GOT THE MIC.",
                    next: "crowdBecomesBeat"
                }
            ]
        },

        crowdBecomesBeat: {
            speaker: "DJ James Roll Up",
            text:
                "James picks up the microphone.\n\n" +
                "Shawty fine like an hourglass…\n\n" +
                "He stops.\n\n" +
                "The crowd screams the rest back.\n" +
                "People stomp. Clap. Chant. Dance.\n" +
                "The whole block becomes percussion.\n\n" +
                "The Vibe Killer looks terrified.",
            sprite: "jamesHype",
            background: "finalParty",
            objective: "Complete the Ten-Pound Booty Protocol.",
            choices: [
                {
                    text: "ACTIVATE FINAL PROTOCOL",
                    next: "finalQte"
                }
            ]
        },

        finalQte: {
            type: "qte",
            qte: "final"
        },

        finalSuccess: {
            speaker: "MIDNIGHT ARCADE",
            text:
                "TEN-POUND BOOTY ACHIEVED.\n" +
                "OUTPUT: 100 GIGAWATTS.\n\n" +
                "The Booty Core becomes fully corporeal.\n" +
                "Clouds split. Gold light pours over Roll Up Parish.\n\n" +
                "The enormous Ten-Pound Booty turns toward the Vibe Killer.\n\n" +
                "Vibe Killer: No.\n\n" +
                "The booty drops from the sky and crushes him.",
            sprite: "jamesHype",
            background: "finalParty",
            booty: "pulse",
            objective: "Witness the impossible.",
            mass: 10.0,
            effect: "shake",
            glitchText: "100 GIGAWATTS",
            choices: [
                {
                    text: "WHAT THE FUCK DID WE JUST DO?",
                    next: "afterParty"
                }
            ]
        },

        afterParty: {
            speaker: "MIDNIGHT ARCADE",
            text:
                "PARTY STABILIZED.\n" +
                "LOUISIANA SAVED.\n" +
                "PROBABLY.\n\n" +
                "The booth rebuilds itself in gold.\n" +
                "James' money counter climbs past $999,999 and finally reads $∞.\n\n" +
                "James lights another one.\n\n" +
                "James: I wasn't worried.\n\n" +
                "Behind him, the Ten-Pound Booty opens one eye.",
            sprite: "jamesRollup",
            background: "finalParty",
            booty: "idle",
            objective: "Recover the fragment.",
            mass: 10.0,
            choices: [
                {
                    text: "RECOVER FRAGMENT",
                    next: "fragment"
                }
            ]
        },

        fragment: {
            type: "fragment"
        },

        shee: {
            speaker: "???",
            text:
                "SEVENTH FREQUENCY ATTACHED.\n\n" +
                "The recovery pattern changed.\n" +
                "Something inside the arcade noticed.\n\n" +
                "SAY A PRAYER TO SHEE.",
            sprite: null,
            background: "finalParty",
            objective: "Follow the signal.",
            effect: "glitch",
            glitchText: "SHEE HEARD THE FUNCTION.",
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
        scenesVisited: 0,
        bootyMass: 1.7,
        qteActive: false,
        qteTimers: [],
        qteCleanupFns: [],
        animationFrame: null
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

    const gigawattMeterEl = document.getElementById("gigawattMeter");
    const gigawattReadoutEl = document.getElementById("gigawattReadout");
    const bootyMassReadoutEl = document.getElementById("bootyMassReadout");
    const gigawattWarningEl = document.getElementById("gigawattWarning");

    const qtePanelEl = document.getElementById("qtePanel");
    const qteTitleEl = document.getElementById("qteTitle");
    const qteInstructionsEl = document.getElementById("qteInstructions");
    const qteStatusEl = document.getElementById("qteStatus");
    const qteVisualEl = document.getElementById("qteVisual");
    const qteControlsEl = document.getElementById("qteControls");

    const bootyLayerEl = document.getElementById("bootyLayer");
    const goldenBootyEl = document.getElementById("goldenBootySprite");

    const reducedMotionQuery =
        window.matchMedia("(prefers-reduced-motion: reduce)");

    const requiredElements = {
        sceneEl,
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
        gigawattMeterEl,
        gigawattReadoutEl,
        bootyMassReadoutEl,
        gigawattWarningEl,
        qtePanelEl,
        qteTitleEl,
        qteInstructionsEl,
        qteStatusEl,
        qteVisualEl,
        qteControlsEl,
        bootyLayerEl,
        goldenBootyEl
    };

    const missingElements =
        Object.entries(requiredElements)
            .filter(([, element]) => !element)
            .map(([name]) => name);

    if (missingElements.length) {
        console.error(
            "DJ James game could not initialize. Missing elements:",
            missingElements
        );

        const fallbackDialogue =
            document.getElementById("dialogueText");

        if (fallbackDialogue) {
            fallbackDialogue.textContent =
                "SYSTEM ERROR: The game HTML and JavaScript do not match. " +
                "Missing: " +
                missingElements.join(", ");
        }

        return;
    }

    document.getElementById("ticketLink").href =
        CONFIG.ticketUrl;

    document.getElementById("page-link").href =
        CONFIG.jamesPageUrl;

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

        if (!musicPlayer.src.endsWith(src)) {
            musicPlayer.src = src;
        }

        musicPlayer.volume = 0.35;
        musicPlayer.play().catch(() => {});
    }

    function toggleSound() {
        gameState.soundOn = !gameState.soundOn;

        soundToggleBtn.textContent =
            gameState.soundOn
                ? "SOUND: ON"
                : "SOUND: OFF";

        soundToggleBtn.setAttribute(
            "aria-pressed",
            String(gameState.soundOn)
        );

        if (gameState.soundOn) {
            startAmbient();
        } else {
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
            `linear-gradient(rgba(2,7,4,0.06), rgba(2,7,4,0.34)), url("${src}")`;
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

        spriteEl.hidden = false;
        spriteEl.src = src;
        spriteEl.alt =
            key.replace(/([A-Z])/g, " $1").trim();

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

    spriteEl.addEventListener("error", () => {
        spriteEl.hidden = true;
    });

    goldenBootyEl.addEventListener("error", () => {
        goldenBootyEl.hidden = true;
    });

    function setGoldenBooty(mode = null) {
        goldenBootyEl.className = "golden-booty-sprite";

        if (!mode) {
            goldenBootyEl.hidden = true;
            return;
        }

        goldenBootyEl.hidden = false;
        goldenBootyEl.classList.add("is-visible");

        if (mode === "pulse") {
            goldenBootyEl.classList.add("is-pulsing");
        }
    }

    function pulseGoldenBooty() {
        if (goldenBootyEl.hidden) {
            setGoldenBooty("idle");
        }

        goldenBootyEl.classList.remove("is-pulsing");

        void goldenBootyEl.offsetWidth;

        goldenBootyEl.classList.add("is-pulsing");
    }

    function jiggleGoldenBooty(side) {
        if (goldenBootyEl.hidden) {
            setGoldenBooty("idle");
        }

        const jiggleClass =
            side === "left"
                ? "jiggle-left"
                : "jiggle-right";

        goldenBootyEl.classList.remove(
            "jiggle-left",
            "jiggle-right",
            "is-pulsing"
        );

        void goldenBootyEl.offsetWidth;

        goldenBootyEl.classList.add(jiggleClass);
    }

    let typewriterTimer = null;

    function typeText(text) {
        if (typewriterTimer) {
            clearTimeout(typewriterTimer);
            typewriterTimer = null;
        }

        if (reducedMotionQuery.matches) {
            dialogueEl.textContent = text;
            return;
        }

        dialogueEl.textContent = "";

        let index = 0;
        const speed = 12;

        function typeNext() {
            if (index >= text.length) {
                typewriterTimer = null;
                return;
            }

            dialogueEl.textContent += text[index];
            index += 1;

            typewriterTimer =
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

        window.setTimeout(() => {
            glitchMessageEl.hidden = true;
            document.body.classList.remove("corrupted");
        }, 850);
    }

    function updateGigawatts(mass) {
        gameState.bootyMass =
            Math.max(
                0,
                Math.min(10, Number(mass))
            );

        const gigawatts =
            Math.round(gameState.bootyMass * 10);

        gigawattMeterEl.value =
            gigawatts;

        gigawattReadoutEl.textContent =
            `${gigawatts} GW`;

        bootyMassReadoutEl.textContent =
            `${gameState.bootyMass.toFixed(1)} LB`;

        gigawattMeterEl.setAttribute(
            "aria-valuetext",
            `${gigawatts} gigawatts and ${gameState.bootyMass.toFixed(1)} pounds of booty mass`
        );

        if (gameState.bootyMass >= 10) {
            gigawattWarningEl.textContent =
                "TEN-POUND BOOTY ACHIEVED";

            document.body.classList.add(
                "gigawatt-overload"
            );
        } else if (gameState.bootyMass >= 8) {
            gigawattWarningEl.textContent =
                "CRITICAL THICCNESS APPROACHING";

            document.body.classList.add(
                "gigawatt-overload"
            );
        } else if (gameState.bootyMass >= 5) {
            gigawattWarningEl.textContent =
                "PARTY STABILIZING";

            document.body.classList.remove(
                "gigawatt-overload"
            );
        } else {
            gigawattWarningEl.textContent =
                "PARTY DEATH IMMINENT";

            document.body.classList.remove(
                "gigawatt-overload"
            );
        }
    }

    function renderChoices(choices = []) {
        choicesEl.replaceChildren();

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
        clearQte();

        fragmentScreenEl.hidden = false;

        playSfx("fragment");
    }

    function showFestival() {
        clearQte();

        festivalScreenEl.hidden = false;

        musicPlayer.pause();
    }

    function renderScene(sceneId) {
        const scene = story[sceneId];

        if (!scene) {
            console.error(
                `Scene "${sceneId}" does not exist.`
            );

            dialogueEl.textContent =
                `SYSTEM ERROR: Scene "${sceneId}" does not exist.`;

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

        if (scene.type === "qte") {
            startQte(scene.qte);
            return;
        }

        clearQte();

        speakerEl.textContent =
            scene.speaker || "MIDNIGHT ARCADE";

        objectiveEl.textContent =
            scene.objective || "Follow the transmission.";

        sceneCounterEl.textContent =
            String(gameState.scenesVisited).padStart(2, "0");

        setBackground(scene.background);
        setSprite(scene.sprite, scene.effect);
        setGoldenBooty(scene.booty || null);

        if (typeof scene.mass === "number") {
            updateGigawatts(scene.mass);
        }

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

    /* =====================================================
       QTE CLEANUP
    ====================================================== */

    function registerQteTimer(timerId) {
        gameState.qteTimers.push(timerId);
        return timerId;
    }

    function registerQteCleanup(cleanupFn) {
        gameState.qteCleanupFns.push(cleanupFn);
    }

    function clearQteTimersOnly() {
        gameState.qteTimers.forEach(timerId => {
            clearTimeout(timerId);
            clearInterval(timerId);
        });

        gameState.qteTimers = [];

        gameState.qteCleanupFns.forEach(cleanupFn => {
            try {
                cleanupFn();
            } catch (error) {
                console.warn(
                    "QTE cleanup failed:",
                    error
                );
            }
        });

        gameState.qteCleanupFns = [];

        if (gameState.animationFrame) {
            cancelAnimationFrame(
                gameState.animationFrame
            );

            gameState.animationFrame = null;
        }
    }

    function clearQte() {
        clearQteTimersOnly();

        gameState.qteActive = false;

        qtePanelEl.hidden = true;

        qteControlsEl.replaceChildren();
        qteVisualEl.replaceChildren();

        qteStatusEl.textContent = "";

        setGoldenBooty(null);
    }

    function createQteButton(label, className = "") {
        const button =
            document.createElement("button");

        button.type = "button";
        button.className =
            `qte-button ${className}`.trim();

        button.textContent = label;

        return button;
    }

    function startQte(type) {
        clearQte();

        choicesEl.replaceChildren();

        const qteConfig = {
            shake: {
                title: "SHAKE PRESSURE // TEST 001",
                instructions:
                    "Alternate LEFT CHEEK and RIGHT CHEEK. " +
                    "Desktop players can also use the left and right arrow keys. " +
                    "You need 16 clean alternating hits.",
                startLabel: "I'M READY — START SHAKE TEST",
                start: startShakeQte
            },

            bass: {
                title: "BASS GRAVITY",
                instructions:
                    "Watch the moving gold marker. Hit DROP when it enters " +
                    "the green zone. Land three clean drops.",
                startLabel: "I'M READY — START BASS GRAVITY",
                start: startBassQte
            },

            crowd: {
                title: "CROWD CONTROL",
                instructions:
                    "Read the warning in the center and tap LEFT SIDE, CENTER, " +
                    "or RIGHT SIDE to save that section. Ignore the fake distraction buttons. " +
                    "Get six correct calls before time runs out.",
                startLabel: "I'M READY — TAKE THE CROWD",
                start: startCrowdQte
            },

            final: {
                title: "TEN-POUND BOOTY PROTOCOL",
                instructions:
                    "Final sequence: hype the crowd, synchronize the cheeks, " +
                    "then drop the bass at 99 gigawatts. Each phase explains itself before its timer starts.",
                startLabel: "I'M READY — START FINAL PROTOCOL",
                start: startFinalQte
            }
        };

        const config = qteConfig[type];

        if (!config) {
            console.error(`Unknown QTE type: ${type}`);

            dialogueEl.textContent =
                `SYSTEM ERROR: Unknown QTE "${type}".`;

            return;
        }

        qtePanelEl.hidden = false;

        qteTitleEl.textContent = config.title;
        qteInstructionsEl.textContent = config.instructions;

        qteStatusEl.innerHTML =
            '<span class="qte-ready-note">' +
            'READ THE INSTRUCTIONS. THE TIMER DOES NOT START UNTIL YOU PRESS START.' +
            '</span>';

        qteVisualEl.innerHTML =
            '<div class="qte-counter">READY?</div>';

        qteControlsEl.replaceChildren();

        const startButton =
            createQteButton(
                config.startLabel,
                "qte-button--wide"
            );

        qteControlsEl.appendChild(startButton);

        startButton.addEventListener("click", () => {
            playSfx("click");

            qteControlsEl.replaceChildren();

            runQteCountdown(() => {
                gameState.qteActive = true;
                config.start();
            });
        });

        qteTitleEl.focus();
    }

    function runQteCountdown(onComplete) {
        clearQteTimersOnly();

        let count = 3;

        qteStatusEl.textContent =
            `STARTING IN ${count}...`;

        qteVisualEl.innerHTML =
            `<div class="qte-counter">${count}</div>`;

        const countdownTimer =
            window.setInterval(() => {
                count -= 1;

                if (count > 0) {
                    qteStatusEl.textContent =
                        `STARTING IN ${count}...`;

                    qteVisualEl.innerHTML =
                        `<div class="qte-counter">${count}</div>`;

                    return;
                }

                window.clearInterval(countdownTimer);

                qteStatusEl.textContent =
                    "GO!";

                qteVisualEl.innerHTML =
                    '<div class="qte-counter">GO!</div>';

                registerQteTimer(
                    window.setTimeout(() => {
                        onComplete();
                    }, 450)
                );
            }, 850);

        registerQteTimer(countdownTimer);
    }

    /* =====================================================
       QTE 1 — SHAKE PRESSURE
    ====================================================== */

    function startShakeQte() {
        qteTitleEl.textContent =
            "SHAKE PRESSURE // TEST 001";

        qteInstructionsEl.textContent =
            "Alternate LEFT CHEEK and RIGHT CHEEK. Desktop players can also use the arrow keys.";

        qteStatusEl.textContent =
            "12 SEC // 0 OF 16 HITS";

        qteVisualEl.innerHTML =
            '<div class="qte-counter" id="shakeCounter">0 / 16</div>';

        const leftButton =
            createQteButton("← LEFT CHEEK");

        const rightButton =
            createQteButton("RIGHT CHEEK →");

        qteControlsEl.append(
            leftButton,
            rightButton
        );

        spriteEl.hidden = true;
        setGoldenBooty("idle");

        let expectedSide = "left";
        let hits = 0;
        let seconds = 12;

        const counter =
            document.getElementById("shakeCounter");

        function finish(success) {
            if (!gameState.qteActive) return;

            clearQte();

            if (success) {
                updateGigawatts(4.8);
                playSfx("success");
                goToScene("shakeSuccess");
            } else {
                playSfx("fail");
                goToScene("shakeFail");
            }
        }

        function registerHit(side) {
            if (!gameState.qteActive) return;

            if (side !== expectedSide) {
                qteStatusEl.textContent =
                    `WRONG CHEEK // EXPECTED ${expectedSide.toUpperCase()}`;

                return;
            }

            hits += 1;

            expectedSide =
                expectedSide === "left"
                    ? "right"
                    : "left";

            counter.textContent =
                `${hits} / 16`;

            qteStatusEl.textContent =
                `${seconds} SEC // ${hits} OF 16 HITS`;

            playSfx("bass");
            jiggleGoldenBooty(side);

            if (hits >= 16) {
                finish(true);
            }
        }

        leftButton.addEventListener(
            "click",
            () => registerHit("left")
        );

        rightButton.addEventListener(
            "click",
            () => registerHit("right")
        );

        function keyHandler(event) {
            if (!gameState.qteActive) return;

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                registerHit("left");
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();
                registerHit("right");
            }
        }

        document.addEventListener(
            "keydown",
            keyHandler
        );

        registerQteCleanup(() => {
            document.removeEventListener(
                "keydown",
                keyHandler
            );
        });

        registerQteTimer(
            window.setInterval(() => {
                seconds =
                    Math.max(0, seconds - 1);

                if (!gameState.qteActive) return;

                qteStatusEl.textContent =
                    `${seconds} SEC // ${hits} OF 16 HITS`;
            }, 1000)
        );

        registerQteTimer(
            window.setTimeout(() => {
                finish(false);
            }, 12000)
        );
    }

    /* =====================================================
       QTE 2 — BASS GRAVITY
    ====================================================== */

    function startBassQte() {
        qteTitleEl.textContent =
            "BASS GRAVITY";

        qteInstructionsEl.textContent =
            "Hit DROP while the gold marker is inside the green zone. Land three clean drops.";

        qteStatusEl.textContent =
            "0 OF 3 CLEAN DROPS";

        qteVisualEl.innerHTML = `
            <div class="timing-track">
                <div class="timing-zone"></div>
                <div
                    class="timing-marker"
                    id="timingMarker"
                ></div>
            </div>
        `;

        const dropButton =
            createQteButton(
                "DROP",
                "qte-button--wide"
            );

        qteControlsEl.appendChild(
            dropButton
        );

        const marker =
            document.getElementById(
                "timingMarker"
            );

        spriteEl.hidden = true;
        setGoldenBooty("idle");

        let position = 0;
        let direction = 1;
        let hits = 0;
        let attempts = 0;
        let lastTimestamp =
            performance.now();

        function finish(success) {
            if (!gameState.qteActive) return;

            clearQte();

            if (success) {
                updateGigawatts(8.8);
                playSfx("success");
                goToScene("bassSuccess");
            } else {
                playSfx("fail");
                goToScene("bassFail");
            }
        }

        function animateMarker(timestamp) {
            if (!gameState.qteActive) return;

            const delta =
                timestamp - lastTimestamp;

            lastTimestamp = timestamp;

            position +=
                direction * delta * 0.08;

            if (position >= 100) {
                position = 100;
                direction = -1;
            }

            if (position <= 0) {
                position = 0;
                direction = 1;
            }

            marker.style.left =
                `calc(${position}% - 2px)`;

            gameState.animationFrame =
                requestAnimationFrame(
                    animateMarker
                );
        }

        if (reducedMotionQuery.matches) {
            position = 50;

            marker.style.left =
                "calc(50% - 2px)";
        } else {
            gameState.animationFrame =
                requestAnimationFrame(
                    animateMarker
                );
        }

        function registerDrop() {
            if (!gameState.qteActive) return;

            attempts += 1;

            const cleanDrop =
                position >= 42 &&
                position <= 58;

            if (cleanDrop) {
                hits += 1;

                qteStatusEl.textContent =
                    `${hits} OF 3 CLEAN DROPS`;

                playSfx("bass");
                pulseGoldenBooty();

                if (hits >= 3) {
                    finish(true);
                }

                return;
            }

            qteStatusEl.textContent =
                `MISSED DROP // ${hits} OF 3 CLEAN`;

            if (attempts >= 7) {
                finish(false);
            }
        }

        dropButton.addEventListener(
            "click",
            registerDrop
        );

        function keyHandler(event) {
            if (
                event.code === "Space" &&
                gameState.qteActive
            ) {
                event.preventDefault();
                registerDrop();
            }
        }

        document.addEventListener(
            "keydown",
            keyHandler
        );

        registerQteCleanup(() => {
            document.removeEventListener(
                "keydown",
                keyHandler
            );
        });
    }

    /* =====================================================
       QTE 3 — CROWD CONTROL
    ====================================================== */

    function startCrowdQte() {
        qteTitleEl.textContent =
            "CROWD CONTROL";

        qteInstructionsEl.textContent =
            "Respond to the section that is losing energy. Ignore the distractions. Get six correct calls before time runs out.";

        qteStatusEl.textContent =
            "16 SEC // 0 OF 6 CROWD CALLS";

        qteVisualEl.innerHTML =
            '<div class="qte-counter" id="crowdPrompt">WAIT...</div>';

        const crowdPrompt =
            document.getElementById(
                "crowdPrompt"
            );

        const crowdButtons = [
            {
                key: "left",
                label: "LEFT SIDE"
            },
            {
                key: "center",
                label: "CENTER"
            },
            {
                key: "right",
                label: "RIGHT SIDE"
            }
        ];

        const decoys = [
            "CHECK YOUR PHONE",
            "COUNT YOUR MONEY",
            "HIT THE BLUNT"
        ];

        crowdButtons.forEach(item => {
            const button =
                createQteButton(item.label);

            button.dataset.crowd =
                item.key;

            qteControlsEl.appendChild(
                button
            );
        });

        decoys.forEach(label => {
            const button =
                createQteButton(
                    label,
                    "qte-button--decoy"
                );

            button.dataset.decoy =
                "true";

            qteControlsEl.appendChild(
                button
            );
        });

        let currentTarget = "left";
        let correct = 0;
        let seconds = 16;

        function finish(success) {
            if (!gameState.qteActive) return;

            clearQte();

            if (success) {
                updateGigawatts(9.4);
                playSfx("success");
                goToScene("crowdSuccess");
            } else {
                playSfx("fail");
                goToScene("crowdFail");
            }
        }

        function choosePrompt() {
            const prompts = [
                {
                    key: "left",
                    text: "LEFT SIDE FALLING OFF!"
                },
                {
                    key: "center",
                    text: "CENTER LOOKING BOUJEE!"
                },
                {
                    key: "right",
                    text: "RIGHT SIDE LOSING HYPE!"
                }
            ];

            const prompt =
                prompts[
                    Math.floor(
                        Math.random() *
                        prompts.length
                    )
                ];

            currentTarget =
                prompt.key;

            crowdPrompt.textContent =
                prompt.text;
        }

        function registerChoice(button) {
            if (!gameState.qteActive) return;

            if (
                button.dataset.decoy ===
                "true"
            ) {
                qteStatusEl.textContent =
                    "DISTRACTION CLICKED // VIBE DROPPING";

                updateGigawatts(
                    Math.max(
                        5.8,
                        gameState.bootyMass - 0.2
                    )
                );

                return;
            }

            if (
                button.dataset.crowd ===
                currentTarget
            ) {
                correct += 1;

                qteStatusEl.textContent =
                    `${seconds} SEC // ${correct} OF 6 CROWD CALLS`;

                playSfx("bass");

                if (correct >= 6) {
                    finish(true);
                    return;
                }

                choosePrompt();
                return;
            }

            qteStatusEl.textContent =
                "WRONG SECTION // VIBE DROPPING";

            updateGigawatts(
                Math.max(
                    5.8,
                    gameState.bootyMass - 0.15
                )
            );
        }

        qteControlsEl
            .querySelectorAll("button")
            .forEach(button => {
                button.addEventListener(
                    "click",
                    () => registerChoice(button)
                );
            });

        choosePrompt();

        registerQteTimer(
            window.setInterval(() => {
                seconds =
                    Math.max(0, seconds - 1);

                if (!gameState.qteActive) return;

                qteStatusEl.textContent =
                    `${seconds} SEC // ${correct} OF 6 CROWD CALLS`;

                if (seconds <= 0) {
                    finish(false);
                }
            }, 1000)
        );
    }

    /* =====================================================
       FINAL QTE — 3 PHASES
    ====================================================== */

    function startFinalQte() {
        updateGigawatts(9.4);
        prepareFinalPhase(
            "FINAL PROTOCOL // PHASE 1",
            "Mash HYPE six times. Your timer begins only after you press START PHASE 1.",
            "START PHASE 1",
            startFinalHypePhase
        );
    }

    function prepareFinalPhase(title, instructions, buttonLabel, startFunction) {
        clearQteTimersOnly();

        gameState.qteActive = false;
        qtePanelEl.hidden = false;

        qteTitleEl.textContent = title;
        qteInstructionsEl.textContent = instructions;
        qteStatusEl.textContent =
            "READ IT FIRST. THIS PHASE IS NOT TIMED YET.";

        qteVisualEl.innerHTML =
            '<div class="qte-counter">READY?</div>';

        qteControlsEl.replaceChildren();

        const button =
            createQteButton(
                buttonLabel,
                "qte-button--wide"
            );

        qteControlsEl.appendChild(button);

        button.addEventListener("click", () => {
            qteControlsEl.replaceChildren();

            runQteCountdown(() => {
                gameState.qteActive = true;
                startFunction();
            });
        });

        qteTitleEl.focus();
    }

    function startFinalHypePhase() {
        clearQteTimersOnly();

        gameState.qteActive = true;
        qtePanelEl.hidden = false;

        qteTitleEl.textContent =
            "FINAL PROTOCOL // PHASE 1";

        qteInstructionsEl.textContent =
            "The crowd is the sound system now. Hit HYPE six times before the energy drops.";

        qteStatusEl.textContent =
            "9.4 LB // 94 GW";

        qteVisualEl.innerHTML =
            '<div class="qte-counter" id="finalHypeCounter">0 / 6</div>';

        qteControlsEl.replaceChildren();

        const button =
            createQteButton(
                "HYPE",
                "qte-button--wide"
            );

        qteControlsEl.appendChild(button);

        const counter =
            document.getElementById(
                "finalHypeCounter"
            );

        let hits = 0;

        button.addEventListener("click", () => {
            if (!gameState.qteActive) return;

            hits += 1;

            counter.textContent =
                `${hits} / 6`;

            playSfx("bass");

            if (hits >= 6) {
                clearQteTimersOnly();
                updateGigawatts(9.6);

                prepareFinalPhase(
                    "FINAL PROTOCOL // PHASE 2",
                    "Alternate LEFT CHEEK and RIGHT CHEEK twelve times. " +
                    "The golden booty will jiggle with each correct input.",
                    "START PHASE 2",
                    startFinalCheekPhase
                );
            }
        });

        registerQteTimer(
            window.setTimeout(() => {
                if (
                    gameState.qteActive &&
                    hits < 6
                ) {
                    clearQte();
                    playSfx("fail");
                    goToScene("crowdFail");
                }
            }, 7000)
        );
    }

    function startFinalCheekPhase() {
        clearQteTimersOnly();

        gameState.qteActive = true;
        qtePanelEl.hidden = false;

        qteTitleEl.textContent =
            "FINAL PROTOCOL // PHASE 2";

        qteInstructionsEl.textContent =
            "CHEEK SYNCHRONIZATION MAXIMUM. Alternate left and right twelve times.";

        qteStatusEl.textContent =
            "9.6 LB // 96 GW";

        qteVisualEl.innerHTML =
            '<div class="qte-counter" id="finalCheekCounter">0 / 12</div>';

        qteControlsEl.replaceChildren();

        const leftButton =
            createQteButton("← LEFT CHEEK");

        const rightButton =
            createQteButton("RIGHT CHEEK →");

        qteControlsEl.append(
            leftButton,
            rightButton
        );

        const counter =
            document.getElementById(
                "finalCheekCounter"
            );

        spriteEl.hidden = true;
        setGoldenBooty("idle");

        let expectedSide = "left";
        let hits = 0;

        function registerHit(side) {
            if (!gameState.qteActive) return;

            if (side !== expectedSide) {
                qteStatusEl.textContent =
                    `WRONG CHEEK // EXPECTED ${expectedSide.toUpperCase()}`;

                return;
            }

            hits += 1;

            expectedSide =
                expectedSide === "left"
                    ? "right"
                    : "left";

            counter.textContent =
                `${hits} / 12`;

            playSfx("bass");
            jiggleGoldenBooty(side);

            if (hits >= 12) {
                clearQteTimersOnly();
                updateGigawatts(9.9);

                prepareFinalPhase(
                    "FINAL PROTOCOL // PHASE 3",
                    "The Booty Core is at 99 gigawatts. " +
                    "When you're ready, there is only one responsible option.",
                    "START PHASE 3",
                    startFinalBassPhase
                );
            }
        }

        leftButton.addEventListener(
            "click",
            () => registerHit("left")
        );

        rightButton.addEventListener(
            "click",
            () => registerHit("right")
        );

        function keyHandler(event) {
            if (!gameState.qteActive) return;

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                registerHit("left");
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();
                registerHit("right");
            }
        }

        document.addEventListener(
            "keydown",
            keyHandler
        );

        registerQteCleanup(() => {
            document.removeEventListener(
                "keydown",
                keyHandler
            );
        });

        registerQteTimer(
            window.setTimeout(() => {
                if (
                    gameState.qteActive &&
                    hits < 12
                ) {
                    clearQte();
                    playSfx("fail");
                    goToScene("crowdFail");
                }
            }, 8500)
        );
    }

    function startFinalBassPhase() {
        clearQteTimersOnly();

        gameState.qteActive = true;
        qtePanelEl.hidden = false;

        qteTitleEl.textContent =
            "FINAL PROTOCOL // PHASE 3";

        qteInstructionsEl.textContent =
            "The Booty Core is at 99 gigawatts. There is only one responsible option.";

        qteStatusEl.textContent =
            "9.99 LB // 99 GW // CRITICAL THICCNESS";

        qteVisualEl.innerHTML =
            '<div class="qte-counter">99 GW</div>';

        spriteEl.hidden = true;
        setGoldenBooty("pulse");

        qteControlsEl.replaceChildren();

        const button =
            createQteButton(
                "DROP THE FUCKING BASS",
                "qte-button--wide"
            );

        qteControlsEl.appendChild(button);

        button.addEventListener("click", () => {
            clearQte();

            updateGigawatts(10);

            playSfx("success");

            goToScene("finalSuccess");
        });

        button.focus();
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

    updateGigawatts(1.7);
    renderScene("intro");

    console.log(
        "DJ JAMES ROLL UP // GAME BOOTED"
    );
});