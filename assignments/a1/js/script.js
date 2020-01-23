"use strict";

/********************************************************************

Pixel painter
Pippin Barr

A small DOM-based program for "painting" on div-based pixels.

*********************************************************************/

// Constants
const NUM_PIXELS = 1000;
const PIXEL_REVERT_DELAY = 1000;
const DEFAULT_COLOR = 'black';
const PAINT_COLOR = 'white';

// global variables
let rotation = 0;
let currentKey = "";

// Set up our starting function for when the page loads
window.onload = setup;

// setup
//
// Adds DIVs to the page along with event listeners that will allow
// then to change color on mouseover.
function setup() {
  // A loop that runs once per pixel we need
  for (let i = 0; i < NUM_PIXELS; i++) {
    // Create a DIV and store it in a variable
    let pixel = document.createElement('div');
    // Add the 'pixel' class to the new element
    pixel.setAttribute('class', 'pixel');
    // Add a mouseover handler to the new element
    pixel.addEventListener('mouseover', paint);
    // Add a click handler
    pixel.addEventListener('click', remove);
    // Add the element to the body of the page
    document.body.appendChild(pixel);
    // Add a keydown handler for the document
    document.addEventListener('keydown', rotate)
    // Add another keydown handler for the document
    document.addEventListener('keydown', typed)
    // Add a mouseover handler to the new element
    pixel.addEventListener('mouseover', addText);
  }
}

// addText

function addText(e) {
  let pixel = e.target;
  pixel.innerHTML = String.fromCharCode(currentKey);
  pixel.style.textAlign = "center";
  pixel.style.fontSize = "x-large";
  pixel.style.fontWeight = "bolder";
}

// typed

function typed(e) {
  currentKey = e.keyCode;
}
// rotate

function rotate(e) {
  if (e.keyCode === 37) {
    console.log("left");
    rotation--;
    let pixels = document.getElementsByClassName('pixel');
    for (let i = 0; i<1000; i++){
      pixels[i].style.transform = `rotate(${rotation}deg)`;
    }
  }
  else if (e.keyCode === 39) {
    console.log("right");
    rotation++;
    let pixels = document.getElementsByClassName('pixel');
    for (let i = 0; i<1000; i++){
      pixels[i].style.transform = `rotate(${rotation}deg)`;
    }
  }
}

// remove

function remove(e) {
  let pixel = e.target;
  pixel.style.opacity = 0;
}

// paint
//
// Called by the mouseover event handler on each pixel. Changes
// the pixel's color and sets a timer for it to revert
function paint(e) {
  // e.target contains the specific element moused over so let's
  // save that into a variable for clarity.
  let pixel = e.target;
  // Change the background color of the element to a random color
  let r = Math.random()*255;
  let g = Math.random()*255;
  let b = Math.random()*255;
  pixel.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  // Set a timeout to call the reset function after a delay
  // When we pass additional parameters (like 'pixel' below) they
  // are passed to the callback function (resetPixel)
  setTimeout(resetPixel, PIXEL_REVERT_DELAY, pixel);
}

// resetPixel
//
// Takes the provided pixel element and sets its color back to default
function resetPixel(pixel) {
  pixel.style.backgroundColor = DEFAULT_COLOR;
}
