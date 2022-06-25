class Platform {
  constructor(img, appearsLeft) {
    this.height = 50;
    this.width = 100;
    this.top = -this.height * 2;
    this.left = 0;
    this.appearsLeft = appearsLeft; // is a boolean that changes, to make platform appear left, but tight on the next time
    this.img = img;
  }

  drawPlatform() {
    if (this.appearsLeft) {
      image(this.img, this.left, this.top, this.width, this.height);
    } else {
      image(
        this.img,
        CANVAS_WIDTH - this.width,
        this.top,
        this.width,
        this.height
      );
    }
    this.top += 2;
  }
}
