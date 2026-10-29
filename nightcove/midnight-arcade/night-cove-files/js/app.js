/* Night Cove Files: DOM interface. Rules and case content live in separate files. */
(function () {
  "use strict";
  const game = window.NC_CASE;
  const rules = window.NC_RULES;
  const TOTAL_FINDINGS = game.deductions.length;
  const html = String.raw;
  const KEY = "tmn-ncf-circus-second-print-v2";
  const $ = (id) => document.getElementById(id);
  const esc = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const btn = (text, action, cls = "button", extra = "") => html`
    <button type="button" class="${cls}" data-action="${action}" ${extra}>${text}</button>
  `;
  const source = (id) => game.exhibits.find((e) => e.id === id);
  const available = (e) => rules.available(e, state);
  const say = (text) => {
    $("announcement").textContent = text;
  };
  const heading = (text) => html`
    <h3 class="view-heading" tabindex="-1" id="view-title">${text}</h3>
  `;
  let state = rules.defaults(),
    storageOK = true,
    storageWarning = "",
    view = "briefing",
    selected = "E01",
    activeTask = "tickets",
    opener = null,
    audio = null,
    query = "",
    pinnedOnly = false;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!rules.isCompatible(parsed))
        storageWarning =
          "This save belongs to another edition. Import a compatible export or begin this edition.";
      else state = rules.restore(parsed);
    }
  } catch (_) {
    storageOK = false;
    storageWarning =
      "Browser progress could not be loaded. Export a copy from your notebook as you play.";
  }
  const dialog = $("workbench"),
    content = $("file-content");
  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      storageOK = true;
      storageWarning = "";
    } catch (_) {
      storageOK = false;
    }
    updateSave();
  };
  function updateSave() {
    $("save-status").textContent = storageOK
      ? "Progress saves on this browser."
      : "Browser saving unavailable. Export progress from your notebook.";
  }
  const markSeen = (id) => {
    if (!state.seen.includes(id)) {
      state.seen.push(id);
      save();
    }
  };
  function clack() {
    if (!state.sound) return;
    try {
      const A = window.AudioContext || window.webkitAudioContext;
      if (!A) return;
      if (!audio) audio = new A();
      if (audio.state === "suspended") audio.resume();
      const o = audio.createOscillator(),
        g = audio.createGain(),
        t = audio.currentTime;
      o.type = "triangle";
      o.frequency.setValueAtTime(140, t);
      o.frequency.exponentialRampToValueAtTime(45, t + 0.07);
      g.gain.setValueAtTime(0.035, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      o.connect(g);
      g.connect(audio.destination);
      o.start(t);
      o.stop(t + 0.09);
    } catch (_) {}
  }
  const currentTask = () =>
    game.deductions.find((d) => !state.solved.includes(d.id)) || game.deductions.at(-1);
  // Archive cabinet and persistent preference controls.
  function updateRoom() {
    const drawers = [
      [
        "The Girl Behind the Wall",
        "Nightmare Circus · " +
          (state.completed
            ? "Case reconstructed"
            : state.started
              ? "Continue investigation"
              : "Open investigation"),
      ],
      ["The Ninth Subject", "Memory Lab · Coming soon"],
      ["The House That Knocked Back", "Halloween Night · Coming soon"],
      ["Dead Air at 3:13", "Radio Station · Coming soon"],
      ["The Woman in Apartment 6B", "Apartment 6B · Coming soon"],
      ["The Last Viewing", "Ash House · Coming soon"],
    ];
    const drawerMarkup = drawers
      .map(
        (c, i) => html`
          <button
            type="button"
            class="drawer${i === 0 ? " active" : ""}"
            data-case="${i}"
            aria-label="${esc(i === 0 ? c[1] + ": " + c[0] : c[0] + ", coming soon")}"
          >
            <span class="drawer-number">0${i + 1}</span>
            <span class="drawer-name">
              ${esc(c[0])}
              <small>${esc(c[1])}</small>
            </span>
          </button>
        `,
      )
      .join("");
    document.querySelector(".cabinet").innerHTML = drawerMarkup;
    document.querySelector(".mobile-cabinet").innerHTML = drawerMarkup;
    $("room-progress").textContent =
      `${state.solved.length} / ${TOTAL_FINDINGS} findings${state.completed ? " · case reconstructed" : ""}`;
    const msg = state.fragment
      ? "A voice returned.\nA name still missing."
      : state.completed
        ? "A family heard.\nA record corrected."
        : state.started
          ? "A secret is not\na verdict. Keep going."
          : "Six drawers.\nOne loose thread.\nPull gently.";
    $("operator").innerHTML = esc(msg).replace(/\n/g, "<br>");
    $("mobile-operator").textContent = "A. / " + msg.replace(/\n/g, " ");
    document.body.classList.toggle("large-text", state.largeText);
    $("sound").setAttribute("aria-pressed", String(state.sound));
    $("sound").textContent = "Sound effects: " + (state.sound ? "on" : "off");
    $("large-text").setAttribute("aria-pressed", String(state.largeText));
    $("large-text").textContent = "Larger text: " + (state.largeText ? "on" : "off");
    updateSave();
  }
  function updateMeta() {
    $("case-progress").textContent =
      `${state.solved.length} of ${TOTAL_FINDINGS} findings supported${state.chronology ? " · chronology checked" : ""}`;
    $("next-lead").textContent = state.completed
      ? "Corrected record preserved"
      : state.solved.length === TOTAL_FINDINGS
        ? state.chronology
          ? "Next: submit your reconstruction"
          : "Next: check the chronology"
        : "Current lead: " + currentTask().title;
  }
  function open(next = "briefing", trigger) {
    opener = trigger || document.activeElement;
    view = next;
    if (next === "evidence") markSeen(selected);
    render();
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    say("The Girl Behind the Wall opened.");
  }
  function navigate(next) {
    if (next === "board" && view !== "board") activeTask = currentTask().id;
    view = next;
    if (next === "evidence") markSeen(selected);
    render();
    dialog.scrollTop = 0;
    const focus = content.querySelector("#view-title") || content.querySelector("h3");
    if (focus) {
      focus.setAttribute("tabindex", "-1");
      const headerHeight = dialog.querySelector(".file-header").getBoundingClientRect().height;
      const scrollTarget = focus.closest(".document-head") || focus;
      scrollTarget.style.scrollMarginTop = `${headerHeight + 16}px`;
      focus.focus({ preventScroll: true });
      scrollTarget.scrollIntoView({ block: "start" });
    }
    say("Case section: " + next + ".");
  }
  function openSource(id, trigger) {
    const e = source(id);
    if (!e || !available(e)) {
      say("Follow the current lead to request that source.");
      return;
    }
    selected = id;
    query = "";
    pinnedOnly = false;
    markSeen(id);
    if (!dialog.open) open("evidence", trigger);
    else navigate("evidence");
  }
  function render() {
    $("case-title").textContent = game.title;
    $("case-kicker").textContent = "FILE 01 / NIGHTMARE CIRCUS / 2016";
    const nav = [
      ["briefing", "Case file"],
      ["evidence", "Source papers"],
      ["board", "Evidence wall"],
      ["timeline", "Chronology"],
      ["findings", "Findings"],
      ["accusation", "Reconstruction"],
      ["notebook", "Notebook"],
    ];
    $("file-nav").innerHTML = nav
      .map(
        ([id, name]) => html`
          <button type="button" data-open="${id}" ${view === id ? ' aria-current="page"' : ""}>
            ${name}
          </button>
        `,
      )
      .join("");
    updateMeta();
    const renderers = {
      briefing: renderBriefing,
      evidence: renderEvidence,
      board: renderBoard,
      timeline: renderTimeline,
      findings: renderFindings,
      accusation: renderAccusation,
      notebook: renderNotebook,
      ending: renderEnding,
    };
    (renderers[view] || renderBriefing)();
  }
  // View renderers keep text and rules outside DOM event handling.
  function renderBriefing() {
    content.innerHTML = html`
      <section class="case-cover">
        <div class="cover-copy">
          <span class="eyebrow">Nightmare Circus / a recovered case</span>
          <h3 id="view-title" tabindex="-1">
            The Girl
            <br />
            Behind the Wall
          </h3>
          <p>
            One child missing. One caretaker dead.
            <br />
            Somebody wants you looking at the door.
          </p>
          <div class="actions">
            ${btn(
              state.completed
                ? "Read the corrected record"
                : state.started
                  ? "Continue investigation →"
                  : "Begin investigation →",
              state.completed ? "ending" : "begin",
            )}${btn("How to investigate", "instructions", "button secondary")}
          </div>
          <small>
            Read at your own pace · Progress saved locally
            <br />
            Missing child, non-graphic homicide, manipulation of a child. No jump scares.
          </small>
        </div>
      </section>
      <div class="split">
        <section>
          <h3 class="view-heading">The case reopened</h3>
          <p class="lede">
            Seventeen years after the affair involving Coraline and the Beldam, Nadia Bobinsky
            returns to care for her ill father. She brings Alexei, seventeen; Mila, nine; and Anya,
            eight. Grandfather talks about mice, cheese, a circus, a hole in the wall, “Caroline,”
            and a doll. Then Anya receives a ticket.
          </p>
          <p class="lede">
            On 21 October 2016, Anya disappears. During the search, caretaker Ruth Mercer is found
            dead in a downstairs workroom. Anya and her brother are found alive the following day.
            Ruth’s murder remains unresolved.
          </p>
          <p class="lede">
            Ten years later, returned circus property and Mila’s request bring the file back to your
            desk. Establish what happened to Anya, explain the window sighting, and reconstruct
            Ruth’s fatal encounter.
          </p>
        </section>
        <aside class="slip">
          <h4>Mila’s covering note</h4>
          <p>
            “Please do not change my statement into something cleverer. I saw a cardigan and a
            waving hand. At nine, that was my sister. If it wasn’t, tell me how.”
          </p>
          <p class="eyebrow">Submitted 27 October 2026</p>
          <p>Original sources keep their dates. Later supplements are identified separately.</p>
        </aside>
      </div>
      <details id="instructions">
        <summary>How to investigate</summary>
        <p class="lede">
          Read the available sources in any order. Pin useful documents. On the evidence wall,
          choose an explanation and cite the sources that support it. A supported finding opens a
          relevant follow-up packet. Earlier evidence stays available.
        </p>
        <p class="lede">
          “Opened” means you viewed a source. It does not mean you understood it. Use your notebook
          for theories, the findings page for proved claims, and the chronology to order events.
          Hints have three optional levels. Wrong answers never erase progress.
        </p>
        <p class="lede">
          Everything needed is inside the case. No external searching, tiny hidden pixels,
          audio-only clues, timed clicks, or dragging is required. Use Tab, Shift+Tab, Enter, and
          Space; Escape closes the case file. Sound effects are optional.
        </p>
      </details>
      ${storageWarning
        ? html`
            <div class="notice" role="status">${esc(storageWarning)}</div>
          `
        : ""}
      <h3 class="view-heading people-heading">People in the file</h3>
      <div class="people">
        ${game.people
          .map(
            ([name, role, bio]) => html`
              <article class="person">
                <h4>${esc(name)}</h4>
                <small>${esc(role)}</small>
                <p>${esc(bio)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    `;
  }
  function indexHTML() {
    const items = game.exhibits
      .filter(available)
      .filter(
        (e) =>
          (!pinnedOnly || state.pins.includes(e.id)) &&
          `${e.id} ${e.title} ${e.author} ${e.paragraphs.flat().join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      );
    return items.length
      ? items
          .map(
            (e) => html`
              <button
                class="source-link"
                type="button"
                data-source="${e.id}"
                ${selected === e.id ? ' aria-current="page"' : ""}
              >
                <span>
                  ${e.id} /
                  ${state.pins.includes(e.id)
                    ? "PINNED"
                    : state.seen.includes(e.id)
                      ? "OPENED"
                      : "UNREAD"}
                </span>
                <strong>${esc(e.title)}</strong>
              </button>
            `,
          )
          .join("")
      : "<p>No matching available sources. Clear your search or turn off “Pinned only.”</p>";
  }
  function renderEvidence() {
    if (!available(source(selected))) selected = "E01";
    const e = source(selected);
    content.innerHTML = html`
      <p class="reading-note">
        Read what a source establishes before deciding what it means. Pin useful documents, then
        test your explanation on the evidence wall.
      </p>
      <div class="evidence-layout">
        <aside class="evidence-index" aria-label="Available source papers">
          <div class="index-tools">
            <label for="source-search">
              Search available evidence
              <input
                type="search"
                id="source-search"
                value="${esc(query)}"
                placeholder="Name, phrase, or source ID"
              />
            </label>
            <label class="check-row">
              <input type="checkbox" id="pinned-only" ${pinnedOnly ? " checked" : ""} />
              Pinned only
            </label>
          </div>
          <p class="index-count">
            ${game.exhibits.filter(available).length} of ${game.exhibits.length} sources available
          </p>
          <div class="evidence-list" id="evidence-list">${indexHTML()}</div>
        </aside>
        <article class="paper">
          <header class="document-head">
            <span class="eyebrow">${e.id} / ${esc(e.kind)}</span>
            <h3 id="view-title" tabindex="-1">${esc(e.title)}</h3>
            <span class="eyebrow">
              ${esc(e.author)}
              <br />
              ${esc(e.date)}
            </span>
          </header>
          ${e.paragraphs
            .map(
              ([label, text]) => html`
                <div class="source-row">
                  <strong>${esc(label)}</strong>
                  <p>${esc(text)}</p>
                </div>
              `,
            )
            .join("")}${e.id === "E32" ? mapHTML() : ""}${e.note
            ? html`
                <p class="source-note">${esc(e.note)}</p>
              `
            : ""}
          <div class="actions">
            ${btn(
              state.pins.includes(e.id) ? "Pinned · remove from wall" : "Pin to evidence wall",
              "pin",
              "button secondary pin-button",
              `data-id="${e.id}" aria-pressed="${state.pins.includes(e.id)}"`,
            )}${btn("Compare on the wall →", "board")}${btn(
              "Next available paper →",
              "next-source",
              "button secondary",
            )}
          </div>
        </article>
      </div>
    `;
  }
  function mapHTML() {
    return html`
      <svg class="map" viewBox="0 0 620 310" role="img" aria-labelledby="map-title map-desc">
        <title id="map-title">Ground-floor workroom</title>
        <desc id="map-desc">
          Rectangular room. Corridor entrance on left; service entrance to rear yard on right.
          Repair bench along the upper wall. Trunk and Ruth’s discovery location behind a movable
          scenery panel in the lower-right area. This map repeats the textual scene description.
        </desc>
        <rect
          x="95"
          y="30"
          width="430"
          height="245"
          fill="none"
          stroke="#65404d"
          stroke-width="5"
        />
        <path d="M95 110v70M525 75v65" stroke="#e4d5c8" stroke-width="8" />
        <rect x="190" y="50" width="160" height="40" fill="#c2a394" />
        <text x="215" y="76">Repair bench</text>
        <rect x="375" y="195" width="108" height="42" fill="#baa190" />
        <text x="405" y="222">Trunk</text>
        <path d="M340 160h145" stroke="#71394e" stroke-width="9" />
        <text x="300" y="145">Movable panel</text>
        <text x="25" y="140">Corridor</text>
        <text x="535" y="93">Rear yard</text>
        <circle cx="385" cy="250" r="6" fill="#71394e" />
        <text x="180" y="255">Discovery location →</text>
      </svg>
    `;
  }
  function hintsHTML(d) {
    const n = state.hints[d.id] || 0;
    return html`
      <details id="hint-details">
        <summary>Request a hint · ${n} of 3 revealed</summary>
        <div id="hint-text" class="hint-text">
          ${d.hints
            .slice(0, n)
            .map(
              (h, i) => html`
                <p>
                  <span class="hint-level">LEVEL ${i + 1}</span>
                  <br />
                  ${esc(h)}
                </p>
              `,
            )
            .join("") ||
          "<p>Level 1 nudges your approach. Level 2 identifies useful sources. Level 3 names the required comparison.</p>"}
        </div>
        ${n < 3
          ? btn(`Reveal hint ${n + 1}`, "hint", "button secondary", `data-id="${d.id}"`)
          : '<p class="hint-level">All hints revealed. There is no penalty.</p>'}
      </details>
    `;
  }
  function renderBoard() {
    const unlockedTasks = game.deductions.filter((d) =>
      d.requires.every((id) => state.solved.includes(id)),
    );
    if (!unlockedTasks.some((d) => d.id === activeTask)) activeTask = currentTask().id;
    const d = game.deductions.find((x) => x.id === activeTask),
      done = state.solved.includes(d.id),
      pins = state.pins.map(source).filter(available);
    content.innerHTML =
      heading("The evidence wall") +
      html`
        <p class="lede">
          Build a claim from sources. A pinned paper is a reminder; a supported finding is a
          conclusion you can defend.
        </p>
        <div class="board-surface">
          ${pins.length
            ? html`
                <div class="pinned-items">
                  ${pins
                    .map(
                      (e) => html`
                        <article class="pinned">
                          <small>${e.id} / ${esc(e.kind)}</small>
                          <button type="button" data-source="${e.id}">${esc(e.title)}</button>
                        </article>
                      `,
                    )
                    .join("")}
                </div>
              `
            : '<p class="board-empty">The wall is empty. Start with the tickets and the workshop record. Pin them from the source papers.</p>'}
        </div>
        <nav class="task-list" aria-label="Available deductions">
          ${unlockedTasks
            .map(
              (x, i) => html`
                <button
                  type="button"
                  data-task="${x.id}"
                  ${x.id === d.id ? ' aria-current="step"' : ""}
                >
                  ${state.solved.includes(x.id) ? "✓ " : ""}${i + 1}. ${esc(x.title)}
                </button>
              `,
            )
            .join("")}
        </nav>
        <form id="deduction-form" class="proof-form">
          <span class="eyebrow">
            FINDING ${game.deductions.indexOf(d) + 1} / ${done ? "SUPPORTED" : "INQUIRY"}
          </span>
          <h4>${esc(d.title)}</h4>
          ${done
            ? html`
                <div class="feedback">${esc(d.finding)}</div>
                <p>${esc(d.next)}</p>
                <div class="actions">
                  ${btn(
                    state.solved.length === TOTAL_FINDINGS
                      ? "Build the chronology →"
                      : "Follow the next lead →",
                    state.solved.length === TOTAL_FINDINGS ? "timeline" : "follow",
                  )}${btn("Read source papers", "evidence", "button secondary")}
                </div>
              `
            : html`
                <fieldset class="choice-group">
                  <legend>${esc(d.question)}</legend>
                  ${d.choices
                    .map(
                      ([value, text]) => html`
                        <label class="radio-row">
                          <input type="radio" name="claim" value="${value}" required />
                          ${esc(text)}
                        </label>
                      `,
                    )
                    .join("")}
                </fieldset>
                <fieldset class="source-choices">
                  <legend>Cite exactly ${d.sources.length} relevant pinned sources</legend>
                  ${pins.length
                    ? pins
                        .map(
                          (e) => html`
                            <label class="check-row">
                              <input type="checkbox" name="sources" value="${e.id}" />
                              ${e.id} · ${esc(e.title)}
                            </label>
                          `,
                        )
                        .join("")
                    : "<p>Pin sources from the source papers first.</p>"}
                </fieldset>
                <div class="actions">
                  <button type="submit" class="button">Test this finding →</button>
                  ${btn("Read source papers", "evidence", "button secondary")}
                </div>
                <div id="deduction-feedback" aria-live="polite"></div>
                ${hintsHTML(d)}
              `}
        </form>
      `;
  }
  function renderTimeline() {
    if (state.solved.length !== TOTAL_FINDINGS) {
      content.innerHTML =
        heading("A chronology needs supported events") +
        html`
          <p class="lede">
            You can inspect every source opened so far. Once all supported findings are supported,
            arrange the key events without treating an estimated medical interval as an exact clock.
          </p>
          <div class="actions">${btn("Return to the current lead →", "follow")}</div>
        `;
      return;
    }
    content.innerHTML =
      heading("Reconstruct the night") +
      html`
        <p class="lede">
          Order these events by when they begin. One event happened the previous day. The workroom
          encounter starts before the 20:00 message; the medical report does not give an exact death
          minute. Use the arrows or keyboard buttons. Dragging is never required.
        </p>
        <ol class="timeline">
          ${state.timeline
            .map((id, i) => {
              const e = game.events.find((x) => x.id === id);
              return html`
                <li>
                  <div>
                    <span class="event-time">${esc(e.time)}</span>
                    <p>${esc(e.text)}</p>
                    <small>${esc(e.source)}</small>
                  </div>
                  <div class="move-controls">
                    ${btn(
                      "↑",
                      "move",
                      "",
                      `data-index="${i}" data-step="-1" aria-label="Move ${esc(e.text)} earlier"${i === 0 || state.completed ? " disabled" : ""}`,
                    )}${btn(
                      "↓",
                      "move",
                      "",
                      `data-index="${i}" data-step="1" aria-label="Move ${esc(e.text)} later"${i === state.timeline.length - 1 || state.completed ? " disabled" : ""}`,
                    )}
                  </div>
                </li>
              `;
            })
            .join("")}
        </ol>
        <div class="actions">
          ${btn("Check chronology", "check-timeline")}${state.chronology
            ? btn("Submit reconstruction →", "accusation", "button secondary")
            : ""}
        </div>
        <div id="timeline-feedback" aria-live="polite">
          ${state.chronology
            ? '<div class="feedback">Chronology supported. You have kept the assault, departure, and later staging in their proper order.</div>'
            : ""}
        </div>
      `;
  }
  function renderFindings() {
    content.innerHTML =
      heading("What the sources establish") +
      html`
        <p class="reading-note">
          Your notebook holds theories. These findings record supported deductions. Original
          documents do not change when a finding is accepted.
        </p>
        <div class="findings">
          ${game.deductions
            .map((d, i) => {
              const done = state.solved.includes(d.id);
              return html`
                <article class="finding${done ? "" : " pending"}">
                  <span class="eyebrow">
                    FINDING ${i + 1} / ${done ? "SUPPORTED" : "AWAITING SUPPORT"}
                  </span>
                  <h4>${esc(d.title)}</h4>
                  ${done
                    ? html`
                        <p>${esc(d.finding)}</p>
                        <p class="eyebrow">Sources: ${d.sources.join(" · ")}</p>
                      `
                    : "<p>Follow the available leads to establish this finding.</p>"}
                </article>
              `;
            })
            .join("")}
        </div>
        <div class="actions">
          ${btn(
            state.solved.length === TOTAL_FINDINGS
              ? "Build the chronology →"
              : "Follow the current lead →",
            state.solved.length === TOTAL_FINDINGS ? "timeline" : "follow",
          )}
        </div>
      `;
  }
  function selectHTML(name, label, items) {
    return html`
      <label>
        ${label}
        <select name="${name}" required>
          <option value="">Choose an answer</option>
          ${items
            .map(
              ([v, t]) => html`
                <option value="${esc(v)}">${esc(t)}</option>
              `,
            )
            .join("")}
        </select>
      </label>
    `;
  }
  function renderAccusation() {
    if (state.completed) {
      renderEnding();
      return;
    }

    if (state.solved.length !== TOTAL_FINDINGS || !state.chronology) {
      content.innerHTML =
        heading("Build a case before naming a killer") +
        html`
          <p class="lede">
            A real deception is not necessarily the whole crime. Support the findings and check the
            chronology before naming the killer. You can revisit every opened source and revise your
            theory.
          </p>
          <div class="actions">
            ${btn(
              state.solved.length === TOTAL_FINDINGS
                ? "Check the chronology →"
                : "Follow the current lead →",
              state.solved.length === TOTAL_FINDINGS ? "timeline" : "follow",
            )}
          </div>
        `;
      return;
    }

    const pinnedOptions = state.pins.map((id) => [id, id + " · " + source(id).title]);
    content.innerHTML =
      heading("Submit your reconstruction") +
      html`
        <p class="lede">
          Explain the murder and distinguish the two deceptions. A correct suspect without
          supporting evidence does not close the case. Unsupported submissions can be revised
          without penalty.
        </p>
        <form id="final-form" class="paper">
          <div class="form-grid">
            ${game.finalQuestions
              .map((question) =>
                selectHTML(
                  question.name,
                  question.label,
                  question.source ? pinnedOptions : question.choices,
                ),
              )
              .join("")}
          </div>
          <div class="actions">
            <button type="submit" class="button">File the supported reconstruction →</button>
            ${btn("Review findings", "findings", "button secondary")}
          </div>
          <div id="final-feedback" aria-live="polite"></div>
        </form>
      `;
  }
  function renderNotebook() {
    content.innerHTML =
      heading("Your notebook") +
      html`
        <div class="split">
          <section>
            <label for="case-notes">
              Facts, assumptions, questions
              <textarea
                id="case-notes"
                maxlength="16000"
                placeholder="Which source supports this? What would disprove it?"
              >
${esc(state.notes)}</textarea
              >
            </label>
            <p id="note-save" class="save-info">
              ${storageOK
                ? "Saved on this browser."
                : "Browser saving unavailable. Export progress to keep a copy."}
            </p>
            <div class="note-tools">
              ${btn("Export progress + notes (.json)", "export")}${btn(
                "Export readable notes (.txt)",
                "export-notes",
                "button secondary",
              )}
              <label class="upload-label">
                Import progress (replaces current save)
                <input id="import-progress" type="file" accept=".json,application/json" />
              </label>
              ${btn("Start this case again", "reset", "button secondary")}
            </div>
            <div id="import-feedback" aria-live="polite"></div>
          </section>
          <aside class="slip">
            <h4>A note from A.</h4>
            <p>A secret is a reason to ask another question. It is not a verdict.</p>
            <p>Keep your own words here. Supported findings remain in their own file.</p>
            <p>
              Browser saves stay on this device and this site address. Moving to Midnight Arcade
              will create a new save location. Export progress here, then import it there.
            </p>
            <p>No account is required. Nothing in your notebook is sent to a server.</p>
            <details>
              <summary>Play-test notes</summary>
              <p>
                Record where you felt stuck, which clue changed your theory, and your total time. An
                unfamiliar reader’s timing is more useful than the author’s.
              </p>
            </details>
          </aside>
        </div>
      `;
  }
  function renderEnding() {
    content.innerHTML =
      heading("The corrected record") +
      html`
        <article class="completion">
          <span class="eyebrow">RUTH MERCER / RECONSTRUCTION SUPPORTED</span>
          <h3>Two deceptions. One fatal encounter.</h3>
          <p>
            Alexei copied the family tickets and added a secret instruction. He used Anya’s
            disappointment to get her to leave. His draft, Anya’s observed account, and the
            independent journey establish what he did. They do not make him Ruth’s killer.
          </p>
          <p>
            The later performance at the window belongs to a separate sequence. The siblings were
            across town. Mila’s description matches the repaired figure and mounted cardigan. Pavel
            directed her outside, and his early walkthrough describes a revised movement his old
            photograph cannot show and he claims never to have seen.
          </p>
          <p>
            Ruth’s murder requires its own evidence. She intended to deliver original correspondence
            exposing false authority and ownership claims. Pavel was with her in the workroom, gave
            a false assurance at the door, and left carrying the bag containing the compatible
            counterweight with her blood. The medical findings, property history, witness account,
            and independent movements converge on the fatal encounter.
          </p>
          <p>
            Pavel did not invent Alexei’s escape. He exploited the disappearance to extend a ghost
            story already taking shape. Alexei’s deception gave him a convincing alternative
            explanation for the family’s fear.
          </p>
          <p>
            The exact minute of Ruth’s death remains unknown. The corrected file preserves the
            limits of the medical and storage evidence. A reconstruction supports renewed
            investigation; it is not a court verdict.
          </p>
        </article>
        <div class="split">
          <section class="paper">
            <h3>“You made her a ticket.”</h3>
            <p class="lede">
              Mila repeats it slowly. Alexei says he thought it was the only way to get Anya out.
            </p>
            <p class="lede">“And you left me in the house with whatever you were frightened of.”</p>
            <p class="lede">He begins an explanation, then stops. “Yes.”</p>
            <p class="lede">
              She does not forgive him on the recording. She asks him to stay on the line.
            </p>
          </section>
          <aside class="slip">
            <h4>June’s envelope</h4>
            <p>
              June keeps the unused rail tickets. The file keeps Ruth’s Sunday list: fix the kitchen
              catch; return the casserole dish; accordion practice, windows shut.
            </p>
            <p>“I want people to know she was going somewhere.”</p>
          </aside>
        </div>
        <div class="notice">
          Mila’s drawing of the miniature audience remains unsettled. Ruth sits beside an empty
          chair marked MILA. The drawing’s creation time was not independently recorded. It cannot
          prove a haunting. Mila still says she copied what she saw.
        </div>
        ${state.fragment
          ? fragmentHTML()
          : html`
              <div class="actions">
                ${btn("Open the restored evening count →", "fragment")}${btn(
                  "Save a copy of your progress",
                  "export",
                  "button secondary",
                )}
              </div>
            `}
      `;
  }
  function fragmentHTML() {
    return html`
      <section class="fragment" aria-labelledby="fragment-title">
        <span class="eyebrow">SUPPLEMENT / UNASSIGNED OWNER / VOICE</span>
        <h4 id="fragment-title">Count them again.</h4>
        <p>
          The original care recording remains intact. A damaged tail has been recovered as a
          separate supplement. The case record does not attribute this sound to a named witness.
        </p>
        <blockquote>
          BOBINSKY: One. Two. Three.
          <br />
          <br />
          UNIDENTIFIED VOICE: You always forget me.
        </blockquote>
        <p>
          The recovery destination is not Ruth’s property locker. It is marked
          <strong>UNASSIGNED OWNER · A.</strong>
        </p>
        <p>
          A new line appears on the archive terminal:
          <em>“Thank you. I can answer now.”</em>
        </p>
        <div class="actions">
          ${btn("Return to the archive", "archive")}${btn(
            "Export progress",
            "export",
            "button secondary",
          )}
        </div>
      </section>
    `;
  }
  // Local feedback, downloads, and dialog focus recovery.
  function showFeedback(id, result) {
    $(id).innerHTML = html`
      <div class="feedback${result.ok ? "" : " error"}">${esc(result.message)}</div>
    `;
    say(result.ok ? "Supported. " + result.message : "Needs revision. " + result.message);
  }
  function download(name, text, type) {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    say("Export downloaded.");
  }
  function returnFocus() {
    if (opener?.isConnected) {
      opener.focus();
      return;
    }
    const nav = window.matchMedia("(max-width:760px)").matches ? ".mobile-cabinet" : ".cabinet";
    document.querySelector(nav + ' [data-case="0"]')?.focus();
  }
  function close() {
    dialog.close();
    returnFocus();
  }
  // Delegation keeps re-rendered controls usable without repeated listeners.
  document.addEventListener("click", (event) => {
    const drawer = event.target.closest("[data-case]");
    if (drawer) {
      clack();
      const i = Number(drawer.dataset.case);
      if (i === 0) {
        open("briefing", drawer);
        return;
      }
      opener = drawer;
      view = "coming";
      $("case-title").textContent = [
        "",
        "The Ninth Subject",
        "The House That Knocked Back",
        "Dead Air at 3:13",
        "The Woman in Apartment 6B",
        "The Last Viewing",
      ][i];
      $("case-kicker").textContent = `FILE 0${i + 1} / AWAITING INTAKE`;
      $("file-nav").innerHTML = "";
      $("case-progress").textContent = "Coming soon";
      $("next-lead").textContent = "This investigation is not yet available.";
      content.innerHTML =
        heading("This drawer is still sealed") +
        html`
          <p class="lede">
            The archive has reserved this file. The complete Nightmare Circus investigation is open
            now.
          </p>
          <div class="actions">${btn("Open Nightmare Circus →", "briefing")}</div>
        `;
      if (!dialog.open) dialog.showModal();
      dialog.scrollTop = 0;
      return;
    }
    const src = event.target.closest("[data-source]");
    if (src) {
      clack();
      openSource(src.dataset.source, src);
      return;
    }
    const nav = event.target.closest("[data-open]");
    if (nav) {
      clack();
      if (!dialog.open) open(nav.dataset.open, nav);
      else navigate(nav.dataset.open);
      return;
    }
    const task = event.target.closest("[data-task]");
    if (task) {
      activeTask = task.dataset.task;
      renderBoard();
      content.querySelector("#view-title").focus();
      return;
    }
    const b = event.target.closest("[data-action]");
    if (!b) return;
    const a = b.dataset.action;
    clack();
    if (
      [
        "briefing",
        "evidence",
        "board",
        "timeline",
        "findings",
        "accusation",
        "notebook",
        "ending",
      ].includes(a)
    ) {
      navigate(a);
      return;
    }
    if (a === "begin") {
      const continuing = state.started;
      state.started = true;
      save();
      updateRoom();
      if (continuing) {
        activeTask = currentTask().id;
        navigate("board");
      } else {
        openSource("E01");
      }
    }
    if (a === "instructions") {
      const d = $("instructions");
      d.open = true;
      d.querySelector("summary").focus();
      d.scrollIntoView({ block: "start" });
    }
    if (a === "pin") {
      const id = b.dataset.id;
      state.pins = state.pins.includes(id)
        ? state.pins.filter((x) => x !== id)
        : [...state.pins, id];
      save();
      b.textContent = state.pins.includes(id)
        ? "Pinned · remove from wall"
        : "Pin to evidence wall";
      b.setAttribute("aria-pressed", String(state.pins.includes(id)));
      $("evidence-list").innerHTML = indexHTML();
      say(id + (state.pins.includes(id) ? " pinned." : " unpinned."));
    }
    if (a === "next-source") {
      const items = game.exhibits.filter(available),
        i = items.findIndex((e) => e.id === selected);
      openSource(items[(i + 1) % items.length].id);
    }
    if (a === "follow") {
      activeTask = currentTask().id;
      const items = game.exhibits.filter(available);
      const unread = items.find(
        (e) => e.stage === rules.stage(state) && !state.seen.includes(e.id),
      );
      if (unread) openSource(unread.id);
      else navigate("board");
    }
    if (a === "hint") {
      const d = game.deductions.find((x) => x.id === b.dataset.id),
        n = Math.min(3, (state.hints[d.id] || 0) + 1);
      state.hints[d.id] = n;
      save();
      $("hint-details").querySelector("summary").textContent =
        `Request a hint · ${n} of 3 revealed`;
      $("hint-text").innerHTML = d.hints
        .slice(0, n)
        .map(
          (h, i) => html`
            <p>
              <span class="hint-level">LEVEL ${i + 1}</span>
              <br />
              ${esc(h)}
            </p>
          `,
        )
        .join("");
      if (n === 3) {
        b.disabled = true;
        b.textContent = "All hints revealed";
        $("hint-text").setAttribute("tabindex", "-1");
        $("hint-text").focus();
      } else b.textContent = "Reveal hint " + (n + 1);
      say(d.hints[n - 1]);
    }
    if (a === "move") {
      if (state.completed) return;
      const i = Number(b.dataset.index),
        j = i + Number(b.dataset.step);
      if (j < 0 || j >= state.timeline.length) return;
      [state.timeline[i], state.timeline[j]] = [state.timeline[j], state.timeline[i]];
      state.chronology = false;
      save();
      renderTimeline();
      const next = content.querySelector(
        `[data-index="${j}"][data-step="${b.dataset.step}"]:not(:disabled)`,
      );
      (next || content.querySelector(`[data-index="${j}"]:not(:disabled)`))?.focus();
      say("Event moved to position " + (j + 1) + ".");
    }
    if (a === "check-timeline") {
      const ok = rules.timelineCorrect(state.timeline);
      state.chronology = ok;
      save();
      updateMeta();
      if (ok) {
        renderTimeline();
        $("timeline-feedback").setAttribute("tabindex", "-1");
        $("timeline-feedback").focus();
      } else
        showFeedback("timeline-feedback", {
          ok: false,
          message:
            "The sequence needs revision. Start with the altered invitation on the previous day; then order the workroom encounter, message, exit, journey, sighting, and discovery.",
        });
    }
    if (a === "fragment") {
      state.fragment = true;
      save();
      updateRoom();
      renderEnding();
      content.querySelector("#fragment-title").setAttribute("tabindex", "-1");
      content.querySelector("#fragment-title").focus();
    }
    if (a === "archive") close();
    if (a === "export")
      download(
        "night-cove-files-progress.json",
        JSON.stringify(state, null, 2),
        "application/json",
      );
    if (a === "export-notes")
      download(
        "night-cove-files-notes.txt",
        game.title +
          "\n\nYOUR NOTES\n" +
          state.notes +
          "\n\nSUPPORTED FINDINGS\n" +
          game.deductions
            .filter((d) => state.solved.includes(d.id))
            .map((d) => d.title + "\n" + d.finding + "\nSources: " + d.sources.join(", "))
            .join("\n\n"),
        "text/plain",
      );
    if (a === "reset") $("reset-dialog").showModal();
  });
  document.addEventListener("submit", (event) => {
    if (event.target.id === "deduction-form") {
      event.preventDefault();
      const f = new FormData(event.target),
        result = rules.checkDeduction(activeTask, f.get("claim"), f.getAll("sources"), state);
      if (result.ok) {
        if (!state.solved.includes(activeTask)) state.solved.push(activeTask);
        save();
        updateRoom();
        updateMeta();
        renderBoard();
        content.querySelector("#view-title").focus();
        say(result.message + " " + game.deductions.find((d) => d.id === activeTask).next);
      } else showFeedback("deduction-feedback", result);
    }
    if (event.target.id === "final-form") {
      event.preventDefault();
      const result = rules.checkFinal(Object.fromEntries(new FormData(event.target)), state);
      if (result.ok) {
        state.completed = true;
        save();
        updateRoom();
        navigate("ending");
      } else showFeedback("final-feedback", result);
    }
  });
  document.addEventListener("input", (event) => {
    if (event.target.id === "case-notes") {
      state.notes = event.target.value.slice(0, 16000);
      save();
      $("note-save").textContent = storageOK
        ? "Saved on this browser."
        : "Browser saving unavailable. Export progress to keep a copy.";
    }
    if (event.target.id === "source-search") {
      query = event.target.value;
      $("evidence-list").innerHTML = indexHTML();
    }
  });
  document.addEventListener("change", async (event) => {
    if (event.target.id === "pinned-only") {
      pinnedOnly = event.target.checked;
      $("evidence-list").innerHTML = indexHTML();
    }
    if (event.target.id === "import-progress") {
      const file = event.target.files[0];
      if (!file) return;
      try {
        if (file.size > 200000) throw new Error("This file is too large for a progress export.");
        const parsed = JSON.parse(await file.text());
        if (!rules.isCompatible(parsed))
          throw new Error("Choose a progress export for this Nightmare Circus edition.");
        state = rules.restore(parsed);
        save();
        updateRoom();
        updateMeta();
        showFeedback("import-feedback", {
          ok: true,
          message: "Progress imported. You can continue from your supported findings.",
        });
      } catch (error) {
        showFeedback("import-feedback", {
          ok: false,
          message:
            error instanceof SyntaxError
              ? "That file is not a valid progress export."
              : error.message,
        });
      }
      event.target.value = "";
    }
  });
  $("close-file").addEventListener("click", close);
  dialog.addEventListener("close", returnFocus);
  $("sound").addEventListener("click", () => {
    state.sound = !state.sound;
    save();
    updateRoom();
    clack();
  });
  $("large-text").addEventListener("click", () => {
    state.largeText = !state.largeText;
    save();
    updateRoom();
  });
  $("cancel-reset").addEventListener("click", () => $("reset-dialog").close());
  $("confirm-reset").addEventListener("click", () => {
    const sound = state.sound,
      large = state.largeText;
    state = rules.defaults();
    state.sound = sound;
    state.largeText = large;
    save();
    $("reset-dialog").close();
    selected = "E01";
    query = "";
    pinnedOnly = false;
    activeTask = "tickets";
    updateRoom();
    navigate("briefing");
    say("Case progress reset.");
  });
  updateRoom();
})();
