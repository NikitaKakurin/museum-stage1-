const progress = document.querySelector('.progress');
const volume = document.querySelector('.volume');
const pagination = document.querySelectorAll(".pagination-video");
const videoSlides = document.querySelectorAll(".video-slide");
const mainPlayContainer = document.querySelector(".main-play-container");
const mainPlayVideo = document.querySelector(".main-play");
const buttonRunPause = document.querySelector(".button-run-pause");
const buttonSound = document.querySelector(".button-sound");
const playVideo = document.querySelector(".button-run-pause");
const video = document.querySelector(".mainVideo");

let isMainVideoPlaying = false;

progress.addEventListener('input', handleChangeRange);
volume.addEventListener('input', handleChangeRange);

function handleChangeRange(event){
    const value = this.value;
    this.style.background ='linear-gradient(to right, #710707 0%, #710707 '+
    value + '%, #C4C4C4 ' + value +'%, #C4C4C4 100%)';
    if(this.classList.contains("progress")){
        rewindVideo(value);
    };
    if(this.classList.contains("volume")){
        changeVolume(value);
    };
};

mainPlayContainer.addEventListener("click",togglePlayVideo)
video.addEventListener("click",togglePlayVideo);

function togglePlayVideo(event) {

    if(video.paused){
        video.play();
        mainPlayVideo.hidden = true;
    }else{
        video.pause();
        mainPlayVideo.hidden = false;
    }
    
}
