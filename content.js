let button = document.createElement("button");
let SMILE = false;
let mouseX = 0;
let mouseY = 0;
let offsetX = 0;
let offsetY = 0;
button.addEventListener("mousedown", startDrag);
button.addEventListener("mousemove", doDrag);
button.addEventListener("mouseup", stopDrag);

button.textContent = "):";
button.style.position = "fixed";
button.style.bottom = "520px";
button.style.right = "350px";
button.style.color = "red";
button.style.background = "black";
button.style.width = "40px";
button.style.height = "40px";
button.style.fontSize = "30px"

document.body.appendChild(button);

button.addEventListener("click", function() { 
    if(SMILE){
        button.style.color = "darkgreen"
        button.textContent = "(:";
        SMILE = false;
        chrome.runtime.sendMessage("toggle");
        alert("ad off")
    }
    else {
        button.style.color = "red";
        button.textContent = "):";
        SMILE = true;
        chrome.runtime.sendMessage("toggle");
        alert("ad on")
        }
    });
// a function to continue dragging the button
function doDrag(event) {
    // check if the left mouse button is pressed
    if (event.buttons === 1) {
    // check if the button has the dragging class
    if (button.classList.contains("dragging")) {
    // get the current mouse coordinates
    mouseX = event.clientX;
    mouseY = event.clientY;
    // calculate the new button coordinates based on the mouse coordinates and offset
    let newRight = mouseX - offsetX;
    let newBottom = mouseY - offsetY;
    // set the style properties for left and top of the button
    button.style.right = newRight + "px";
    button.style.bottom = newBottom + "px";
    }
    }
    }
function startDrag(event) {
        // get the current mouse coordinates
        mouseX = event.clientX;
        mouseY = event.clientY;
        // get the current button offset from the mouse
        offsetX = mouseX - parseInt(button.style.right);
        offsetY = mouseY - parseInt(button.style.bottom);
        // add the dragging class to the button
        button.classList.add("dragging");
        }  
// a function to stop dragging the button
function stopDrag(event) {
// remove the dragging class from the button
button.classList.remove("dragging");
// reset the mouse coordinates and offset
mouseX = 0;
mouseY = 0;
offsetX = 0;
offsetY = 0;
}

        