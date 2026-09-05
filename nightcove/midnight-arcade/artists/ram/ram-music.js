const audio =
    document.getElementById(
        "audioPlayer"
    );


const playButton =
    document.getElementById(
        "playButton"
    );


const rewindButton =
    document.getElementById(
        "rewindButton"
    );


const forwardButton =
    document.getElementById(
        "forwardButton"
    );


const progressBar =
    document.getElementById(
        "progressBar"
    );


const currentTime =
    document.getElementById(
        "currentTime"
    );


const duration =
    document.getElementById(
        "duration"
    );


const equalizer =
    document.getElementById(
        "equalizer"
    );



playButton.addEventListener(
    "click",
    async () => {

        try {

            if (
                audio.paused
            ) {

                await audio.play();

            }

            else {

                audio.pause();

            }

        }

        catch (error) {

            console.error(
                "Audio could not play:",
                error
            );

            console.error(
                "Audio source:",
                audio.currentSrc
            );

        }

    }
);



audio.addEventListener(
    "play",
    () => {

        playButton.textContent =
            "❚❚";

        equalizer.classList.add(
            "playing"
        );

    }
);



audio.addEventListener(
    "pause",
    () => {

        playButton.textContent =
            "▶";

        equalizer.classList.remove(
            "playing"
        );

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

        if (!audio.duration) {
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

        if (
            !audio.duration
        ) {

            return;

        }


        progressBar.value =

            (
                audio.currentTime /
                audio.duration
            )

            * 100;


        currentTime.textContent =
            formatTime(
                audio.currentTime
            );

    }
);



audio.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(
                audio.duration
            );

    }
);



progressBar.addEventListener(
    "input",
    () => {

        if (
            !audio.duration
        ) {

            return;

        }


        audio.currentTime =

            (
                progressBar.value /
                100
            )

            * audio.duration;

    }
);



function formatTime(
    seconds
) {

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


    return (
        `${minutes}:${remainingSeconds}`
    );

}



audio.addEventListener(
    "canplay",
    () => {

        console.log(
            "RAM AUDIO READY:",
            audio.currentSrc
        );

    }
);



audio.addEventListener(
    "error",
    () => {

        console.error(
            "RAM AUDIO LOAD ERROR:",
            audio.error
        );

        console.error(
            "FAILED SOURCE:",
            audio.currentSrc
        );

    }
);