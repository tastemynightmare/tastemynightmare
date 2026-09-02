const audio = document.getElementById("audio");

if (audio) {

    const playBtn = document.getElementById("play-btn");
    const previousBtn = document.getElementById("previous-btn");
    const nextBtn = document.getElementById("next-btn");

    const progressBar = document.querySelector(".progress-bar");
    const progress = document.querySelector(".progress");

    const currentTimeDisplay =
        document.getElementById("current-time");

    const durationDisplay =
        document.getElementById("duration");

    const volumeSlider =
        document.getElementById("volume-slider");

    const vinylRecord =
        document.querySelector(".vinyl-record");


    playBtn.addEventListener("click", function () {

        if (audio.paused) {

            audio.play();

            playBtn.textContent = "⏸";

        } else {

            audio.pause();

            playBtn.textContent = "▶";

        }

    });


    audio.addEventListener("play", function () {

        vinylRecord.classList.add("spinning");

    });


    audio.addEventListener("pause", function () {

        vinylRecord.classList.remove("spinning");

    });


    audio.addEventListener("timeupdate", function () {

        if (!audio.duration) return;

        const percent =
            (audio.currentTime / audio.duration) * 100;

        progress.style.width = percent + "%";

        currentTimeDisplay.textContent =
            formatTime(audio.currentTime);

    });


    audio.addEventListener("loadedmetadata", function () {

        durationDisplay.textContent =
            formatTime(audio.duration);

    });


    progressBar.addEventListener("click", function (event) {

        if (!audio.duration) return;

        const width = progressBar.clientWidth;

        const clickPosition = event.offsetX;

        audio.currentTime =
            (clickPosition / width) * audio.duration;

    });


    volumeSlider.addEventListener("input", function () {

        audio.volume =
            volumeSlider.value / 100;

    });


    audio.addEventListener("ended", function () {

        playBtn.textContent = "▶";

        progress.style.width = "0%";

        currentTimeDisplay.textContent = "0:00";

        vinylRecord.classList.remove("spinning");

    });


    previousBtn.addEventListener("click", function () {

        audio.currentTime = 0;

    });


    nextBtn.addEventListener("click", function () {

        audio.currentTime = audio.duration;

    });


    function formatTime(seconds) {

        if (isNaN(seconds)) {
            return "0:00";
        }

        const minutes =
            Math.floor(seconds / 60);

        const remainingSeconds =
            Math.floor(seconds % 60);

        return (
            minutes +
            ":" +
            remainingSeconds
                .toString()
                .padStart(2, "0")
        );

    }

}