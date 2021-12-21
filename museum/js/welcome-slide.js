let containerWelcome = document.querySelector(".container-welcome");
let slidesContainer = document.querySelector(".slides-container");
let slides = document.querySelectorAll(".slide-welcome");
let paginationWelcomeSlide = document.querySelectorAll(".slide-pagination");
let prevSlide = document.querySelector(".prev-slide");
let nextSlide = document.querySelector(".next-slide");
let numberOfSlide = document.querySelector(".current-slide")
let touchScreen = document.querySelector(".touchScreen-slide")
let transitionEnd = true;
let numberOfInitialSlide = 0;
slides[numberOfInitialSlide].style.right ="0px";
let startSwipe;
let finishSwipe;
let swipeIsStart = false;

//add class "checked" to slide and pagination
function addClassChecked(numberOfSlide){
    slides[numberOfSlide].classList.add("checked-slide");
    paginationWelcomeSlide[numberOfSlide].classList.add("checked");

}
//remove class "checked" to slide and pagination
function removeClassChecked(numberOfSlide){
    slides[numberOfSlide].classList.remove("checked-slide");
    paginationWelcomeSlide[numberOfSlide].classList.remove("checked");
}
//choose the portable slide
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
    moveSlide(numberOfNextSlide,beginPositionOfNextSlide)
}
//flip slides
function moveSlide(numNextSlide, beginPositionOfNextSlide){
    let currentSlide = slides[numberOfInitialSlide];
    let nextSlide = slides[numNextSlide];
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
      // remove checked-slide from current slide and current paginationWelcomeSlide
      //currentSlide.classList.remove("checked-slide");
      removeClassChecked(numberOfInitialSlide);
      paginationWelcomeSlide[numNextSlide].classList.add("checked");
      numberOfSlide.innerHTML =`0${+numNextSlide+1} | 05`;
        //remove event transitionEnd
      currentSlide.removeEventListener("transitionend", transition)
      numberOfInitialSlide = numNextSlide;
     })
}
// handler click on the Next slide
function handleNextSlide(event){
    if(numberOfInitialSlide==0){
        flipSlide(numberOfPortableSlide = 1, 
            beginPositionOfNextSlide = 1000, step = 1)
    }else{
        flipSlide(numberOfPortableSlide = 0, 
            beginPositionOfNextSlide = 1000, step = 1)
    }
}
// handler click on the Previous slide
function handlePreviousSlide(event){
    if(numberOfInitialSlide==slides.length-1){
        flipSlide(numberOfPortableSlide = slides.length-2, 
            beginPositionOfNextSlide = -1000, step = -1)
    }else{
        flipSlide(numberOfPortableSlide = slides.length-1, 
            beginPositionOfNextSlide = -1000, step = -1)
    }
}

//initial slide selection
addClassChecked(numberOfInitialSlide);
//handle click on the arrows
prevSlide.addEventListener("click", handlePreviousSlide);
nextSlide.addEventListener("click", handleNextSlide);
//handle click on the paginationWelcomeSlide
paginationWelcomeSlide.forEach((elem,index)=>{
    elem.addEventListener("click", (event)=>{
        let numberOfPagination = event.target.getAttribute('data-number');
        if(numberOfPagination>numberOfInitialSlide){
            moveSlide(numberOfPagination, 1000)
        }
        if(numberOfPagination<numberOfInitialSlide){
            moveSlide(numberOfPagination, -1000)
        }
    })
})

//handle swipe on slide
touchScreen.addEventListener("mousedown", (event)=>{
    startSwipe = event.clientX;
    swipeIsStart=true;
});

containerWelcome.addEventListener("mouseup", (event)=>{
    if(!swipeIsStart){
        return false;
    }
    finishSwipe = event.clientX;
    if(startSwipe>finishSwipe+20){
        handleNextSlide();
    };
    if(startSwipe<finishSwipe-20){
        handlePreviousSlide();
    };
    swipeIsStart = false;
});

//swipe done
function IsVisible(elem){
    let rect =elem.getBoundingClientRect();
    let top = rect.top;
    let bottom =rect.bottom;
    return (top>=0) && (bottom<window.innerHeight);
}

document.addEventListener("keydown",function(event){
    if(!IsVisible(touchScreen)){
       return false;
    }
    event.preventDefault();
    if(event.keyCode==37){
        handlePreviousSlide();
    };
    if(event.keyCode==39){
        handleNextSlide();
    };
});





