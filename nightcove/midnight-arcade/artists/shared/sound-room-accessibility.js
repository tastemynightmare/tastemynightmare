document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const playButton = document.getElementById("playButton");
  const rewindButton = document.getElementById("rewindButton");
  const forwardButton = document.getElementById("forwardButton");
  const progressBar = document.getElementById("progressBar");
  const audio = document.getElementById("audioPlayer");
  const audioStatus = document.getElementById("audioStatus");

  /* Add accessible descriptions without changing layout */
  if (progressBar) {
    progressBar.setAttribute("aria-label", "Song progress");
    progressBar.setAttribute("aria-valuemin", "0");
    progressBar.setAttribute("aria-valuemax", "100");
  }

  if (rewindButton) {
    rewindButton.setAttribute("aria-label", "Rewind 10 seconds");
  }

  if (forwardButton) {
    forwardButton.setAttribute("aria-label", "Forward 10 seconds");
  }

  if (playButton && !playButton.getAttribute("aria-label")) {
    playButton.setAttribute("aria-label", "Play");
  }

  if (audioStatus) {
    audioStatus.setAttribute("role", "status");
    audioStatus.setAttribute("aria-live", "polite");
    audioStatus.setAttribute("aria-atomic", "true");
  }

  /* Keep the progress value meaningful to screen readers */
  if (audio && progressBar) {
    const updateAriaValue = () => {
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
        progressBar.setAttribute("aria-valuenow", "0");
        progressBar.setAttribute("aria-valuetext", "0 minutes 0 seconds");
        return;
      }

      const percent = Math.round(
        (audio.currentTime / audio.duration) * 100
      );

      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60);

      progressBar.setAttribute("aria-valuenow", String(percent));
      progressBar.setAttribute(
        "aria-valuetext",
        `${minutes} minute${minutes === 1 ? "" : "s"} ${seconds} second${seconds === 1 ? "" : "s"}`
      );
    };

    audio.addEventListener("timeupdate", updateAriaValue);
    audio.addEventListener("loadedmetadata", updateAriaValue);
  }
});