class Rock {
  constructor(img) {
    this.height = random(10, 20);
    this.width = this.height;
    this.top = -this.height;
    this.left = random(20, CANVAS_WIDTH - 20);
    this.roundness = 50;
    this.speed = random(2, 4);
    this.hitClimber = false;
    this.img = img;
  }

  drawRock() {
    image(this.img, this.left, this.top, this.width, this.height);
    this.top += this.speed;
    this.speed += GRAVITY;
  }
}
