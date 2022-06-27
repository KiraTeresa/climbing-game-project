class Helmet {
  constructor(img) {
    this.img = img;
    this.height = 30;
    this.width = 40;
    this.top = -this.height;
    this.left = random(20, CANVAS_WIDTH - 20);
    this.speed = 3;
  }

  drawHelmet() {
    image(this.img, this.left, this.top, this.width, this.height);
    this.top += this.speed;
    // this.speed += GRAVITY;
  }
}
