"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

// window.onload = pageLoaded;

//http://lorempixel.com/400/200

window.addEventListener('load',pageLoaded);

function pageLoaded() {
  let newImage = document.createElement('img');
  let url = 'https://unsplash.it/200/300/?random' + Math.random();
  newImage.setAttribute('src', url);
  newImage.setAttribute('alt', '');
  newImage.setAttribute('id', '0');

  let imagesDiv = document.getElementById("images");
  imagesDiv.appendChild(newImage);
}

// setInterval(enlargePage, 1000);
// document.addEventListener('keydown', enlargePage);
// enlargePage() will be called every time key is pressed down
// let images = document.getElementById("0");
// images.addEventListener('onload',enlargePage);

function enlargePage(e) {
  let newImage = document.createElement('img');
  let url = 'https://unsplash.it/200/300/?random' + Math.random();
  newImage.setAttribute('src', url);
  newImage.setAttribute('alt', '');
  newImage.setAttribute('id', '0');

  let image = document.getElementById("0");
  image.parentElement.removeChild(image);
  let imagesDiv = document.getElementById("images");
  imagesDiv.appendChild(newImage);
}
