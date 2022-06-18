class Player {
  constructor() {
    this.top = CANVAS_HEIGHT / 2;
    this.left = CANVAS_WIDTH / 2;
    this.height = 70;
    this.width = 50;
  }

  drawPlayer() {
    push();
    fill("orange");
    rect(this.left, this.top, this.width, this.height);
    pop();
  }
}
