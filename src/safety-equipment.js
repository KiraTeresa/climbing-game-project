class SafetyEquipment {
  constructor(img) {
    this.height = 60;
    this.width = 40;
    this.top = -this.height;
    this.left = random(20, CANVAS_WIDTH - 20);
    this.speed = 2;
    this.gravity = GRAVITY;
    this.img = img;
  }

  drawSafetyEquipment() {
    image(this.img, this.left, this.top, this.width, this.height);
    this.top += this.speed;
    this.speed += this.gravity;
  }
}
