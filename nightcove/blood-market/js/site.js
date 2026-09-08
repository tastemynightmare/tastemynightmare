document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const soundToggle = document.getElementById("soundToggle");
const ambientAudio = document.getElementById("ambientAudio");

if (soundToggle && ambientAudio) {
  let soundOn = false;

  soundToggle.addEventListener("click", async () => {
    soundOn = !soundOn;

    if (soundOn) {
      try {
        await ambientAudio.play();
        soundToggle.textContent = "SOUND: ON";
      } catch {
        soundOn = false;
        soundToggle.textContent = "SOUND: OFF";
      }
    } else {
      ambientAudio.pause();
      soundToggle.textContent = "SOUND: OFF";
    }
  });
}