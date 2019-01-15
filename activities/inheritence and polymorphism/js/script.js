"use strict";

class Shape {
  constructor(x,y,size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
  update() {
    this.x += random(-1,1);
    this.y += random(-1,1);
  }
  display() {
    // A generic shape cannot be displayed
    // But it makes sense to tell anyone extending this class to include one!
  }
}

class Square extends Shape {
  constructor(x,y,size) {
    super(x,y,size);
  }
  display() {
    push();
    rectMode(CENTER);
    fill(255,0,0);
    noStroke();
    rect(this.x,this.y,this.size,this.size);
    pop();
  }
}

class Circle extends Shape {
  constructor(x,y,size,c) {
    super(x,y,size);
    this.c = c; // Color
  }
  update() {
    super.update(); // Do the generic Shape update()
    this.size += random(-1,1); // Also jiggle in size
  }
  display() {
    push();
    ellipseMode(CENTER);
    fill(this.c);
    noStroke();
    ellipse(this.x,this.y,this.size);
    pop();
  }
}

class Line extends Shape {
  constructor(x,y,x2,y2) {
    super(x,y);
    this.x2 = x2;
    this.y2 = y2;
  }
  update() {
    super.update();
    this.x2 += random(-1,1);
    this.y2 += random(-1,1);
  }
  display() {
    push();
    stroke(255,0,0);
    line(this.x,this.y,this.x2,this.y2);
    pop();
  }
}
let shapes = [];

// let mySquare;
// let myCircle;
// let myOtherCircle;
// let myLine;
function setup() {
  createCanvas(windowWidth,windowHeight);
  shapes.push(new Square(random(0,width),random(0,height),100));
  shapes.push(new Circle(random(0,width),random(0,height),200,color(100,100,200)));
  shapes.push(new Circle(random(0,width),random(0,height),200,color(200,100,200)));
  shapes.push(new Line(random(0,width),random(0,height),random(0,width),random(0,height)));
  // mySquare = new Square(random(0,width),random(0,height),100);
  // myCircle = new Circle(random(0,width),random(0,height),200,color(100,100,200));
  // myOtherCircle = new Circle(random(0,width),random(0,height),200,color(200,100,200));
  // myLine = new Line(random(0,width),random(0,height),random(0,width),random(0,height));
}
function draw() {
  background(255);
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].update();
    shapes[i].display();
  }
  // mySquare.update();
  // myCircle.update();
  // myOtherCircle.update();
  // mySquare.display();
  // myCircle.display();
  // myOtherCircle.display();
  // myLine.update();
  // myLine.display();
}
