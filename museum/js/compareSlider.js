"use strict"
let leftSlideImage = document.querySelector('.right-slide-image');
let circleSlider = document.querySelector('.circle-explore');
let clicked = false;
let widthLeftSlideImage = leftSlideImage.offsetWidth;

circleSlider.addEventListener("mousedown", mouseDownHandler);
document.addEventListener("mouseup", mouseUpHandler);
slide(450)

function mouseUpHandler(event){
    clicked = false;
}

function mouseDownHandler(event){
    event.preventDefault()
    clicked = true;
    window.addEventListener("mousemove", changeCirclePosition)
}

function changeCirclePosition(event){
    if (clicked === false){
        return false;
    }

    let pos = getCursorPos(event);
    if(pos < 0) {pos=0;};
    if(pos>widthLeftSlideImage) {pos=widthLeftSlideImage;};
    slide(pos);
}

function slide(size){
    leftSlideImage.style.width = size+"px";
    circleSlider.style.left = size - 465 + (circleSlider.offsetWidth/2)+"px";
}

function getCursorPos(event){
    let a = leftSlideImage.getBoundingClientRect();
    let x = event.pageX - a.left;
    x = x - window.scrollX;
    return x;
}