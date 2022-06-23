class Player {
  constructor() {
    this.top = CANVAS_HEIGHT / 2 - 100;
    this.left = CANVAS_WIDTH / 2 - 70;
    this.height = 180;
    this.width = 120;
    this.timesHit = 0;
    this.safety = 0;
    this.energy = ENERGY;
    this.gotHit = false;
    this.flickering = false;
    this.frameCountAtHit = 0;
  }

  preload() {
    this.img = loadImage(
      "./assets/vecteezy_indoor-rock-climbing-gym_7095122.png"
    );
  }

  drawPlayer() {
    push();
    // if (this.flickering) {
    //   this.flicker();
    if (this.gotHit) {
      tint(255, 128); // test to see if setting transparency works
      image(this.img, this.left, this.top, this.width, this.height);
      noTint();
    } else {
      image(this.img, this.left, this.top, this.width, this.height);
    }
    // }
    // else {
    //   image(this.img, this.left, this.top, this.width, this.height);
    // }
    pop();
  }

  // -- trying on implementing a method which makes the player image flicker when hit by a rock --
  flicker() {
    // if (frameCount === frameCountAtHit + 180) {
    //   this.gotHit = false;
    // }
    if (this.flickering) {
      console.log(`FrameCountAtHit: ${this.frameCountAtHit}`);
      if (frameCount <= this.frameCountAtHit + 10) {
        this.gotHit = true;
        console.log("Flicker 1");
      } else if (
        frameCount > this.frameCountAtHI + 10 &&
        frameCount <= this.frameCountAtHit + 20
      ) {
        this.gotHit = false;
      } else if (
        frameCount > this.frameCountAtHI + 20 &&
        frameCount <= this.frameCountAtHit + 30
      ) {
        this.gotHit = true;
        console.log("Flicker 2");
      } else if (
        frameCount > this.frameCountAtHI + 30 &&
        frameCount <= this.frameCountAtHit + 40
      ) {
        this.gotHit = false;
      } else if (
        frameCount > this.frameCountAtHI + 40 &&
        frameCount <= this.frameCountAtHit + 50
      ) {
        this.gotHit = true;
        console.log("Flicker 3");
      } else if (frameCount > this.frameCountAtHit + 50) {
        this.gotHit = false;
        this.flickering = false;
      }
    }
    // // trying with a while loop:
    // while (frameCount <= this.frameCountAtHit + 10) {
    //   this.gotHit = true;
    // }
    // while (
    //   frameCount > this.frameCountAtHI + 10 &&
    //   frameCount <= this.frameCountAtHit + 20
    // ) {
    //   this.gotHit = false;
    // }
    // while (
    //   frameCount > this.frameCountAtHI + 20 &&
    //   frameCount <= this.frameCountAtHit + 30
    // ) {
    //   this.gotHit = true;
    // }
    // while (
    //   frameCount > this.frameCountAtHI + 30 &&
    //   frameCount <= this.frameCountAtHit + 40
    // ) {
    //   this.gotHit = false;
    // }
    // while (
    //   frameCount > this.frameCountAtHI + 40 &&
    //   frameCount <= this.frameCountAtHit + 50
    // ) {
    //   this.gotHit = true;
    // }
    // this.gotHit = false;

    //   //   // noTint();
    //   //   // while (
    //   //   //   frameCount > frameCountAtHit * 2 &&
    //   //   //   frameCount <= frameCountAtHit * 3
    //   //   // ) {
    //   //   //   noTint();
    //   //   // }
    //   //   // while (
    //   //   //   frameCount > frameCountAtHit * 3 &&
    //   //   //   frameCount <= frameCountAtHit * 4
    //   //   // ) {
    //   //   //   tint(255, 128);
    //   //   // }
    //   //   // if (frameCount > frameCountAtHit * 4) {
    //   //   //   noTint();
    //   //   // }
  }

  keyPressed() {
    if (keyCode === LEFT_ARROW) {
      this.left -= 20;
    } else if (keyCode === RIGHT_ARROW) {
      this.left += 20;
    }
  }
}
