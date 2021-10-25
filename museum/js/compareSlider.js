let leftSlideImage = document.querySelector('.right-slide-image');
let circleSlider = document.querySelector('.circle-explore');
let clicked = false;
let widthLeftSlideImage = leftSlideImage.offsetWidth;
console.log(leftSlideImage.offsetWidth)
console.log("W - " + widthLeftSlideImage);
circleSlider.addEventListener("mousedown", mouseDownHandler);
document.addEventListener("mouseup", mouseUpHandler);
slide(450)

function mouseUpHandler(event){
    console.log("mouseUP")
    clicked = false;
}

function mouseDownHandler(event){
    console.log("click on" + event.target)
    event.preventDefault()
    clicked = true;
    window.addEventListener("mousemove", changeCirclePosition)
}

function changeCirclePosition(event){
    if (clicked === false){
        return false;
    }
    //console.log("mouse move" + event.target)
    let pos = getCursorPos(event);
    console.log("pos-" + pos)
    if(pos < 0) {pos=0;};
    if(pos>widthLeftSlideImage) {pos=widthLeftSlideImage;};
    console.log("W - " + widthLeftSlideImage);
    slide(pos);
}

function slide(size){
    console.log("size -" + size);
    leftSlideImage.style.width = size+"px";
    circleSlider.style.left = size - 465 + (circleSlider.offsetWidth/2)+"px";
}

function getCursorPos(event){
    let a = leftSlideImage.getBoundingClientRect();
    let x = event.pageX - a.left;
    x = x - window.scrollX;
    return x;
}