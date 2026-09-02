/* =====================================================
   MUSIC PLAYER
===================================================== */

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");

const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");

const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

const volumeSlider = document.getElementById("volume-slider");

const albumCover = document.getElementById("album-cover");
const vinylRecord = document.querySelector(".vinyl-record");


/* =====================================================
   PLAY / PAUSE
===================================================== */

playBtn.addEventListener("click", function () {

    if (audio.paused) {

        audio.play();

        playBtn.textContent = "⏸";

    } else {

        audio.pause();

        playBtn.textContent = "▶";

    }

});


/* =====================================================
   VINYL ROTATION
===================================================== */

audio.addEventListener("play", function () {

    albumCover.classList.add("spin");

});


audio.addEventListener("pause", function () {

    albumCover.classList.remove("spin");

});


/* =====================================================
   UPDATE PROGRESS
===================================================== */

audio.addEventListener("timeupdate", function () {

    if (!audio.duration) return;

    const percent =
        (audio.currentTime / audio.duration) * 100;

    progress.style.width = percent + "%";

    currentTimeDisplay.textContent =
        formatTime(audio.currentTime);

});


/* =====================================================
   LOAD DURATION
===================================================== */

audio.addEventListener("loadedmetadata", function () {

    durationDisplay.textContent =
        formatTime(audio.duration);

});


/* =====================================================
   PROGRESS BAR CLICK
===================================================== */

progressBar.addEventListener("click", function (event) {

    const width = progressBar.clientWidth;

    const clickPosition = event.offsetX;

    const duration = audio.duration;

    audio.currentTime =
        (clickPosition / width) * duration;

});


/* =====================================================
   VOLUME
===================================================== */

volumeSlider.addEventListener("input", function () {

    audio.volume =
        volumeSlider.value / 100;

});


/* =====================================================
   SONG ENDED
===================================================== */

audio.addEventListener("ended", function () {

    playBtn.textContent = "▶";

    progress.style.width = "0%";

    currentTimeDisplay.textContent = "0:00";

    albumCover.classList.remove("spin");

});


/* =====================================================
   TIME FORMAT
===================================================== */

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        remainingSeconds.toString().padStart(2, "0")
    );

}


/* =====================================================
   PREVIOUS / NEXT
===================================================== */

previousBtn.addEventListener("click", function () {

    audio.currentTime = 0;

});


nextBtn.addEventListener("click", function () {

    audio.currentTime = audio.duration;

});