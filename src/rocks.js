class Rock {
  constructor() {
    this.height = random(10, 20);
    this.width = this.height;
    this.top = -this.height;
    this.left = random(20, CANVAS_WIDTH - 20);
    this.roundness = 50;
    this.speed = random(2, 5);
    this.hitClimber = false;
  }

  preload() {
    this.img = loadImage("./assets/a44g_3gj6_201006.jpg");
  }

  drawRock() {
    // image(this.img, this.left, this.top, this.width, this.height);
    // image(this.img, CANVAS_WIDTH / 2, 50, 50, 50);

    push();
    fill("black");
    rect(this.left, this.top, this.width, this.height, this.roundness);
    this.top += this.speed;
    pop();
  }
}
