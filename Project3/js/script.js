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
let eating = false;

function preload() {
  images[0] = loadImage('assets/images/general1.png');
  images[1] = loadImage('assets/images/general2.png');
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
  canvas.drop(gotFile);
  // image(img2, 0, 0);
}

function draw() {
  background(255);
  if(eating){
    fill(255,0,0);
  }
  else {
    fill(0);
  }
  gfx.background(255);
  cyclic_t = millis() * 0.003 % images.length;
  gfx.image(images[floor(cyclic_t)], 0, 0, 34*2, 32*2);
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

  // if(dropImages[0] != null){
  //   if(timer>0){
  //     myAsciiArt2.typeArray2d(ascii_arr2, this, 230, 190, 600, 600);
  //   }
  // }



  if(leggo != null){
    noStroke();
    fill(0);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text(leggo, 16*13.5, 15*13.5);
  }

}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

// function mouseReleased() {
//   console.log(myAsciiArt.convert2dArrayToString(ascii_arr));
// }

// function highlight() {
//   dropzone.style('background-color', '#ccc');
// }
//
// function unhighlight() {
//   dropzone.style('background-color', '#fff');
// }

function gotFile(file) {
  console.log(file);

  if(file.type == "text"){
    leggo = file.data.toString();
    console.log(file.subtype);


    let interval = setInterval(function(){
      //leggo = leggo.slice(0, -5);
      leggo = leggo.substr(20);
    }, 10);

  }

  if(file.type === "image"){

    let img = createImg(file.data).hide();
    leggo = "";
    dropImages[0] = img;
    console.log(img);

    setTimeout(function(){
      gfx2.image(dropImages[0], 0, 0, gfx2.width, gfx2.height);

      ascii_arr2 = myAsciiArt.convert(gfx2, gfx2.width/1.5, gfx2.height/3);

      leggo = myAsciiArt2.convert2dArrayToString(ascii_arr2);

      eating = true;

      console.log(leggo);
      let interval = setInterval(function(){
        leggo = leggo.substr(20);

        if(leggo === ""){
          eating = false;
          console.log(leggo);
          clearInterval(interval);
        }
      }, 10);

    }, 100)



    //timer = Math.floor(ascii_arr2.length);

    // let interval2 = setInterval(function(){
    //   //leggo = leggo.slice(0, -5);
    //   //ascii_arr2.splice(-1);
    //   if(ascii_arr2[0] != null){
    //     ascii_arr2.splice(0, 1);
    //
    //     timer--;
    //   }
    //   if(timer == 0){
    //     clearInterval(interval2);
    //   }
    //   console.log(timer);
    // }, 100);


    // let interval = setInterval(function(){
    //   timer --;
    //
    //   console.log(timer);
    // }, 1000);

    //setTimeout(function(){clearInterval(interval);console.log(ascii_arr2);}, timer*1000);
  }

}
