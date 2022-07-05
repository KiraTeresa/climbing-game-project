class Player {
  constructor() {
    // setting position and size of player:
    this.top = CANVAS_HEIGHT / 2;
    this.left = CANVAS_WIDTH / 2 - 70;
    this.height = 180;
    this.width = 120;
    // variables affecting stats displays:
    this.safety = 0;
    this.energy = ENERGY;
    this.wearingHelmet = false;
    this.quickDrawsOnHarness = 0;
    this.granolaBarsEaten = 0;
    // variables for flickering at hit:
    this.frameCountAtHit = 0;
    this.isTransparent = false;
    this.canGetHit = true;
  }

  recoverFromHit() {
    this.canGetHit = false;
    this.frameCountAtHit = frameCount;
  }

  drawImage() {
    image(this.img, this.left, this.top, this.width, this.height);
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
    // if this.frameCountAtHit === 0
    // if there hasnt been any coliision yet, or if we say that we can collide again
    if (!this.frameCountAtHit) {
      return false;
    }
    // this defines wether it has been 120 frames (2 seconds) since we got hit in the head by a rock
    const isTime = this.frameCountAtHit + 120 <= frameCount;
    // if it has been 2 seconds, we now need to let the player know that it can get hit once more
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
    if (frameCount % 15 === 0) {
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
