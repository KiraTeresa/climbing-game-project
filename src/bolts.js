class Bolt {
  constructor(img) {
    this.left = random(50, CANVAS_WIDTH - 50);
    this.top = -10;
    this.width = 10;
    this.height = this.width;
    this.radius = 50;
    this.hasQuickDraw = false;
    this.img = img;
  }

  drawBolt() {
    push();
    stroke(139, 69, 19);
    strokeWeight(4);
    noFill();
    rect(this.left, this.top, this.width, this.height, this.radius);
    this.top += BACKGROUND_SPEED;
    pop();

    if (this.hasQuickDraw) {
      image(this.img, this.left - 15, this.top - this.height / 2, 40, 60);
    }
  }
}
