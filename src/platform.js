class Platform {
  constructor(platformImage, helmetImage, appearsLeft) {
    this.height = 50;
    this.width = 100;
    this.top = -this.height * 2;
    this.left = 0;
    this.appearsLeft = appearsLeft; // is a boolean that changes, to make platform appear left, but tight on the next time
    this.platformImg = platformImage;
    this.helmetImg = helmetImage;
    this.helmHeight = 30;
    this.helmWidth = 40;
    this.helmTop = this.top - this.helmHeight / 2;
    this.helmLeft = this.left + this.width - this.helmWidth;
  }

  drawPlatform() {
    if (this.appearsLeft) {
      image(this.platformImg, this.left, this.top, this.width, this.height);
      // put a helmet on every fifth platform:
      if (platformCount % 5 === 0) {
        image(
          this.helmetImg,
          this.helmLeft,
          this.helmTop,
          this.helmWidth,
          this.helmHeight
        );
      }
    } else {
      image(
        this.platformImg,
        CANVAS_WIDTH - this.width,
        this.top,
        this.width,
        this.height
      );
      // put a helmet on every fifth platform:
      if (platformCount % 5 === 0) {
        image(
          this.helmetImg,
          CANVAS_WIDTH - this.width,
          this.helmTop,
          this.helmWidth,
          this.helmHeight
        );
      }
    }
    this.top += 2;
    this.helmTop += 2;
  }
}
