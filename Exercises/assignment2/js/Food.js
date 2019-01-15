// Food
//
// A class to represent food, mostly just involves the ability to be
// a random size and to reset

class Food extends Agent {

  // Constructor
  //
  // Pass arguments on to the super() constructor (e.g. for Agent)
  // Also set a minimum and maximum size for this food object which it
  // will vary between when it resets
  constructor(x,y,minSize,maxSize,maxSpeed) {
    super(x,y,random(minSize,maxSize),'#55cccc');
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.maxSpeed = maxSpeed;
    this.xVelocity = random(-this.maxSpeed,this.maxSpeed);
    this.yVelocity = random(-this.maxSpeed,this.maxSpeed);
  }

  // reset()
  //
  // Set position to a random location on the canvas
  // Set the size to a random size within the limits
  reset() {
    this.x = random(0,width);
    this.y = random(0,height);
    this.size = random(this.minSize,this.maxSize);
    this.xVelocity = random(-this.maxSpeed,this.maxSpeed);
    this.yVelocity = random(-this.maxSpeed,this.maxSpeed);
  }

  // update()
  //
  // Updates the position every frame
  update() {
    this.x = this.x + this.xVelocity;
    this.y = this.y + this.yVelocity;
    if(this.x < 0 || this.x > windowWidth){
      this.xVelocity = -this.xVelocity;
    }
    if(this.y < 0 || this.y > windowHeight){
      this.yVelocity = -this.yVelocity;
    }
    if(frameCount%30 === 0){
      this.xVelocity = random(-this.maxSpeed,this.maxSpeed);
    }
    if(frameCount%60 === 0){
      this.yVelocity = random(-this.maxSpeed,this.maxSpeed);
    }
  }
}
