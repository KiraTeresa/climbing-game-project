class Helmet {
  constructor() {
    this.height = 300;
    this.width = 40;
    this.top = CANVAS_HEIGHT / 2;
    this.left = CANVAS_WIDTH / 2;
    // this.appearsLeft = true;
  }

  preload() {
    this.img = loadImage("./assets/helmet_vectorstock_22265240.png");
  }

  drawHelmet() {
    image(this.img, this.left, this.top, this.width, this.height);
    // if (this.appearsLeft) {
    // image(this.helmetImage, this.left, this.top, this.width, this.height);
    // } else {
    //   image(
    //     this.img,
    //     CANVAS_WIDTH - this.width,
    //     this.top,
    //     this.width,
    //     this.height
    //   );
    // }
    // this.top += 2;
  }
}
