class Rock {
  constructor () {
    this.x = 10;
    this.fallOff = false
  }

  gravity(other) {
    if (this.fallOff === true) {
      this.x -= 3;
      other.pushing = false;
      if (this.x <= 10){
        this.fallOff = false;
      }
    }
  }

  display() {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.ellipse(this.x, 250, 10, 10, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}
