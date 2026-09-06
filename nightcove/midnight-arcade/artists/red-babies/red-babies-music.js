document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const audio = document.getElementById("audioPlayer");
  const playButton = document.getElementById("playButton");
  const rewindButton = document.getElementById("rewindButton");
  const forwardButton = document.getElementById("forwardButton");
  const progressBar = document.getElementById("progressBar");
  const currentTime = document.getElementById("currentTime");
  const duration = document.getElementById("duration");
  const equalizer = document.getElementById("equalizer");
  const audioStatus = document.getElementById("audioStatus");

  const requiredElements = {
    audio,
    playButton,
    rewindButton,
    forwardButton,
    progressBar,
    currentTime,
    duration,
    equalizer,
    audioStatus
  };

  const missingElements = Object.entries(requiredElements)
    .filter(([, element]) => !element)
    .map(([name]) => name);

  if (missingElements.length > 0) {
    console.error(
      "RED BABIES SOUND ROOM: missing required elements:",
      missingElements.join(", ")
    );
    return;
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
  }

  function setPlayingState(isPlaying) {
    playButton.textContent = isPlaying ? "❚❚" : "▶";

    playButton.setAttribute(
      "aria-label",
      isPlaying ? "Pause" : "Play"
    );

    equalizer.classList.toggle("playing", isPlaying);
    document.body.classList.toggle("dead-air-playing", isPlaying);
  }

  function updateProgress() {
    currentTime.textContent = formatTime(audio.currentTime);

    if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
      progressBar.value = "0";
      return;
    }

    progressBar.value = String(
      (audio.currentTime / audio.duration) * 100
    );
  }

  playButton.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        audioStatus.textContent = "";
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (error) {
      console.error(
        "RED BABIES audio could not play:",
        error
      );

      console.error(
        "Audio source:",
        audio.currentSrc
      );

      audioStatus.textContent =
        "AUDIO FILE COULD NOT LOAD";
    }
  });

  rewindButton.addEventListener("click", () => {
    audio.currentTime = Math.max(
      0,
      audio.currentTime - 10
    );
  });

  forwardButton.addEventListener("click", () => {
    if (!Number.isFinite(audio.duration)) {
      return;
    }

    audio.currentTime = Math.min(
      audio.duration,
      audio.currentTime + 10
    );
  });

  progressBar.addEventListener("input", () => {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
      return;
    }

    audio.currentTime =
      (Number(progressBar.value) / 100) *
      audio.duration;
  });

  audio.addEventListener("play", () => {
    setPlayingState(true);
    audioStatus.textContent = "";
  });

  audio.addEventListener("pause", () => {
    setPlayingState(false);
  });

  audio.addEventListener("ended", () => {
    setPlayingState(false);

    audio.currentTime = 0;
    progressBar.value = "0";
    currentTime.textContent = "0:00";
  });

  audio.addEventListener("timeupdate", updateProgress);

  audio.addEventListener("loadedmetadata", () => {
    duration.textContent =
      formatTime(audio.duration);

    updateProgress();
  });

  audio.addEventListener("durationchange", () => {
    duration.textContent =
      formatTime(audio.duration);
  });

  audio.addEventListener("canplay", () => {
    console.log(
      "RED BABIES AUDIO READY:",
      audio.currentSrc
    );

    audioStatus.textContent = "";
  });

  audio.addEventListener("error", () => {
    console.error(
      "RED BABIES AUDIO LOAD ERROR:",
      audio.error
    );

    console.error(
      "FAILED SOURCE:",
      audio.currentSrc
    );

    audioStatus.textContent =
      "ADD THE MP3 TO THIS SOUND ROOM'S ASSETS FOLDER";
  });

  console.log("RED BABIES SOUND ROOM: ONLINE");
});