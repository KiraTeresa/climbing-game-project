class Player {
  constructor() {
    this.top = CANVAS_HEIGHT / 2 - 100;
    this.left = CANVAS_WIDTH / 2 - 70;
    this.height = 180;
    this.width = 120;
    this.timesHit = 0;
    this.safety = 8;
    this.energy = ENERGY;
  }

  preload() {
    this.img = loadImage(
      "./assets/vecteezy_indoor-rock-climbing-gym_7095122.png"
    );

    // -- approach to also preload a transparent img --
    // // load image which will be shown when hit by a rock:
    // this.imgTransparent = loadImage("/assets/climber-transparent.png");
  }

  drawPlayer() {
    // tint(255, 128); // test to see if setting transparency works --> breaks page
    image(this.img, this.left, this.top, this.width, this.height);
  }

  // -- trying on implementing a method which makes the player image flicker when hit by a rock --
  // gotHit() {
  // const frameCountAtHit = frameCount;
  // while (frameCount <= frameCountAtHit * 2) {
  // this.img.remove();
  // image(this.imgTransparent, this.left, this.top, this.width, this.height);
  // tint(255, 128);
  // }
  // while (
  //   frameCount > frameCountAtHit * 2 &&
  //   frameCount <= frameCountAtHit * 3
  // ) {
  //   notint();
  // }
  // while (
  //   frameCount > frameCountAtHit * 3 &&
  //   frameCount <= frameCountAtHit * 4
  // ) {
  //   tint(255, 128);
  // }
  // if (frameCount > frameCountAtHit * 4) {
  //   notint();
  // }
  // }

  // -- trying another approach with a method that'll stop the flickering --
  // stopFlicker() {
  //   image(this.img, this.left, this.top, this.width, this.height);
  //   noTint();
  // }

  keyPressed() {
    if (keyCode === LEFT_ARROW) {
      this.left -= 20;
    } else if (keyCode === RIGHT_ARROW) {
      this.left += 20;
    }
  }
}
