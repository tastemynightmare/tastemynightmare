(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const content = window.SHADOW_CONTENT;
  const tracks = content.tracks;
  const audio = $("#audio");
  let currentTrack = 0,
    currentFilm = 0,
    currentAsset = 0,
    toastTimer;
  function toast(text) {
    $("#toast").textContent = text;
    $("#toast").classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(
      () => $("#toast").classList.remove("visible"),
      4500,
    );
  }
  async function copy(text, fallback) {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard.");
    } catch (_) {
      const input = document.createElement("textarea");
      input.value = text;
      input.style.cssText = "position:fixed;top:0;left:0;opacity:0";
      document.body.append(input);
      input.select();
      let success = false;
      try {
        success = document.execCommand("copy");
      } catch (_) {
        /* Browser denied clipboard. */
      }
      input.remove();
      if (success) toast("Copied to clipboard.");
      else {
        if (fallback) {
          fallback.focus();
          fallback.select();
        }
        toast("Clipboard unavailable. Select the text or use the download.");
      }
    }
  }
  tracks.forEach((track, index) => {
    const button = document.createElement("button");
    button.className = "track" + (index === 0 ? " active" : "");
    button.type = "button";
    button.dataset.track = index;
    button.setAttribute("aria-pressed", String(index === 0));
    button.setAttribute("aria-label", `Load ${track.title}, ${track.kind}`);
    const number = document.createElement("span");
    number.className = "track-number";
    number.textContent = String(index + 1).padStart(2, "0");
    const image = document.createElement("img");
    image.src = track.cover;
    image.alt = "";
    image.loading = "lazy";
    const text = document.createElement("span");
    text.className = "track-copy";
    const title = document.createElement("strong");
    title.textContent = track.title;
    const kind = document.createElement("small");
    kind.textContent = track.kind + " / Explicit";
    text.append(title, kind);
    const symbol = document.createElement("span");
    symbol.className = "track-symbol";
    symbol.textContent = "↗";
    symbol.setAttribute("aria-hidden", "true");
    button.append(number, image, text, symbol);
    button.addEventListener("click", () => selectTrack(index));
    $("#tracks").append(button);
  });
  function setPlayUI(playing) {
    document.body.classList.toggle("playing", playing);
    $("#play").textContent = playing ? "Ⅱ" : "▶";
    $("#play").setAttribute(
      "aria-label",
      `${playing ? "Pause" : "Play"} ${tracks[currentTrack]?.title || "After the Club"}`,
    );
    $("#mini-play").textContent = playing ? "Ⅱ" : "▶";
    $("#mini-play").setAttribute(
      "aria-label",
      playing ? "Pause playback" : "Resume playback",
    );
  }
  function selectTrack(index) {
    const track = tracks[index];
    if (!track) return;
    audio.pause();
    currentTrack = index;
    audio.src = track.src;
    audio.load();
    setPlayUI(false);
    $("#now-playing").hidden = true;
    $("#record-cover").src = track.cover;
    $("#record-cover").alt = track.title + " release artwork";
    $("#record-title").textContent = track.title;
    $("#record-credit").textContent = track.credit;
    $("#record-kind").textContent = track.kind.toUpperCase() + " / EXPLICIT";
    $("#record-description").textContent = track.description;
    $("#record-link").href = track.link;
    $("#audio-status").textContent =
      track.kind === "Full track"
        ? "Full track selected. Press play to listen."
        : "Apple Music excerpt selected. Press play to preview.";
    $("#mini-cover").src = track.cover;
    $("#mini-title").textContent = track.title;
    $$(".track").forEach((button, i) => {
      button.classList.toggle("active", i === index);
      button.setAttribute("aria-pressed", String(i === index));
    });
  }
  async function toggleAudio() {
    if (!audio.paused) {
      audio.pause();
      return;
    }
    $("#play").disabled = true;
    $("#audio-status").textContent = "Loading audio…";
    try {
      await audio.play();
    } catch (_) {
      setPlayUI(false);
      $("#audio-status").textContent =
        "Audio could not start. Try the native controls or open the streaming link.";
    } finally {
      $("#play").disabled = false;
    }
  }
  $("#play").addEventListener("click", toggleAudio);
  $("#mini-play").addEventListener("click", toggleAudio);
  audio.addEventListener("play", () => {
    if ($("#screen iframe")) selectFilm(currentFilm);
    setPlayUI(true);
    $("#now-playing").hidden = false;
    $("#audio-status").textContent =
      tracks[currentTrack]?.kind === "Full track"
        ? "Now playing the full track."
        : "Now playing an Apple Music preview.";
  });
  audio.addEventListener("pause", () => {
    setPlayUI(false);
    $("#audio-status").textContent = "Playback paused.";
  });
  audio.addEventListener("ended", () => {
    setPlayUI(false);
    $("#now-playing").hidden = true;
    $("#audio-status").textContent =
      "Finished. Choose another record or listen on streaming.";
  });
  audio.addEventListener("error", () => {
    setPlayUI(false);
    $("#now-playing").hidden = true;
    $("#audio-status").textContent =
      "Audio is unavailable here. Use the Apple Music or Spotify link.";
  });
  const films = content.films;
  function selectFilm(index) {
    currentFilm = index;
    const film = films[index];
    const image = document.createElement("img");
    image.src = film.image;
    image.alt = film.label + " poster artwork";
    const button = document.createElement("button");
    button.id = "screen-play";
    button.className = "screen-play";
    button.setAttribute("aria-label", "Play " + film.label);
    button.innerHTML =
      '<span aria-hidden="true">▶</span><span>ROLL THE FILM</span>';
    button.addEventListener("click", rollFilm);
    $("#screen").replaceChildren(image, button);
    $("#screen-title").textContent = film.title;
    $("#youtube-link").href = "https://www.youtube.com/watch?v=" + film.id;
    $$(".film").forEach((b, i) => {
      b.classList.toggle("active", i === index);
      b.setAttribute("aria-pressed", String(i === index));
    });
  }
  function rollFilm() {
    audio.pause();
    const film = films[currentFilm];
    const frame = document.createElement("iframe");
    frame.src = `https://www.youtube-nocookie.com/embed/${film.id}?autoplay=1&rel=0`;
    frame.title = film.label;
    frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    frame.allowFullscreen = true;
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    $("#screen").replaceChildren(frame);
    frame.focus();
  }
  $("#screen-play").addEventListener("click", rollFilm);
  $$(".film").forEach((b) =>
    b.addEventListener("click", () => selectFilm(Number(b.dataset.film))),
  );
  const personas = content.personas;
  function selectPersona(key, moveFocus = false) {
    const persona = personas[key];
    const panel = $(".persona-panel");
    panel.style.setProperty("--accent", persona.accent);
    $("#persona-label").textContent = persona.label;
    $("#persona-name").textContent = persona.name;
    $("#persona-copy").textContent = persona.copy;
    $(".persona-sigil").textContent = persona.sigil;
    $("#persona-tags").replaceChildren(
      ...persona.tags.map((tag) => {
        const s = document.createElement("span");
        s.textContent = tag;
        return s;
      }),
    );
    $("#persona").setAttribute("aria-labelledby", "tab-" + key);
    $$("[data-persona]").forEach((b) => {
      const active = b.dataset.persona === key;
      b.setAttribute("aria-selected", String(active));
      b.tabIndex = active ? 0 : -1;
      if (active && moveFocus) b.focus();
    });
  }
  $$("[data-persona]").forEach((b, i, tabs) => {
    b.addEventListener("click", () => selectPersona(b.dataset.persona));
    b.addEventListener("keydown", (event) => {
      const offsets = { ArrowRight: 1, ArrowLeft: -1 };
      if (event.key in offsets) {
        event.preventDefault();
        selectPersona(
          tabs[(i + offsets[event.key] + tabs.length) % tabs.length].dataset
            .persona,
          true,
        );
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        selectPersona(
          tabs[event.key === "Home" ? 0 : tabs.length - 1].dataset.persona,
          true,
        );
      }
    });
  });
  const shortBio = content.bio.short;
  $("#copy-bio").addEventListener("click", () => copy(shortBio));
  $("#copy-email").addEventListener("click", () => copy(content.contactEmail));
  const assets = content.assets;
  $$("[data-filter]").forEach((button) =>
    button.addEventListener("click", () => {
      $$("[data-filter]").forEach((b) =>
        b.setAttribute("aria-pressed", String(b === button)),
      );
      let count = 0;
      $$(".asset").forEach((asset) => {
        asset.hidden =
          button.dataset.filter !== "all" &&
          asset.dataset.category !== button.dataset.filter;
        if (!asset.hidden) count++;
      });
      $("#asset-count").textContent =
        count + " ORIGINAL ASSET" + (count === 1 ? "" : "S");
    }),
  );
  const dialog = $("#asset-dialog");
  function updateAsset(index) {
    currentAsset = (index + assets.length) % assets.length;
    const asset = assets[currentAsset];
    $("#dialog-title").textContent = asset.title;
    $("#dialog-image").src = asset.src;
    $("#dialog-image").alt = asset.title;
    $("#dialog-download").href = asset.src;
    $("#dialog-download").download = asset.filename;
    $("#dialog-position").textContent =
      String(currentAsset + 1).padStart(2, "0") +
      " / " +
      String(assets.length).padStart(2, "0");
  }
  $$("[data-asset]").forEach((button) =>
    button.addEventListener("click", () => {
      updateAsset(Number(button.dataset.asset));
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
        document.body.classList.add("modal-open");
        $("#dialog-close").focus();
      } else {
        window.open(assets[currentAsset].src, "_blank", "noopener");
      }
    }),
  );
  $("#dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () =>
    document.body.classList.remove("modal-open"),
  );
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom
      )
        dialog.close();
    }
  });
  $("#asset-prev").addEventListener("click", () =>
    updateAsset(currentAsset - 1),
  );
  $("#asset-next").addEventListener("click", () =>
    updateAsset(currentAsset + 1),
  );
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      updateAsset(currentAsset + (event.key === "ArrowLeft" ? -1 : 1));
    }
  });
  $("#lights").addEventListener("click", () => {
    const lit = document.body.classList.toggle("house-lights");
    $("#lights").setAttribute("aria-pressed", String(lit));
    $("#lights span").textContent = lit ? "Dim the lights" : "House lights";
  });
  $("#inquiry").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const value = (key) => String(data.get(key) || "").trim();
    const subject = `${value("type")} inquiry — ${value("organization") || value("name")}`;
    const body = `Hi ${content.artist.name},\n\n${value("message")}\n\nName: ${value("name")}\nEmail: ${value("email")}\nOrganization / project: ${value("organization") || "Not specified"}\nInquiry: ${value("type")}\nEvent date: ${value("date") || "To be discussed"}\n\nSent via Shadow Stage / Taste My Nightmare`;
    $("#draft-text").value =
      `To: ${content.contactEmail}\nSubject: ${subject}\n\n${body}`;
    $("#draft-mailto").href =
      "mailto:" +
      content.contactEmail +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
    $("#email-draft").hidden = false;
    $("#draft-text").focus();
    toast("Inquiry prepared. Review it, then send from your email app.");
  });
  $("#copy-draft").addEventListener("click", () =>
    copy($("#draft-text").value, $("#draft-text")),
  );
  selectTrack(0);
  selectFilm(0);
  selectPersona(Object.keys(personas)[0]);
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            $$(".stage-nav a").forEach((a) => {
              if (a.hash === "#" + entry.target.id)
                a.setAttribute("aria-current", "location");
              else a.removeAttribute("aria-current");
            });
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    $$("main>section[id]").forEach((section) => observer.observe(section));
  }
})();
