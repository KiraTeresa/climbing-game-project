class Background {
  constructor() {
    this.top = 0;
  }

  preload() {
    this.img = loadImage("../assets/mitchell-luo-i1O_Hr6cbWc-unsplash.jpg");
  }

  drawBackground() {
    image(this.img, 0, 0);
  }
}
