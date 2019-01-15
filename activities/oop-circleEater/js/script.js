"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload

function preload() {

}
const AVATAR_MAX_SIZE = 100;
const AVATAR_SIZE_LOSS = 1;
const FOOD_MIN_SIZE = 30;
const FOOD_MAX_SIZE = 100;

let myAvatar;
let myFood;

// setup()
//
// Description of setup

function setup() {
  createCanvas(windowWidth,windowHeight);
  myAvatar = new Avatar(mouseX,mouseY,AVATAR_MAX_SIZE,AVATAR_SIZE_LOSS);
  myFood = new Food(random(0,width),random(0,height),FOOD_MIN_SIZE,FOOD_MAX_SIZE);
}


// draw()
//
// Description of draw()

function draw() {
  background(0);
  myAvatar.display();
  myAvatar.update();
  myFood.display();
  if (myAvatar.collide(myFood)) {
    myAvatar.eat(myFood);
  }
  console.log(myAvatar.alive);
}
