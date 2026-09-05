const audio =
    document.getElementById("audioPlayer");

const playButton =
    document.getElementById("playButton");

const rewindButton =
    document.getElementById("rewindButton");

const forwardButton =
    document.getElementById("forwardButton");

const progressBar =
    document.getElementById("progressBar");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const equalizer =
    document.getElementById("equalizer");

const audioStatus =
    document.getElementById("audioStatus");


playButton.addEventListener(
    "click",
    async () => {

        try {

            if (audio.paused) {
                await audio.play();
            }

            else {
                audio.pause();
            }

        }

        catch (error) {

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

    }
);


audio.addEventListener(
    "play",
    () => {

        playButton.textContent =
            "❚❚";

        playButton.setAttribute(
            "aria-label",
            "Pause"
        );

        equalizer.classList.add(
            "playing"
        );

        audioStatus.textContent =
            "";

    }
);


audio.addEventListener(
    "pause",
    () => {

        playButton.textContent =
            "▶";

        playButton.setAttribute(
            "aria-label",
            "Play"
        );

        equalizer.classList.remove(
            "playing"
        );

    }
);


audio.addEventListener(
    "ended",
    () => {

        playButton.textContent =
            "▶";

        playButton.setAttribute(
            "aria-label",
            "Play"
        );

        equalizer.classList.remove(
            "playing"
        );

        progressBar.value =
            0;

    }
);


rewindButton.addEventListener(
    "click",
    () => {

        audio.currentTime =
            Math.max(
                0,
                audio.currentTime - 10
            );

    }
);


forwardButton.addEventListener(
    "click",
    () => {

        if (!Number.isFinite(audio.duration)) {
            return;
        }

        audio.currentTime =
            Math.min(
                audio.duration,
                audio.currentTime + 10
            );

    }
);


audio.addEventListener(
    "timeupdate",
    () => {

        if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
            return;
        }

        progressBar.value =
            (
                audio.currentTime /
                audio.duration
            ) * 100;

        currentTime.textContent =
            formatTime(
                audio.currentTime
            );

    }
);


audio.addEventListener(
    "loadedmetadata",
    () => {

        if (Number.isFinite(audio.duration)) {

            duration.textContent =
                formatTime(
                    audio.duration
                );

        }

    }
);


progressBar.addEventListener(
    "input",
    () => {

        if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
            return;
        }

        audio.currentTime =
            (
                progressBar.value /
                100
            ) * audio.duration;

    }
);


function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(
            seconds / 60
        );

    const remainingSeconds =
        Math.floor(
            seconds % 60
        )
        .toString()
        .padStart(
            2,
            "0"
        );

    return `${minutes}:${remainingSeconds}`;

}


audio.addEventListener(
    "canplay",
    () => {

        console.log(
            "RED BABIES AUDIO READY:",
            audio.currentSrc
        );

        audioStatus.textContent =
            "";

    }
);


audio.addEventListener(
    "error",
    () => {

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

    }
);