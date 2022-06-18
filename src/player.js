class Player {
  constructor() {
    this.top = CANVAS_HEIGHT / 2 - 100;
    this.left = CANVAS_WIDTH / 2 - 70;
    this.height = 180;
    this.width = 120;
    this.timesHit = 0;
  }

  preload() {
    this.img = loadImage(
      "./assets/vecteezy_indoor-rock-climbing-gym_7095122.png"
    );
  }

  drawPlayer() {
    image(this.img, this.left, this.top, this.width, this.height);
  }

  keyPressed() {
    if (keyCode === LEFT_ARROW) {
      this.left -= 10;
    } else if (keyCode === RIGHT_ARROW) {
      this.left += 10;
    }
  }
}
