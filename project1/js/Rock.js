class Rock {
  constructor () {
    this.y = 10;
    this.fallOff = false
  }

  gravity(other) {
    if (this.fallOff === true) {
      this.y -= 3;
      other.pushing = false;
      if (this.y <= 10){
        this.fallOff = false;
      }
    }
  }

  display() {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.ellipse(this.y, 250, 10, 10, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}
