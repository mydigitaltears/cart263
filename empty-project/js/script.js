"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

window.onload = setup;
let gArray = [];

function setup () {
  console.log("setup activated!");
  for(let i=0; i<300; i++){
    let newImg = document.createElement("img");
    newImg.setAttribute("class", "pixel");
    document.body.appendChild(newImg);
    newImg.addEventListener('mouseover', paint);
    // gArray[i] = $.get(`https://api.giphy.com/v1/gifs/random?api_key=CIQjC3fnjy1IqU39yYXk976Yrn5flTga&limit=1`);
    // console.log(gArray);
  }
}

function paint(e) {
  let pixel = e.target;
  // let r = Math.random()*255;
  // let g = Math.random()*255;
  // let b = Math.random()*255;
  //pixel.style.background =`rgb(${r}, ${g}, ${b})`;
  var xhr = $.get(`https://api.giphy.com/v1/gifs/random?api_key=CIQjC3fnjy1IqU39yYXk976Yrn5flTga&limit=1`);
  //let index = Math.random()*1000;
  xhr.done(function(data) {
    pixel.src = data.data.images.original.url
  });
  //let url = 'https://unsplash.it/30/30/?random' + Math.random()
  //pixel.style.backgroundImage = `url(${url})`;
  setTimeout(resetPixel,10000,pixel);
}

function resetPixel (pixel) {
  pixel.src="//:0";
  pixel.style.background ='black';
}
//
// function gif () {
//   var xhr = $.get(`https://api.giphy.com/v1/gifs/random?api_key=CIQjC3fnjy1IqU39yYXk976Yrn5flTga&limit=1`);
//   xhr.done(function(data) {
//     document.getElementById("belly").src = data.data.images.original.url
//   });
// }
