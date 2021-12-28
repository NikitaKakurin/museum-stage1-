"use strict"
const progressVideo = document.querySelector('.progress');
const volume = document.querySelector('.volume');
const pagination = document.querySelectorAll(".pagination-video");
const videoSlides = document.querySelectorAll(".video-slide");
const mainPlayContainer = document.querySelector(".main-play-container");
const mainPlayVideo = document.querySelector(".main-play");
const buttonRunPause = document.querySelector(".button-run-pause");
const buttonSound = document.querySelector(".button-sound");
const playVideo = document.querySelector(".button-run-pause span");
const video = document.querySelector(".mainVideo");
const volumeIcon = document.querySelector(".button-sound img");
const fullScreenButton = document.querySelector(".button-fullScreen");
const videoPlayer = document.querySelector(".video-player");
const containerVideo = document.querySelector(".container-player");
let videoNormalWidth = video.clientWidth;
let videoNormalHeight = video.clientHeight;

let lastVolume;

function handleChangeRange(elem, value){
   
    if(elem.classList.contains("progress")){
        rewindVideo(value);
        return;
    };

    if(elem.classList.contains("volume")){
        video.volume = value/100;
        changeProgressBackground(elem,value)
        changeVolumeIcon();
    };
};

function changeProgressBackground(elem,value){
    elem.style.background ='linear-gradient(to right, #710707 0%, #710707 '+
    value + '%, #C4C4C4 ' + value +'%, #C4C4C4 100%)';
}

function changeVolumeIcon(){
    if(video.volume === 0){
        volumeIcon.src = "./assets/svg/soundOff.png";

    }else{
        volumeIcon.src = "./assets/svg/soundOn.png";
    }
}

function toggleSound(event) {
    if(video.volume === 0){
        volume.value = lastVolume;
    }else{
        lastVolume = volume.value;
        volume.value = 0;
    }
    handleChangeRange(volume, volume.value);
}

function rewindVideo(value) {
    video.currentTime = (value * video.duration) / 100;
}

function changeProgressVideo(event){
    progressVideo.value = (video.currentTime/video.duration) * 100;
    changeProgressBackground(progressVideo,progressVideo.value);
};

function togglePlayVideo () {
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

function changeRunButtons(event) {
    if(video.paused){
        mainPlayVideo.hidden = false;
        playVideo.classList.remove("button-pause");
    }else{
        mainPlayVideo.hidden = true;
        playVideo.classList.add("button-pause");
    }
}

function processChangeRange(event){
    handleChangeRange(event.target,event.target.value);
}

function handleFullScreen(event) {
    toggleFullScreen();
}

function toggleFullScreen() {
    if(!document.fullscreenElement){
        containerVideo.requestFullscreen();
        videoBecomeFullScreen()
    }else{
        document.exitFullscreen();
    }
}


function videoBecomeFullScreen() {
    video.style.width = "100%";
    let videoFullscreenSize = video.clientHeight * (window.screen.width/video.clientWidth);
    debugger
    video.style.height =videoFullscreenSize +"px";
    videoPlayer.style.marginTop = (window.screen.height - videoFullscreenSize)/2 + "px";
    videoPlayer.style.width = "100%";
    videoPlayer.style.height = videoFullscreenSize +"px";
}

function videoBecomeNormal() {
    videoPlayer.style.width = "100%";
    videoPlayer.style.height = videoNormalHeight+"px";
    video.style.width = "100%";
    video.style.height = videoNormalHeight+"px";
    videoPlayer.style.marginTop =0;
}

function handleFullScreenchange(event) {
    if(!document.fullscreenElement){
        videoBecomeNormal()
    }
}
function handleKeyPressOnVideo(event) {
    if(event.key == "Enter"){
        toggleFullScreen();
    }
    if(event.key == " "){
        event.preventDefault();
        togglePlayVideo ();
    }
}

function handleMouseOverVideo(event) {
    if (!containerVideo.contains(event.target))return;
    document.addEventListener("keypress",handleKeyPressOnVideo)
}
function handleMouseOutVideo(event) {
    if (containerVideo.contains(event.relatedTarget))return;
    console.log("remove")
    document.removeEventListener("keypress",handleKeyPressOnVideo);
}

progressVideo.addEventListener('input', processChangeRange);
volume.addEventListener('input', processChangeRange);
mainPlayContainer.addEventListener("click",togglePlayVideo);
video.addEventListener("click",togglePlayVideo);
playVideo.addEventListener("click",togglePlayVideo);
video.addEventListener("play",changeRunButtons);
video.addEventListener("pause",changeRunButtons);
video.addEventListener("timeupdate",changeProgressVideo);
volumeIcon.addEventListener("click",toggleSound);
fullScreenButton.addEventListener("click", handleFullScreen);
containerVideo.addEventListener("fullscreenchange",handleFullScreenchange);
containerVideo.addEventListener("mouseover", handleMouseOverVideo);
containerVideo.addEventListener("mouseout", handleMouseOutVideo);


