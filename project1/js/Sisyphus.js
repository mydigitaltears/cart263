class Sisyphus {
  constructor () {
    this.x = 0;
    this.pushing = false;
  }

  behavior (other) {
    if (other.x < 1000){
      this.push(other);
    }
  }

  push (other) {
    if (this.pushing === false){
      this.returnToBall(other);
    }
    else if (this.pushing === true){
      this.x += 0.5;
      other.x += 0.5;
    }
  }

  returnToBall (other) {
    this.x --;
    if (this.x < other.x-20 && other.fallOff === false){
      this.pushing = true;
    }
  }

  display() {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.ellipse(this.x, 50, 20, 20, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}
