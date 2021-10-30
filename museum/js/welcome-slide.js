let slides = document.querySelectorAll(".slide-welcome");
let pagination = document.querySelectorAll(".slide-pagination");
let prevSlide = document.querySelector(".prev-slide");
let nextSlide =document.querySelector(".next-slide");

let numberOfInitialSlide = 0;

//add class "checked" to slide and pagination
function addClassChecked(numberOfSlide){
    slides[numberOfSlide].classList.add("checked-slide");
    pagination[numberOfSlide].classList.add("checked");
    numberOfInitialSlide = numberOfSlide;
}

function removeClassChecked(numberOfSlide){
    slides[numberOfSlide].classList.remove("checked-slide");
    pagination[numberOfSlide].classList.remove("checked");
    numberOfInitialSlide = numberOfSlide;
}

function flipBack(){
    console.log("work back");
    let numberOfPrevSlide;
    if(numberOfInitialSlide <= 0){
        numberOfPrevSlide = slides.length - 1; 
    }else{
        numberOfPrevSlide = numberOfInitialSlide-1;
    }
    slides[numberOfPrevSlide].style.display = "block";
    slides[numberOfPrevSlide].style.width = "1000px";
    slides[numberOfInitialSlide].style.width = 0;
    numberOfInitialSlide = numberOfPrevSlide
}

function flipForward(){
    console.log("work next")
    let numberOfNextSlide;
    if(numberOfInitialSlide >= slides.length -1){
        numberOfNextSlide = 0; 
    }else{
        numberOfNextSlide = numberOfInitialSlide+1;
    }
    slides[numberOfNextSlide].style.display = "block";
    slides[numberOfNextSlide].style.width = "1000px";
    slides[numberOfInitialSlide].style.width = 0;
    numberOfInitialSlide = numberOfNextSlide
}

//initial slide selection
addClassChecked(numberOfInitialSlide);

prevSlide.addEventListener("click", flipBack);
nextSlide.addEventListener("click", flipForward);






