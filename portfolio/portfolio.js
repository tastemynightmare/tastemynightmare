const projects = {
  cereal: {
    index: "CASE FILE // 01",
    type: "PACKAGING + BRANDING",
    title: "Sweetheart Cheerios",
    description:
      "A full cereal-box packaging concept built around playful illustration, character branding, hierarchy and multi-panel composition. It demonstrates how I build a visual system across an entire package instead of treating each panel as a separate design.",
    skills:
      "PACKAGING • TYPOGRAPHY • ILLUSTRATION • LAYOUT • BRAND CONSISTENCY",
    image: "assets/images/cereal-box.png",
  },

  matte: {
    index: "CASE FILE // 02",
    type: "IMAGE COMPOSITING",
    title: "Nightmare Matte",
    description:
      "A surreal dark-fantasy environment created through compositing, masking, color work and atmosphere. This project is especially close to my personal visual language because it uses image-making as worldbuilding.",
    skills:
      "PHOTOSHOP • COMPOSITING • MASKING • COLOR • ENVIRONMENTAL STORYTELLING",
    image: "assets/images/matte-painting.jpg",
  },

  parks: {
    index: "CASE FILE // 03",
    type: "POSTER DESIGN",
    title: "Hawaiʻi Volcanoes",
    description:
      "A national-park poster study using silhouette, saturated contrast and simplified visual storytelling. It shows how I can work with restraint and strong shape language outside of my more maximal TMN work.",
    skills:
      "POSTER DESIGN • COLOR • SILHOUETTE • VISUAL HIERARCHY • COMPOSITION",
    image: "assets/images/national-parks.png",
  },

  banner: {
    index: "CASE FILE // 04",
    type: "LARGE-FORMAT DESIGN",
    title: "Orlando Prom",
    description:
      "A fantasy-themed banner concept extended into an environmental mockup to test scale, visibility and physical presentation.",
    skills:
      "LARGE FORMAT • MOCKUPS • EVENT DESIGN • TYPOGRAPHY • SCALE",
    image: "assets/images/banner-mockup.jpg",
  },

  ocean: {
    index: "CASE FILE // 05",
    type: "MOTION DESIGN",
    title: "Ocean Utopia",
    description:
      "A motion-design study exploring animated identity, texture, timing and atmospheric presentation. The project is displayed as video because movement is the actual design medium.",
    skills:
      "AFTER EFFECTS • MOTION • TIMING • TEXTURE • ANIMATED IDENTITY",
    image: "assets/images/ocean-utopia.jpg",
  },

  stickers: {
    index: "CASE FILE // 06",
    type: "ILLUSTRATION / MERCH",
    title: "Kawaii Picnic",
    description:
      "A cohesive sticker set built around cute food characters, shape language and color. It shows a softer side of my visual range while still feeling like a fully authored system.",
    skills:
      "ILLUSTRATION • CHARACTER DESIGN • STICKERS • COLOR SYSTEMS • MERCH",
    image: "assets/images/stickers.png",
  },

  ads: {
    index: "CASE FILE // 07",
    type: "PRINT + WEB ADVERTISING",
    title: "Responsive Ad Campaign",
    description:
      "A campaign adapted across several advertising dimensions while maintaining hierarchy, CTA visibility and visual consistency.",
    skills:
      "ADVERTISING • RESPONSIVE LAYOUT • HIERARCHY • CTA DESIGN • BRAND CONSISTENCY",
    image: "assets/images/print-web-ad.png",
  },

  scene: {
    index: "CASE FILE // 08",
    type: "3D ENVIRONMENT",
    title: "Digital Scene Study",
    description:
      "A 3D environment focused on spatial composition, atmosphere and camera presentation. It extends my design practice into dimensional worldbuilding.",
    skills:
      "3D • ENVIRONMENT DESIGN • CAMERA • COMPOSITION • ATMOSPHERE",
    image: "assets/images/3d-scene.jpg",
  },
};

const body = document.body;

const dialog = document.querySelector("#caseDialog");
const dialogClose = document.querySelector("#dialogClose");
const dialogIndex = document.querySelector("#dialogIndex");
const dialogType = document.querySelector("#dialogType");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogDescription = document.querySelector("#dialogDescription");
const dialogSkills = document.querySelector("#dialogSkills");
const dialogImage = document.querySelector("#dialogImage");

function openProject(projectKey) {
  const project = projects[projectKey];

  if (!project) return;

  dialogIndex.textContent = project.index;
  dialogType.textContent = project.type;
  dialogTitle.textContent = project.title;
  dialogDescription.textContent = project.description;
  dialogSkills.textContent = project.skills;
  dialogImage.src = project.image;
  dialogImage.alt = project.title;

  dialog.showModal();
}

document.querySelectorAll("[data-project]").forEach((element) => {
  element.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (
      element.classList.contains("project-card") &&
      button &&
      button !== element
    ) {
      return;
    }

    const projectKey = element.dataset.project;

    if (projectKey) {
      openProject(projectKey);
    }
  });
});

dialogClose.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  const rect = dialog.getBoundingClientRect();

  const outside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (outside) {
    dialog.close();
  }
});

/* ---------------------------------------------
   FILTER SYSTEM
   --------------------------------------------- */

const filters = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

filters.forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    const filter = filterButton.dataset.filter;

    filters.forEach((button) => {
      button.classList.remove("active");
    });

    filterButton.classList.add("active");

    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");

      const show =
        filter === "all" ||
        categories.includes(filter);

      card.classList.toggle("is-hidden", !show);
    });
  });
});

/* ---------------------------------------------
   NIGHTMARE MODE
   --------------------------------------------- */

const nightmareToggle = document.querySelector("#nightmareToggle");
const secretTransmission = document.querySelector("#secretTransmission");
let nightmareAwake = false;
let nightmareClicks = 0;

nightmareToggle.addEventListener("click", () => {
  nightmareAwake = !nightmareAwake;
  nightmareClicks += 1;

  body.classList.toggle("nightmare-awake", nightmareAwake);

  nightmareToggle.textContent =
    nightmareAwake
      ? "NIGHTMARE: AWAKE"
      : "NIGHTMARE: SLEEPING";

  if (nightmareClicks >= 3) {
    secretTransmission.classList.add("show");
    secretTransmission.setAttribute("aria-hidden", "false");

    window.setTimeout(() => {
      secretTransmission.classList.remove("show");
      secretTransmission.setAttribute("aria-hidden", "true");
    }, 4200);

    nightmareClicks = 0;
  }
});

/* ---------------------------------------------
   RANDOM PROJECT SUMMON
   --------------------------------------------- */

const randomProject = document.querySelector("#randomProject");

randomProject.addEventListener("click", () => {
  const keys = Object.keys(projects);
  const randomKey =
    keys[Math.floor(Math.random() * keys.length)];

  openProject(randomKey);
});

/* ---------------------------------------------
   ARCADE BOOT SEQUENCE
   --------------------------------------------- */

const bootArcade = document.querySelector("#bootArcade");
const terminalStatus = document.querySelector("#terminalStatus");
const terminalText = document.querySelector("#terminalText");
const terminalCommand = document.querySelector("#terminalCommand");

const bootLines = [
  "mounting_midnight_arcade",
  "loading_artist_signal",
  "checking_soul_integrity",
  "opening_bubbles_flow",
];

let booting = false;

bootArcade.addEventListener("click", () => {
  if (booting) return;

  booting = true;
  terminalStatus.textContent = "BOOTING...";
  terminalText.textContent = "INITIALIZING MIDNIGHT ARCADE.";

  let index = 0;

  const timer = window.setInterval(() => {
    terminalCommand.textContent = bootLines[index];
    index += 1;

    if (index >= bootLines.length) {
      window.clearInterval(timer);

      terminalStatus.textContent = "SYSTEM READY";
      terminalText.textContent =
        "TRANSMISSION FOUND. BUBBLES & FLOW IS READY TO PLAY.";
      terminalCommand.textContent = "insert_soul_to_play";
      booting = false;
    }
  }, 520);
});

/* ---------------------------------------------
   SCROLL PROGRESS
   --------------------------------------------- */

const progressFill = document.querySelector("#progressFill");
const progressValue = document.querySelector("#progressValue");

function updateProgress() {
  const scrollable =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const percent =
    scrollable > 0
      ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100))
      : 0;

  progressFill.style.width = `${percent}%`;
  progressValue.textContent = `${String(Math.round(percent)).padStart(2, "0")}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

/* ---------------------------------------------
   POINTER GLOW + LIGHT PARALLAX
   --------------------------------------------- */

const cursorGlow = document.querySelector(".cursor-glow");

if (
  cursorGlow &&
  window.matchMedia("(pointer: fine)").matches
) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;

      card.style.transform =
        `perspective(1200px)
         rotateX(${y * -1.6}deg)
         rotateY(${x * 1.6}deg)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

/* ---------------------------------------------
   KEYBOARD EASTER EGG
   --------------------------------------------- */

let typed = "";

window.addEventListener("keydown", (event) => {
  if (event.key.length !== 1) return;

  typed = `${typed}${event.key.toLowerCase()}`.slice(-9);

  if (typed.includes("nightmare")) {
    body.classList.add("nightmare-awake");
    nightmareAwake = true;
    nightmareToggle.textContent = "NIGHTMARE: AWAKE";

    secretTransmission.classList.add("show");
    secretTransmission.setAttribute("aria-hidden", "false");

    window.setTimeout(() => {
      secretTransmission.classList.remove("show");
      secretTransmission.setAttribute("aria-hidden", "true");
    }, 4200);

    typed = "";
  }
});

/* ---------------------------------------------
   YEAR
   --------------------------------------------- */

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});