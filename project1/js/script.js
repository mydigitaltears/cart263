/*****************

Project 1
Xavier Touikan

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let counter = 0;
let topOfTheHill = 1000000;


$( document ).ready(function() {
    console.log( "ready!" );
    setInterval(update,1000);
});

function update() {
  document.getElementById('text').innerHTML = counter;
  counter++;
  if (counter == 10){
    counter = 0;
  }
}
