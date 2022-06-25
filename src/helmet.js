class Helmet {
  constructor(img, appearsLeft) {
    this.height = 50;
    this.width = 100;
    this.top = CANVAS_HEIGHT / 3;
    this.left = CANVAS_WIDTH / 3;
    this.appearsLeft = appearsLeft;
    this.img = img;
  }

  drawHelmet() {
    image(this.helmetImg, this.left, this.top, 30, 20);
  }
}
