const audio = document.getElementById("audio");

const playButton = document.getElementById("play");

const cover = document.getElementById("album-cover");

const progress = document.querySelector(".progress");

playButton.addEventListener(
"click",
()=>{

if(audio.paused){

audio.play();

playButton.innerHTML="❚❚";

cover.parentElement.classList.add("spin");

}

else{

audio.pause();
playButton.innerHTML="▶";
cover.parentElement.classList.remove("spin");

}

});

audio.addEventListener(
"timeupdate",
()=>{

let percent =
(audio.currentTime / audio.duration) * 100;

progress.style.width =
percent + "%";

});

document
.querySelector(".progress-container")
.addEventListener(
"click",
(e)=>{

let width =
e.currentTarget.clientWidth;

let click =
e.offsetX;

audio.currentTime =
(click / width) * audio.duration;

});