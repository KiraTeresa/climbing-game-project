class Background {
  constructor() {
    this.top = 0;
  }

  preload() {
    this.img = loadImage("../../assets/mitchell-luo-i1O_Hr6cbWc-unsplash.jpg");
  }

  drawBackground() {
    image(this.img, 0, this.top, CANVAS_WIDTH, CANVAS_HEIGHT);
    image(this.img, 0, this.top - CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.top += 2;

    if (this.top >= CANVAS_HEIGHT) {
      this.top = 0;
    }
  }
}
