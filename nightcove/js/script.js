(() => {
  "use strict";

  initializeNavigation();
  initializeAudioPlayer();

  function initializeNavigation() {
    const navigation = document.querySelector(".navbar");
    const toggle = navigation?.querySelector(".nav-toggle");
    const links = navigation?.querySelector(".nav-links");

    if (!navigation || !toggle || !links) return;

    const mobileLayout = window.matchMedia("(max-width: 1199px)");
    navigation.classList.add("is-enhanced");
    toggle.hidden = false;

    function setMenuOpen(open, restoreFocus = false) {
      navigation.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute(
        "aria-label",
        open ? "Close navigation menu" : "Open navigation menu",
      );
      if (restoreFocus) toggle.focus();
    }

    toggle.addEventListener("click", () => {
      setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    links.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenuOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navigation.classList.contains("nav-open")) {
        setMenuOpen(false, true);
      }
    });

    document.addEventListener("click", (event) => {
      if (!navigation.contains(event.target)) setMenuOpen(false);
    });

    mobileLayout.addEventListener("change", () => setMenuOpen(false));
  }

  function initializeAudioPlayer() {
    const audio = document.getElementById("audio");
    if (!audio) return;

    const playButton = document.getElementById("play-btn");
    const restartButton = document.getElementById("previous-btn");
    const endButton = document.getElementById("next-btn");
    const seekBar = document.querySelector(".progress-bar");
    const progress = document.querySelector(".progress");
    const elapsed = document.getElementById("current-time");
    const duration = document.getElementById("duration");
    const volume = document.getElementById("volume-slider");
    const vinyl = document.querySelector(".vinyl-record");
    const status = document.getElementById("player-status");
    let playRequestPending = false;

    function hasDuration() {
      return Number.isFinite(audio.duration) && audio.duration > 0;
    }

    function showError(message = "") {
      if (!status) return;
      status.textContent = message;
      status.hidden = !message;
    }

    function updatePlaybackState() {
      const playing = !audio.paused && !audio.ended;
      if (playButton) {
        playButton.textContent = playing ? "⏸" : "▶";
        playButton.setAttribute(
          "aria-label",
          playing ? "Pause track" : "Play track",
        );
        playButton.setAttribute("aria-pressed", String(playing));
      }
      vinyl?.classList.toggle("spinning", playing);
    }

    function updateTimeline() {
      const ready = hasDuration();
      const current = Number.isFinite(audio.currentTime)
        ? audio.currentTime
        : 0;
      const percent = ready
        ? Math.min(100, Math.max(0, (current / audio.duration) * 100))
        : 0;

      if (progress) progress.style.width = `${percent}%`;
      if (elapsed) elapsed.textContent = formatTime(current);
      if (duration) duration.textContent = formatTime(audio.duration);
      if (restartButton) restartButton.disabled = !ready;
      if (endButton) endButton.disabled = !ready;

      if (seekBar) {
        seekBar.setAttribute("aria-disabled", String(!ready));
        seekBar.setAttribute("aria-valuenow", String(Math.round(percent)));
        seekBar.setAttribute(
          "aria-valuetext",
          `${formatTime(current)} of ${formatTime(audio.duration)}`,
        );
      }
    }

    function seekTo(seconds) {
      if (!hasDuration() || !Number.isFinite(seconds)) return;
      try {
        audio.currentTime = Math.min(audio.duration, Math.max(0, seconds));
        updateTimeline();
      } catch {
        showError(
          "This part of the track is not available to seek yet. Try again after it loads.",
        );
      }
    }

    async function togglePlayback() {
      if (playRequestPending) return;
      if (!audio.paused) {
        audio.pause();
        return;
      }

      showError();
      playRequestPending = true;
      playButton?.setAttribute("aria-busy", "true");

      try {
        await audio.play();
      } catch (error) {
        if (error.name !== "AbortError") {
          showError(
            "The track could not start. Please try again or check your connection.",
          );
        }
        updatePlaybackState();
      } finally {
        playRequestPending = false;
        playButton?.removeAttribute("aria-busy");
      }
    }

    playButton?.addEventListener("click", togglePlayback);
    restartButton?.addEventListener("click", () => seekTo(0));
    endButton?.addEventListener("click", () => seekTo(audio.duration));

    seekBar?.addEventListener("click", (event) => {
      const bounds = seekBar.getBoundingClientRect();
      if (!hasDuration() || bounds.width <= 0) return;
      const ratio = Math.min(
        1,
        Math.max(0, (event.clientX - bounds.left) / bounds.width),
      );
      seekTo(ratio * audio.duration);
    });

    seekBar?.addEventListener("keydown", (event) => {
      const targets = {
        ArrowLeft: audio.currentTime - 5,
        ArrowDown: audio.currentTime - 5,
        ArrowRight: audio.currentTime + 5,
        ArrowUp: audio.currentTime + 5,
        Home: 0,
        End: audio.duration,
      };
      if (!(event.key in targets)) return;
      event.preventDefault();
      seekTo(targets[event.key]);
    });

    function updateVolume() {
      if (volume) volume.value = String(Math.round(audio.volume * 100));
    }

    volume?.addEventListener("input", () => {
      const requested = Number(volume.value);
      if (!Number.isFinite(requested)) return;
      audio.volume = Math.min(1, Math.max(0, requested / 100));
      updateVolume();
    });

    audio.addEventListener("play", updatePlaybackState);
    audio.addEventListener("pause", updatePlaybackState);
    audio.addEventListener("timeupdate", updateTimeline);
    audio.addEventListener("loadedmetadata", updateTimeline);
    audio.addEventListener("durationchange", updateTimeline);
    audio.addEventListener("emptied", updateTimeline);
    audio.addEventListener("volumechange", updateVolume);
    audio.addEventListener("ended", () => {
      seekTo(0);
      updatePlaybackState();
    });
    audio.addEventListener("error", () => {
      vinyl?.classList.remove("spinning");
      if (playButton) {
        playButton.textContent = "▶";
        playButton.setAttribute("aria-label", "Play track");
        playButton.setAttribute("aria-pressed", "false");
      }
      showError(
        "The audio file could not load. Please check your connection or try again later.",
      );
    });

    updateTimeline();
    updateVolume();
    updatePlaybackState();
  }

  function formatTime(value) {
    const seconds = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
  }
})();
