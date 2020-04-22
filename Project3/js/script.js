// "use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

// $(document).ready(setup);
// var dropzone;

var myAsciiArt;
var myAsciiArt2;
var asciiart_width = 34*3; var asciiart_height = 32*3;
var images = [];
let eatImg = [];
let sitImg = [];
let happyImg = [];
var gfx;
var gfx2;
var ascii_arr;
var ascii_arr2;
var cyclic_t;
var dropImages = [];
var timer;
let timer2 = 0;
let leggo;
let test1;
let state = "normal";
let colorState = "normal";

function preload() {
  images[0] = loadImage('assets/images/general1.png');
  images[1] = loadImage('assets/images/general2.png');
  eatImg[0] = loadImage('assets/images/eating1.png');
  eatImg[1] = loadImage('assets/images/eating2.png');
  sitImg[0] = loadImage('assets/images/sitting1.png');
  sitImg[1] = loadImage('assets/images/sitting2.png');
  happyImg[0] = loadImage('assets/images/happy1.png');
  happyImg[1] = loadImage('assets/images/happy2.png');
  dropImages[1] = loadImage('assets/images/clown.png');
}

function setup() {
  let canvas = createCanvas(680, 640);
  //let canvas = createCanvas(680,640);

  gfx = createGraphics(asciiart_width, asciiart_height);
  gfx.pixelDensity(1);

  gfx2 = createGraphics(asciiart_width, asciiart_height);
  gfx2.pixelDensity(1);

  myAsciiArt = new AsciiArt(this);
  myAsciiArt.printWeightTable();
  myAsciiArt.invertBrightnessFlag = true;

  myAsciiArt2 = new AsciiArt(this);
  myAsciiArt2.printWeightTable();
  myAsciiArt2.invertBrightnessFlag = true;

  textAlign(CENTER, CENTER); textFont('monospace', 10);
  textStyle(BOLD);
  noStroke(); fill(0,0,0);
  frameRate(30);

  // dropzone = select('#dropzone');
  // dropzone.dragOver(highlight);
  // dropzone.dragLeave(unhighlight);
  // dropzone.drop(gotFile, unhighlight);
  canvas.dragOver(highlight);
  canvas.dragLeave(unhighlight);
  canvas.drop(gotFile);
}

function draw() {
  background(255);
  switch(colorState){
    case "normal" :
      fill(0);
      break;
    case "active" :
      fill(255,0,0);
      break;
    case "hovering" :
      fill(0,255,0);
      break;
    case "happy" :
      fill(255,180,0);
      break;
  }

  gfx.background(255);

  switch(state){
    case "normal" :
      cyclic_t = millis() * 0.003 % images.length;
      gfx.image(images[floor(cyclic_t)], 0, 0, 34*2, 32*2);
      break;
    case "eating" :
      cyclic_t = millis() * 0.003 % eatImg.length;
      gfx.image(eatImg[floor(cyclic_t)], 0, 0, 34*2, 32*2);
      break;
    case "sitting" :
      cyclic_t = millis() * 0.003 % sitImg.length;
      gfx.image(sitImg[floor(cyclic_t)], 0, 0, 34*2, 32*2);
      break;
    case "happy" :
      cyclic_t = millis() * 0.003 % happyImg.length;
      gfx.image(happyImg[floor(cyclic_t)], 0, 0, 34*2, 32*2);
      break;
  }
  // if(state == "normal"){
  //   cyclic_t = millis() * 0.003 % images.length;
  //   gfx.image(images[floor(cyclic_t)], 0, 0, 34*2, 32*2);
  // }
  // else if(state == "eating"){
  //   cyclic_t = millis() * 0.003 % eatImg.length;
  //   gfx.image(eatImg[floor(cyclic_t)], 0, 0, 34*2, 32*2);
  // }
  // else if(state == "sitting"){
  //   cyclic_t = millis() * 0.003 % sitImg.length;
  //   gfx.image(sitImg[floor(cyclic_t)], 0, 0, 34*2, 32*2);
  // }
  // else if(state == "happy"){
  //   cyclic_t = millis() * 0.003 % happyImg.length;
  //   gfx.image(happyImg[floor(cyclic_t)], 0, 0, 34*2, 32*2);
  // }
  gfx2.background(255);

  // if(dropImages[0] != null){
  //   if(timer > 0){
  //     fill(255); // Use color variable 'c' as fill col
  //     stroke(5);
  //     rect(16*13.5, 15*13.5, gfx.width*timer, gfx.height*timer);
  //     fill(0);
  //     gfx2.image(dropImages[0], 32, 30, gfx.width/6.7*timer, gfx.height/6.7*timer);
  //     //image(dropImages[0], 16*13.5, 15*13.5, gfx.width*timer, gfx.height*timer);
  //
  //     //filter(GRAY);
  //     //image(dropImages[1], 16*10, 15*10);
  //     //gfx.image(dropImages[0], 60, 27, gfx.width/2, gfx.height/2);
  //     //noTint();
  //   }
  // }

  gfx2.filter(POSTERIZE, 3);
  gfx.filter(POSTERIZE, 3);


  ascii_arr = myAsciiArt.convert(gfx);

  myAsciiArt.typeArray2d(ascii_arr, this);

  if(leggo != null){
    noStroke();
    fill(0);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text(leggo, 16*13.5, 15*13.5);
  }
}

function highlight() {
  if(state === "normal"){
    colorState = "hovering";
  }
}

function unhighlight() {
  if(state === "normal"){
    colorState = "normal";
  }
}

function gotFile(file) {
  console.log(file);
  if(file.type == "text" && state === "normal"){
    leggo = file.data.toString();
    state = "eating";
    colorState = "active"

    let interval = setInterval(function(){
      leggo = leggo.substr(20);
      if(leggo === ""){
        console.log(leggo);
        sittingFunction();
        clearInterval(interval);
      }
    }, 10);

  }

  if(file.type === "image" && state === "normal"){
    let img = createImg(file.data).hide();
    state = "eating";
    colorState = "active"
    dropImages[0] = img;

    setTimeout(function(){
      gfx2.image(dropImages[0], 0, 0, gfx2.width, gfx2.height);

      ascii_arr2 = myAsciiArt.convert(gfx2, gfx2.width/1.5, gfx2.height/3);

      leggo = myAsciiArt2.convert2dArrayToString(ascii_arr2);

      let interval = setInterval(function(){
        leggo = leggo.substr(20);
        if(leggo === ""){
          sittingFunction();
          clearInterval(interval);
        }
      }, 10);

    }, 100)
  }
}

function sittingFunction() {
  state = "sitting";
  console.log("hey");
  setTimeout(happyFunction, 2000);
}

function happyFunction() {
  state = "happy";
  colorState = "happy";
  console.log("yo");
  setTimeout(normalFunction, 2000);
}

function normalFunction() {
  colorState = "normal";
  state = "normal";
  console.log("sup");
}
