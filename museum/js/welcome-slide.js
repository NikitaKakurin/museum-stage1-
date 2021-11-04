let slidesContainer = document.querySelector(".slides-container");
let slides = document.querySelectorAll(".slide-welcome");
let pagination = document.querySelectorAll(".slide-pagination");
let prevSlide = document.querySelector(".prev-slide");
let nextSlide = document.querySelector(".next-slide");
let transitionEnd = true;
let numberOfInitialSlide = 0;
slides[numberOfInitialSlide].style.right ="0px";

//add class "checked" to slide and pagination
function addClassChecked(numberOfSlide){
    slides[numberOfSlide].classList.add("checked-slide");
    pagination[numberOfSlide].classList.add("checked");

}

function removeClassChecked(numberOfSlide){
    slides[numberOfSlide].classList.remove("checked-slide");
    pagination[numberOfSlide].classList.remove("checked");
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

function flipSlide(numberOfPortableSlide, beginPositionOfNextSlide, step){
    //if transition doesn't end return false
    if(transitionEnd==false){
        return false;
    }
    // if current slide is last, the next slide will be first
    let numberOfNextSlide;
    if(slides[numberOfInitialSlide+step]===undefined){
        numberOfNextSlide = numberOfPortableSlide;
    }else{
        numberOfNextSlide = numberOfInitialSlide+step;
    }

    let currentSlide = slides[numberOfInitialSlide];
    let nextSlide = slides[numberOfNextSlide];
    // remove transition from next slide 
    // shift slide to the right
    // return transition back 
    nextSlide.classList.add("no-transition");
    nextSlide.style.right = `${-beginPositionOfNextSlide}px`;
    //!important it will update property transition
    nextSlide.offsetHeight;
    nextSlide.classList.remove("no-transition");
    // add class checked-slide to next slide
    nextSlide.classList.add("checked-slide");
    currentSlide.classList.add("transition");
    nextSlide.classList.add("transition");
    // run slider    
    currentSlide.style.right = `${beginPositionOfNextSlide}px`;
    nextSlide.style.right = "0px"
    transitionEnd = false;
        //handle transitionEnd
    currentSlide.addEventListener("transitionend",function transition(){
      transitionEnd = true;
      // remove checked-slide from current slide and current pagination
      //currentSlide.classList.remove("checked-slide");
      removeClassChecked(numberOfInitialSlide);
      pagination[numberOfNextSlide].classList.add("checked");
        //remove event transitionEnd
      currentSlide.removeEventListener("transitionend", transition)
      numberOfInitialSlide = numberOfNextSlide;
     })
}

function handleNextSlide(event){
    flipSlide(numberOfPortableSlide = 0, 
        beginPositionOfNextSlide = 1000, step = 1)
}
function handlePreviousSlide(event){
    flipSlide(numberOfPortableSlide = slides.length-1, 
        beginPositionOfNextSlide = -1000, step = -1)
}

//initial slide selection
addClassChecked(numberOfInitialSlide);

prevSlide.addEventListener("click", handlePreviousSlide);
nextSlide.addEventListener("click", handleNextSlide);






