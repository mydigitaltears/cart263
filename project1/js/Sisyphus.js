class Sisyphus {
  constructor () {
    this.y = 0;
    this.pushing = false;
  }

  behavior (other) {
    if (other.y < 500){
      this.push(other);
    }
  }

  push (other) {
    if (this.pushing === false){
      this.returnToBall(other);
    }
    else if (this.pushing === true){
      this.y += 0.3;
      other.y += 0.3;
    }
  }

  returnToBall (other) {
    this.y -= 0.5;
    if (this.y < other.y-10 && other.fallOff === false){
      this.pushing = true;
    }
  }

  display() {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.ellipse(this.y, 250, 10, 10, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}
