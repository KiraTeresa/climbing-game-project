class Rock {
  constructor(img) {
    this.height = random(10, 20);
    this.width = this.height;
    this.top = -this.height;
    this.left = random(20, CANVAS_WIDTH - 20);
    this.roundness = 50;
    this.speed = random(2, 5);
    this.gravity = 0.2;
    this.hitClimber = false;
    this.img = img;
  }

  drawRock() {
    image(this.img, this.left, this.top, this.width, this.height);
    this.top += this.speed;

    // push();
    // fill("black");
    // rect(this.left, this.top, this.width, this.height, this.roundness);
    // this.top += this.speed;
    // pop();
  }
}
