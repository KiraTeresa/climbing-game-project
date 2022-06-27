class GranolaBar {
  constructor(img) {
    this.height = 30;
    this.width = 20;
    this.left = random(20, CANVAS_WIDTH - 20);
    this.top = -this.height;
    this.speed = 1;
    this.img = img;
    this.booster = 5;
  }

  drawGranolaBar() {
    image(this.img, this.left, this.top, this.width, this.height);
    this.top += this.speed;
    this.speed += GRAVITY;
  }
}
