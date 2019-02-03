/*****************

Project 1
Xavier Touikan

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let theRock;
let theSisyphus;

$( document ).ready(function() {
    console.log( "ready!" );
    setInterval(update,10);
});

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");


theRock = new Rock();
theSisyphus = new Sisyphus();

function update() {
  console.log(theSisyphus.pushing);
  //console.log(theRock.y);
  ctx.clearRect(0, 0, c.width, c.height);
  theSisyphus.behavior(theRock);
  theRock.gravity();
  theSisyphus.display();
  theRock.display();
  if (theRock.y > 499){
    theSisyphus.pushing = false;
    theRock.fallOff = true;
  }
}
