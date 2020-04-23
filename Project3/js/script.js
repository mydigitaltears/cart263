// I think the asciiart library doesn't work with "use strick"
// "use strict";

/********************************************************************

Ascii-Tamagotchi
Xavier Touikan

*********************************************************************/

// ascii library values
let myAsciiArt;
let myAsciiArt2;
let asciiart_width = 34*3; var asciiart_height = 32*3;
let gfx;
let gfx2;
let ascii_arr;
let ascii_arr2;
// timing for sprite rotation
let cyclic_t;
// image arrays
let images = [];
let eatImg = [];
let sitImg = [];
let happyImg = [];
let unhappyImg = [];
let dropImages = [];

// displayed ascii "food" images and text
let asciiText = "";
// states
let state = "normal";
let colorState = "normal";
let goodFood;
// happiness/hunger values
let happiness;
let hunger;
// talking variables
let reactionText = "";
let talking = false;
// database variables
let database;
let stateData;
// date
let date;


// timer was for a different way of eating pictures
//let timer;

// Retrieve datas from firebase
document.addEventListener("DOMContentLoaded", event => {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAQpmCfdJkWM7YYBMOWITyR1DlXn-Z-9sA",
    authDomain: "ascii-tamagotchi.firebaseapp.com",
    databaseURL: "https://ascii-tamagotchi.firebaseio.com",
    projectId: "ascii-tamagotchi",
    storageBucket: "ascii-tamagotchi.appspot.com",
    messagingSenderId: "689301622282",
    appId: "1:689301622282:web:ad4db5714281268c8159f3",
    measurementId: "G-BDJBTW3LTS"
  };
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
  // everything is stored in 'stateData'
  stateData = database.ref('stateData');
  // triggers 'gotStateData' once
  stateData.once('value', gotStateData, errStateData);
});

// gotStateData()
function gotStateData(data) {
  // update different saved values with the database
  hunger = data.val().hunger;
  date = data.val().date;
  happiness = data.val().happiness;
  // hungerTime() to update the hunger bar
  hungerTime();
}

function errStateData(error) {
  console.error(error);
}

// preload()
function preload() {
  // preload images
  images[0] = loadImage('assets/images/general1.png');
  images[1] = loadImage('assets/images/general2.png');
  eatImg[0] = loadImage('assets/images/eating1.png');
  eatImg[1] = loadImage('assets/images/eating2.png');
  sitImg[0] = loadImage('assets/images/sitting1.png');
  sitImg[1] = loadImage('assets/images/sitting2.png');
  happyImg[0] = loadImage('assets/images/happy1.png');
  happyImg[1] = loadImage('assets/images/happy2.png');
  unhappyImg[0] = loadImage('assets/images/unhappy1.png');
  unhappyImg[1] = loadImage('assets/images/unhappy2.png');
}

//setup()
function setup() {
  // canvas
  let canvas = createCanvas(680, 640);
  // create graphics for the tamagotchi and the ascii-food
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
  // ascii text values
  textAlign(CENTER, CENTER); textFont('monospace', 10);
  textStyle(BOLD);
  noStroke(); fill(0,0,0);
  frameRate(30);
  // drag and drop functions
  canvas.dragOver(highlight);
  canvas.dragLeave(unhighlight);
  canvas.drop(gotFile);
}

// draw()
function draw() {
  // update backgrounds
  background(240);
  gfx.background(255);
  gfx2.background(255);
  // update colors based on a colorState value
  switch(colorState){
    case "normal" :
      fill(0);
      break;
    case "active" :
      fill(0,0,255);
      break;
    case "hovering" :
      fill(0,255,0);
      break;
    case "happy" :
      fill(255,180,0);
      break;
    case "unhappy" :
      fill(255,0,0);
      break;
  }
  // update animation based on state value
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
    case "unhappy" :
      cyclic_t = millis() * 0.003 % unhappyImg.length;
      gfx.image(unhappyImg[floor(cyclic_t)], 0, 0, 34*2, 32*2);
      break;
  }
  // posterize to smooth out the edges of the ascii arts
  gfx.filter(POSTERIZE, 3);
  gfx2.filter(POSTERIZE, 3);
  // convert tamagotchi to ascii and type it
  ascii_arr = myAsciiArt.convert(gfx);
  myAsciiArt.typeArray2d(ascii_arr, this);
  // display ascii food
  showAsciiText();
  // display hunger/happiness meters
  showData();
  // display react text
  showReactionText();

  // this was another way to display ascii images
  //
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
}

// highlight()
function highlight() {
  // change color on hover with a file
  if(state === "normal"){
    colorState = "hovering";
  }
}

// unhighlight()
function unhighlight() {
  // change back color on leave with a file
  if(state === "normal"){
    colorState = "normal";
  }
}

// gotFile()
function gotFile(file) {
  console.log(file);
  talking = false;
  // only eats if the state is normal and hunger is positive
  if(state === "normal" && hunger > 0){
    // if the file type is "text":
    if(file.type == "text"){
      // update states
      state = "eating";
      colorState = "active"
      // change the goodFood value depending on the type of text
      if(file.subtype === "html"){
        // doesn't like html
        goodFood = false;
      }
      // everything else is fine
      else {
        goodFood = true;
      }
      // displayed text is the file text
      asciiText = file.data.toString();
      // process the file weight data
      let fileWeight = file.size/1000;
      // subtract hunger with fileweight
      hunger = hunger - fileWeight;
      // can't go under 0
      hunger = hunger < 0 ? 0 : hunger;
      // update hunger data to database;
      firebase.database().ref('stateData').update({hunger: hunger});
      // remove parts of the text at interval to simulate eating
      let interval = setInterval(function(){
        // remove 20 characters at every 10 ms
        asciiText = asciiText.substr(20);
        // clearInterval and trigger sittingFunction()
        // when the text is entirely eating
        if(asciiText === ""){
          sittingFunction();
          clearInterval(interval);
        }
      }, 10);
    }
    // if the file type is "image" and not a photoshop file
    else if(file.type === "image" && file.subtype != "vnd.adobe.photoshop"){
      // update states
      state = "eating";
      colorState = "active"
      // create the dropped image and hide it
      let img = createImg(file.data).hide();
      // change the goodFood value depending on the type of image
      if(file.subtype === "jpeg"){
        // doesn't like jpegs
        goodFood = false;
      }
      // everything else is fine
      else {
        goodFood = true;
      }
      // process the file weight data
      let fileWeight = file.size/100000;
      // subtract hunger with fileweight
      hunger = hunger - fileWeight;
      // can't go under 0
      hunger = hunger < 0 ? 0 : hunger;
      // update hunger data to database;
      firebase.database().ref('stateData').update({hunger: hunger});
      // save image to dropImages array
      dropImages[0] = img;

      // timeout to make sure the image is properly loaded, probably not
      // the best solution but couldn't find equivalent to a "dataLoaded"
      // event listener
      setTimeout(function(){
        // update gfx2 to the dropped image
        gfx2.image(dropImages[0], 0, 0, gfx2.width, gfx2.height);
        // convert the image to a character array
        ascii_arr2 = myAsciiArt.convert(gfx2, gfx2.width/1.5, gfx2.height/3);
        // convert the character array to a string
        asciiText = myAsciiArt2.convert2dArrayToString(ascii_arr2);
        // remove parts of the text at interval to simulate eating
        let interval = setInterval(function(){
          // remove 20 characters at every 10 ms
          asciiText = asciiText.substr(20);
          // clearInterval and trigger sittingFunction()
          // when the text is entirely eating
          if(asciiText === ""){
            sittingFunction();
            clearInterval(interval);
          }
        }, 10);
      }, 100)
    }
    else {
      // says "I can't eat that" if file isn't text or image
      talking = true;
      colorState = "normal";
      reactionText = "I can't eat that!"
      // for two seconds
      setTimeout(function(){
        talking = false;
      }, 2000);
    }
  }

  // if hunger isn't positive
  else if(hunger <= 0) {
    // says "I'm too full"
    talking = true;
    colorState = "normal";
    reactionText = "I'm too full!"
    // for two seconds
    setTimeout(function(){
      talking = false;
    }, 2000);
    // increments happiness
    if(happiness < 15){
      happiness ++;
    }
  }
}

// sittingFunction()
function sittingFunction() {
  // change state to "sitting" for two seconds
  state = "sitting";
  // if he likes the type of food, go to "happy"
  if(goodFood){
    setTimeout(happyFunction, 2000);
  }
  // if not go to "unhappy"
  if(!goodFood){
    setTimeout(unhappyFunction, 2000);
  }
}

// happyFunction()
function happyFunction() {
  // update states to "happy"
  state = "happy";
  colorState = "happy";
  // update happiness value
  if(happiness < 15) {
    happiness ++;
  }
  // display a text for 2 seconds
  reactionText = "Thank you!!"
  talking = true;
  setTimeout(function(){
    talking = false;
  }, 2000);
  // return to normal after 2 seconds
  setTimeout(normalFunction, 2000);
}

// unhappyFunction()
function unhappyFunction() {
  // update states to "happy"
  state = "unhappy";
  colorState = "unhappy";
  // update happiness value
  if(happiness > 0) {
    happiness --;
  }
  // display a text for 2 seconds
  reactionText = "I don't like it!!"
  talking = true;
  setTimeout(function(){
    talking = false;
  }, 2000);
  // return to normal after 2 seconds
  setTimeout(normalFunction, 2000);
}

// normalFunction()
function normalFunction() {
  // update states to "normal"
  colorState = "normal";
  state = "normal";
}

// showData()
function showData() {
  // preparing text
  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(14);
  // hunger bar
  text('hunger', 500, 10);
  let x = hunger;
  x = x < 0 ? 0 : x;
  rect(500, 25, x*10, 5);

  // happiness bar
  text('happiness', 500, 30);
  let y = happiness;
  y = y < 0 ? 0 : y;
  rect(500, 45, y*10, 5);
  // putting back textSize to 10
  textSize(10);
}

// showReactionText()
function showReactionText() {
  // show text if talking
  if(talking){
    // rect bubble
    rectMode(CENTER);
    fill(255);
    rect(235, 60, 150, 60, 20);
    rectMode(CORNER);
    // display reactionText
    noStroke();
    fill(0);
    textAlign(LEFT, TOP);
    textStyle(NORMAL);
    textSize(10);
    text(reactionText, 170, 37, 150, 200);
    textStyle(BOLD);
  }
}

// showAsciiText()
function showAsciiText() {
  // show ascii image or text if the string isn't empty
  if(asciiText != ""){
    noStroke();
    fill(0);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text(asciiText, 16*13.5, 15*13.5);
  }
}

// hungerTime()
function hungerTime() {
  // dateNow is current date
  let dateNow = Date.now();
  // if hunger isn't full
  if(hunger < 15){
    // fill the hunger based on the time passed between the
    // saved date in the database and the current time.
    let hungerFill = (dateNow - date)/100000;
    hunger = hunger + hungerFill;
    // can't go over 15
    hunger = hunger > 15 ? 15 : hunger;
    // update hunger in the database
    firebase.database().ref('stateData').update({hunger: hunger});
    console.log(hunger + "hunger");
  }
  // says "I'm hungry" if hunger meter is full
  else {
    // display a text for 2 seconds
    reactionText = "I'm hungry!!"
    talking = true;
    // decrements happiness
    if(happiness > 0){
      happiness --;
    }
  }
  // update the date in the database
  firebase.database().ref('stateData').update({date: dateNow});
}
