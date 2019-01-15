"use strict";

/*****************

Circle Eater
Pippin Barr

A simple game in which the player controls a shrinking circle with their mouse and tries
to overlap another circle (food) in order to grow bigger.

******************/

// Constants defining key quantities
const AVATAR_SIZE_GAIN = 50;
const AVATAR_SIZE_LOSS = 1;

// Avatar is an object defined by its properties
let avatar = {
  x: 0,
  y: 0,
  maxSize: 64,
  size: 64,
  active: true,
  color: '#cccc55'
}

// Food is an object defined by its properties
let food = {
  x: 0,
  y: 0,
  size: 64,
  color: '#55cccc',
  xVelocity: 3,
  yVelocity: 3,
  maxSpeed: 8
}

// preload()
//
// Not needed

function preload() {

}


// setup()
//
// Create the canvas, position the food, remove the cursor

function setup() {
  createCanvas(windowWidth,windowHeight);
  positionFood();
  noCursor();
}


// draw()
//
// Move the avatar, check for collisions, display avatar and food

function draw() {
  // Otherwise we handle the game
  background(0);
  // Make sure the avatar is still alive - if not, we don't run
  // the rest of the draw loop
  if (!avatar.active) {
    // By using "return" the draw() function exits immediately
    end();
    return;
  }
  updateAvatar();
  checkCollision();
  displayAvatar();
  displayFood();
  updateFood();
}

// updateAvatar()
//
// Set the position to the mouse location
// Shrink the avatar
// Set it to inactive if it reaches a size of zero
function updateAvatar() {
  avatar.x = mouseX;
  avatar.y = mouseY;
  // Shrink the avatar and use constrain() to keep it to reasonable bounds
  avatar.size = constrain(avatar.size - AVATAR_SIZE_LOSS,0,avatar.maxSize);
  if (avatar.size === 0) {
    avatar.active = false;
  }
}

// checkCollision()
//
// Calculate distance of avatar to food
// Check if the distance is small enough to be an overlap of the two circles
// If so, grow the avatar and reposition the food
function checkCollision() {
  let d = dist(avatar.x,avatar.y,food.x,food.y);
  if (d < avatar.size/2 + food.size/2) {
    avatar.size = constrain(avatar.size + AVATAR_SIZE_GAIN,0,avatar.maxSize);
    food.color = color(random(0,255), random(0,255), random(0,255));
    console.log(food.color);
    positionFood();
  }
}

// displayAvatar()
//
// Draw the avatar in its current position, using its size and color
// Use push() and pop() around it all to avoid affecting the rest of the program
// with drawing commands
function displayAvatar() {
  push();
  noStroke();
  fill(avatar.color);
  ellipse(avatar.x,avatar.y,avatar.size);
  pop();
}

// displayFood()
//
// Draw the food in its current position, using its size and color
// Use push() and pop() around it all to avoid affecting the rest of the program
// with drawing commands
function displayFood() {
  push();
  noStroke();
  fill(food.color);
  ellipse(food.x,food.y,food.size);
  pop();
}

// positionFood()
//
// Set the food's position properties to random numbers within the canvas dimensions
function positionFood() {
  food.x = random(0,width);
  food.y = random(0,height);
}

// updateFood()
//
// Update the food's position
function updateFood() {
  food.x = food.x + food.xVelocity;
  food.y = food.y + food.yVelocity;
  if(food.x > windowWidth || food.x < 0){
    food.xVelocity = -food.xVelocity
  }
  if(food.y > windowHeight || food.y < 0){
    food.yVelocity = -food.yVelocity
  }
  if(frameCount%60 === 0){
    food.xVelocity = random(-food.maxSpeed,food.maxSpeed);
  }
  if(frameCount%45 === 0){
    food.yVelocity = random(-food.maxSpeed,food.maxSpeed);
  }
}

function end() {
  fill(255);
  console.log("game over");
  textAlign(CENTER);
  text('GAME OVER', windowWidth/2, windowHeight/2);
}
