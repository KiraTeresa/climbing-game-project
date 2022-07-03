class Player {
  constructor() {
    this.top = CANVAS_HEIGHT / 2 - 100;
    this.left = CANVAS_WIDTH / 2 - 70;
    this.height = 180;
    this.width = 120;
    this.timesHit = 0;
    this.safety = 0;
    this.energy = ENERGY;
    // this.gotHit = false;
    // this.flickering = false;
    // this.frameCountAtHit = 0;
    this.shotTime = 0;
    this.isTransparent = false;
    this.canGetHit = true;
    this.wearingHelmet = false;
    this.quickDrawsOnHarness = 0;
    this.granolaBarsEaten = 0;
  }

  boomChakalaka() {
    this.canGetHit = false;
    this.shotTime = frameCount;
  }

  drawImage() {
    image(this.img, this.left, this.top, this.width, this.height);
    //  this.canGetHit = true;
  }

  semiTransparentDrawing() {
    push();
    tint(255, 128);
    this.drawImage();
    pop();
  }

  preload() {
    this.img = loadImage(
      "./assets/vecteezy_indoor-rock-climbing-gym_7095122.png"
    );
  }

  // get right() {
  //   return this.left + this.width;
  // }

  isTimeToGoBackToNormal() {
    // if this.shotTime === 0
    // if there hasnt been any coliision yet, or if we say that we can collide again
    if (!this.shotTime) {
      return false;
    }
    // this defines wether it has been 180 frames (3 seconds) since we got hit in the head by a rock
    const isTime = this.shotTime + 180 <= frameCount;
    // if it has been 3 seconds, we now need to let the player know that it can get hit once more
    if (isTime) {
      this.canGetHit = true;
    }
    return isTime;
  }

  drawPlayer() {
    if (this.isTimeToGoBackToNormal() || this.canGetHit) {
      return this.drawImage();
    }

    // From this point, youve taken a rock to the head

    if (this.isTransparent) {
      this.semiTransparentDrawing();
    } else {
      this.drawImage();
    }
    if (frameCount % 30 === 0) {
      this.isTransparent = !this.isTransparent;
    }
  }

  keyPressed() {
    if (keyCode === LEFT_ARROW && this.left >= 0) {
      this.left -= 20;
    } else if (
      keyCode === RIGHT_ARROW &&
      this.left + this.width <= CANVAS_WIDTH
    ) {
      this.left += 20;
    }
  }
}
