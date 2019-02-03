class Rock {
  constructor () {
    this.x = 20;
    this.fallOff = false
  }

  gravity(other) {
    if (this.fallOff === true) {
      this.x -= 5;
      other.pushing = false;
      if (this.x <= 20){
        this.fallOff = false;
      }
    }
  }

  display() {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.ellipse(this.x, 50, 20, 20, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}
